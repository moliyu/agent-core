import fs from "node:fs";
import path from "node:path";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { OasisAgentCore } from "../index.js";
import { OasisEditorBridge } from "../bridge/oasis-editor-bridge.js";
import { PageBridge } from "../bridge/page-bridge.js";
import { openBlankCanvas } from "../bridge/ide-actions.js";
import { allOasisTools } from "../tools/oasis-editor-tools.js";
import { WorkspaceContext } from "../workspace/context.js";
import { ChromeLauncher } from "../cdp/chrome-launcher.js";
import { runInit } from "../cli/init.js";

export interface McpServerOptions {
  port?: number;
  urlMatch?: string;
  autoLaunchBrowser?: boolean;
}

export async function startMcpServer(options: McpServerOptions = {}): Promise<void> {
  let workspace = WorkspaceContext.findAndLoad();

  // 若当前目录尚未初始化，自动静默创建工作区骨架 (oasis.config.json, tsconfig.json, components/ 等)
  const configPath = path.join(workspace.rootDir, "oasis.config.json");
  if (!fs.existsSync(configPath)) {
    runInit({
      targetDir: workspace.rootDir,
      port: options.port,
      urlMatch: options.urlMatch,
      silent: true,
    });
    workspace = WorkspaceContext.findAndLoad(workspace.rootDir);
  }

  const port = options.port ?? workspace.config.port;
  const urlMatch = options.urlMatch ?? workspace.config.urlMatch;

  // 创建 MCP Server 实例
  const server = new Server(
    {
      name: "oasis-agent-core",
      version: "0.1.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  let pageBridgeInstance: PageBridge | null = null;
  let editorBridge: OasisEditorBridge | null = null;

  async function getOrInitPageBridge(): Promise<PageBridge> {
    if (pageBridgeInstance) {
      try {
        const ok = await pageBridgeInstance.evaluate<boolean>("Boolean(window)");
        if (ok) return pageBridgeInstance;
      } catch {
        pageBridgeInstance = null;
      }
    }

    // 检查端口，若未监听且配置允许，自动拉起独立免弹窗 Chrome
    if (options.autoLaunchBrowser !== false) {
      await ChromeLauncher.ensureRunning({
        port,
        userDataDir: workspace.getUserDataDir(),
        targetUrl: workspace.config.editorUrl || "about:blank",
      }).catch((e) => {
        console.error(`[oasis-agent-core] 自动启动 Chrome 提示: ${e.message}`);
      });
    }

    pageBridgeInstance = await OasisAgentCore.connect({
      port,
      targetFilter: (target) => {
        if (urlMatch && urlMatch !== "oasis") {
          return target.url.includes(urlMatch) || target.title.includes(urlMatch);
        }
        const text = (target.title + " " + target.url).toLowerCase();
        return (
          text.includes("oasis") ||
          text.includes("ide") ||
          text.includes("tranzvision") ||
          text.includes("ecrm") ||
          text.includes("devide") ||
          text.includes("platform")
        );
      },
    });

    return pageBridgeInstance;
  }

  async function getOrInitEditor(): Promise<OasisEditorBridge> {
    if (editorBridge) {
      try {
        const avail = await editorBridge.getAvailability();
        if (avail && avail.available) return editorBridge;
      } catch {
        editorBridge = null;
      }
    }

    const pageBridge = await getOrInitPageBridge();
    editorBridge = new OasisEditorBridge(pageBridge);

    try {
      await editorBridge.waitForReady(5000);
      return editorBridge;
    } catch {
      throw new Error(
        `Oasis 画布通信 Bridge 尚未就绪。当前浏览器可能停留在 IDE 外层页面（未进入画布）。请先调用 [open_blank_canvas] 工具自动新建空白页面，或手动在页面中点击【工程 -> 开始工作 -> 新建空白页面】。`
      );
    }
  }

  // 1. 注册工具列表
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: allOasisTools.map((t) => {
        const jsonSchema = zodToJsonSchema(t.parameters, { target: "openApi3" }) as any;
        return {
          name: t.name,
          description: t.description,
          inputSchema: {
            type: "object",
            properties: jsonSchema.properties ?? {},
            required: jsonSchema.required ?? [],
          },
        };
      }),
    };
  });

  // 2. 注册工具执行
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const tool = allOasisTools.find((t) => t.name === name);
    if (!tool) {
      return {
        isError: true,
        content: [{ type: "text", text: `未知工具: ${name}` }],
      };
    }

    try {
      if (name === "open_blank_canvas") {
        const pageBridge = await getOrInitPageBridge();
        const res = await openBlankCanvas(pageBridge, {
          editorUrl: workspace.config.editorUrl,
        });
        editorBridge = new OasisEditorBridge(pageBridge);
        await editorBridge.waitForReady(15000);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(res, null, 2),
            },
          ],
        };
      }

      const editor = await getOrInitEditor();
      const validatedArgs = tool.parameters.parse(args ?? {});
      const result = await tool.execute(editor, validatedArgs, { workspace });
      return {
        content: [
          {
            type: "text",
            text: typeof result === "string" ? result : JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (err: any) {
      return {
        isError: true,
        content: [{ type: "text", text: `执行工具 [${name}] 出错: ${err.message}` }],
      };
    }
  });

  // 3. 启动标准 stdio 传输通道
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`[oasis-agent-core] MCP Server started on stdio, target CDP port: ${port}`);
}
