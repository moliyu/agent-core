import { runInit } from "./init.js";
import { ChromeLauncher } from "../cdp/chrome-launcher.js";
import { WorkspaceContext } from "../workspace/context.js";
import { OasisAgentCore } from "../index.js";
import { OasisEditorBridge } from "../bridge/oasis-editor-bridge.js";
import { OasisBootstrapper } from "../bootstrap/bootstrapper.js";
import { startMcpServer } from "../mcp/server.js";

export async function runCli(argv: string[]): Promise<void> {
  const command = argv[2] || "mcp";

  // 参数解析辅助
  const getArgValue = (prefix: string): string | undefined => {
    const item = argv.find((a) => a.startsWith(prefix));
    return item ? item.slice(prefix.length) : undefined;
  };

  const portVal = getArgValue("--port=");
  const port = portVal ? parseInt(portVal, 10) : undefined;
  const urlMatch = getArgValue("--url=");

  if (command === "init") {
    const targetDir = argv[3] && !argv[3].startsWith("--") ? argv[3] : undefined;
    runInit({ targetDir, port, urlMatch });
    return;
  }

  if (command === "launch-chrome") {
    const workspace = WorkspaceContext.findAndLoad();
    const effectivePort = port ?? workspace.config.port;
    const userDataDir = workspace.getUserDataDir();

    console.log(`[agent-core] 正在启动独立调试 Chrome (端口: ${effectivePort}, Profile: ${userDataDir})...`);
    const status = await ChromeLauncher.ensureRunning({
      port: effectivePort,
      userDataDir,
    });

    if (status.alreadyRunning) {
      console.log(`[agent-core] 独立 Chrome 实例已在运行中 (端口: ${effectivePort})。`);
    } else {
      console.log(`[agent-core] 独立 Chrome 启动成功！请在浏览器中打开 Oasis 编辑器页面。`);
    }
    return;
  }

  if (command === "bootstrap") {
    const workspace = WorkspaceContext.findAndLoad();
    const effectivePort = port ?? workspace.config.port;
    const effectiveMatch = urlMatch ?? workspace.config.urlMatch;

    console.log(`[agent-core] 正在连接目标 Oasis 编辑器 (端口: ${effectivePort}, 匹配: "${effectiveMatch}")...`);
    
    // 如果浏览器尚未启动，自动拉起
    await ChromeLauncher.ensureRunning({
      port: effectivePort,
      userDataDir: workspace.getUserDataDir(),
    });

    const pageBridge = await OasisAgentCore.connect({
      port: effectivePort,
      targetFilter: (target) => {
        if (effectiveMatch) {
          return target.url.includes(effectiveMatch);
        }
        const text = (target.title + " " + target.url).toLowerCase();
        return text.includes("oasis") || text.includes("ecrm") || text.includes("devide");
      },
    });

    const editorBridge = new OasisEditorBridge(pageBridge);
    console.log(`[agent-core] 正在等待页面 UI Editor Bridge 就绪...`);
    await editorBridge.waitForReady(15000);

    console.log(`[agent-core] 开始自举提取组件库规范与枚举...`);
    const result = await OasisBootstrapper.bootstrap(editorBridge, workspace);

    console.log(`
✨ 自举完成！
- 提取组件总数: ${result.total}
- 规范生成目录: ${result.outputDir}
- 统一注册文件: ${result.outputDir}/index.ts

AI Agent 现在可以直接读取这些带有强类型、合法枚举和预设的 TypeScript 规范！
`);
    process.exit(0);
  }

  if (command === "mcp" || command === "start") {
    const workspace = WorkspaceContext.findAndLoad();
    const effectivePort = port ?? workspace.config.port;
    const effectiveMatch = urlMatch ?? workspace.config.urlMatch;

    await startMcpServer({
      port: effectivePort,
      urlMatch: effectiveMatch,
    });
    return;
  }

  if (command === "--help" || command === "-h" || command === "help") {
    console.log(`
Oasis Agent Core - Universal UI Editor Bridge & Bootstrapper

使用方式:
  agent-core <command> [options]

常用命令:
  init [dir]        初始化工作区（生成 oasis.config.json, tsconfig.json 与组件规范目录）
  launch-chrome     拉起独立免弹窗调试 Chrome (指定用户 Profile，免除频繁登录)
  bootstrap         在线连接已打开的 Oasis 画布，自举提取全量组件库的 TypeScript 规范
  mcp               以当前工作区为上下文，启动标准 MCP (Model Context Protocol) 服务

通用选项:
  --port=<number>   指定 Chrome 调试端口 (默认: 9222)
  --url=<string>    指定匹配的目标 Tab URL 关键字 (默认: "oasis")
`);
    return;
  }

  console.error(`未知命令: "${command}"。请使用 --help 查看支持的命令。`);
  process.exit(1);
}
