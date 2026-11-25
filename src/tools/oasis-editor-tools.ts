import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { OasisEditorBridge } from "../bridge/oasis-editor-bridge.js";
import { PageBridge } from "../bridge/page-bridge.js";
import { WorkspaceContext } from "../workspace/context.js";
import { openBlankCanvas } from "../bridge/ide-actions.js";

export interface ToolExecutionContext {
  workspace: WorkspaceContext;
  pageBridge?: PageBridge;
}

export interface AgentToolDefinition {
  name: string;
  description: string;
  requiresEditor?: boolean;
  requiresPageOnly?: boolean;
  parameters: z.ZodTypeAny;
  execute: (
    editor: OasisEditorBridge,
    args: any,
    context?: ToolExecutionContext
  ) => Promise<any>;
}

function formatTreeOutline(
  serializedNodes: Record<string, any>,
  selectedNodeId?: string
): string {
  const nodeEntries = Object.entries(serializedNodes);
  if (nodeEntries.length === 0) return "(页面为空，没有任何节点)";

  let rootId = "ROOT";
  if (!serializedNodes[rootId]) {
    const candidate = nodeEntries.find(
      ([_, node]) => !node.parent || !serializedNodes[node.parent]
    );
    rootId = candidate ? candidate[0] : nodeEntries[0][0];
  }

  const lines: string[] = [];

  const traverse = (nodeId: string, depth: number) => {
    const node = serializedNodes[nodeId];
    if (!node) return;

    const indent = "  ".repeat(depth);
    const typeName = node.type?.resolvedName || node.displayName || "Unknown";
    const isSelected = nodeId === selectedNodeId ? " *" : "";

    const props = node.props || {};
    const propDetails: string[] = [];

    if (typeName === "Text") {
      const textVal =
        typeof props.text === "object" ? props.text?.value || "[表达式]" : props.text;
      if (textVal !== undefined) propDetails.push(`text="${textVal}"`);
    } else if (typeName === "Tag") {
      const contentVal =
        typeof props.content === "object"
          ? props.content?.value || "[表达式]"
          : props.content;
      if (contentVal !== undefined) propDetails.push(`content="${contentVal}"`);
      if (props.tagColor) propDetails.push(`color="${props.tagColor}"`);
    } else if (typeName === "Button") {
      const labelVal =
        typeof props.label === "object"
          ? props.label?.value || "[表达式]"
          : props.label;
      if (labelVal !== undefined) propDetails.push(`label="${labelVal}"`);
      if (props.theme && props.theme !== "primary") propDetails.push(`theme="${props.theme}"`);
      if (props.variant && props.variant !== "solid") propDetails.push(`variant="${props.variant}"`);
    } else if (typeName === "Container") {
      const display = props.display || "block";
      if (display === "flex") {
        propDetails.push(`flex ${props.flexDirection || "row"}`);
        if (props.gap && props.gap !== "0") propDetails.push(`gap: ${props.gap}`);
        if (props.flexJustifyContent && props.flexJustifyContent !== "center") {
          propDetails.push(`justify: ${props.flexJustifyContent}`);
        }
      } else {
        propDetails.push(display);
      }
    }

    const detailStr = propDetails.length > 0 ? ` [${propDetails.join(", ")}]` : "";
    lines.push(`${indent}- ${nodeId} (${typeName})${isSelected}${detailStr}`);

    if (Array.isArray(node.nodes)) {
      for (const childId of node.nodes) {
        traverse(childId, depth + 1);
      }
    }
    if (node.linkedNodes && typeof node.linkedNodes === "object") {
      for (const linkedId of Object.values(node.linkedNodes)) {
        if (typeof linkedId === "string") {
          traverse(linkedId, depth + 1);
        }
      }
    }
  };

  traverse(rootId, 0);
  return lines.join("\n");
}

export const inspectUiTreeTool: AgentToolDefinition = {
  name: "inspect_ui_tree",
  description:
    "检查当前页面的 UI 组件树。支持树状精简大纲 ('outline')、读取整个页面快照 ('snapshot')、指定节点详情 ('node') 或当前选中节点 ('selected')。",
  parameters: z.object({
    mode: z
      .enum(["outline", "snapshot", "node", "selected"])
      .default("outline")
      .describe(
        "查询模式：'outline' (默认/推荐) 获取低 Token 消耗的精简层级大纲；'snapshot' 获取全页面节点原始列表；'node' 获取指定 nodeId 完整详情；'selected' 获取当前选中节点"
      ),
    nodeId: z.string().optional().describe("当 mode='node' 时必须提供目标节点 ID"),
  }),
  execute: async (editor, args) => {
    if (args.mode === "outline") {
      const snapshot = await editor.getSnapshot();
      return {
        selectedNodeId: snapshot.selectedNodeId,
        totalNodes: Object.keys(snapshot.serializedNodes).length,
        outline: formatTreeOutline(snapshot.serializedNodes, snapshot.selectedNodeId),
      };
    }

    if (args.mode === "snapshot") {
      const snapshot = await editor.getSnapshot();
      const nodeSummary = Object.entries(snapshot.serializedNodes).map(
        ([id, node]) => ({
          id,
          type: node.type?.resolvedName || node.displayName || "Unknown",
          parent: node.parent,
          childCount: node.nodes?.length || 0,
        })
      );
      return {
        selectedNodeId: snapshot.selectedNodeId,
        totalNodes: nodeSummary.length,
        nodes: nodeSummary,
      };
    }

    if (args.mode === "selected") {
      const selected = await editor.getSelectedNode();
      if (!selected.selectedNodeId) {
        return { message: "当前没有选中任何节点" };
      }
      return await editor.getNode(selected.selectedNodeId);
    }

    if (args.mode === "node") {
      if (!args.nodeId) throw new Error("mode='node' 时必须提供 nodeId");
      return await editor.getNode(args.nodeId);
    }

    throw new Error(`不支持的模式: ${args.mode}`);
  },
};

export const editUiTreeTool: AgentToolDefinition = {
  name: "edit_ui_tree",
  description:
    "修改页面 UI 组件树。支持添加组件 (add)、更新属性 (update)、移动组件 (move)、删除组件 (delete) 或撤销/重做 (undo/redo)。",
  parameters: z.object({
    action: z
      .enum(["add", "update", "move", "delete", "undo", "redo"])
      .describe("编辑操作类型：'add' 添加；'update' 更新属性；'move' 移动；'delete' 删除；'undo'/'redo' 撤销/重做"),
    componentType: z
      .string()
      .optional()
      .describe(
        "当 action='add' 时必须指定组件类型名（如 Button, Container, Text, Tag 等）"
      ),
    parentId: z
      .string()
      .optional()
      .describe("当 action='add' 或 'move' 时指定的父节点 ID"),
    nodeId: z
      .string()
      .optional()
      .describe("当 action='delete'、'move' 或 'update' 时指定的目标节点 ID"),
    index: z
      .number()
      .int()
      .optional()
      .describe("插入或移动到的子节点下标索引"),
    props: z
      .record(z.string(), z.unknown())
      .optional()
      .describe("当 action='add' 或 'update' 时传入的属性值字典"),
  }),
  execute: async (editor, args) => {
    switch (args.action) {
      case "add": {
        if (!args.componentType || !args.parentId) {
          throw new Error("添加组件必须提供 componentType 和 parentId");
        }
        return await editor.addComponent({
          componentType: args.componentType,
          parentId: args.parentId,
          index: args.index,
          props: args.props,
        });
      }
      case "update": {
        if (!args.nodeId) throw new Error("更新组件属性必须提供 nodeId");
        if (!args.props) throw new Error("更新组件属性必须提供 props");
        return await editor.setNodeProps(args.nodeId, args.props);
      }
      case "move": {
        if (!args.nodeId || !args.parentId) {
          throw new Error("移动组件必须提供 nodeId 和 parentId");
        }
        return await editor.moveNode({
          nodeId: args.nodeId,
          parentId: args.parentId,
          index: args.index ?? 0,
        });
      }
      case "delete": {
        if (!args.nodeId) throw new Error("删除组件必须提供 nodeId");
        return await editor.deleteNode(args.nodeId);
      }
      case "undo":
        return await editor.undo();
      case "redo":
        return await editor.redo();
      default:
        throw new Error(`未知操作类型: ${args.action}`);
    }
  },
};

export const getUiComponentsTool: AgentToolDefinition = {
  name: "get_ui_components",
  description:
    "获取当前页面支持的组件库列表，或查看某个特定组件类型的属性配置与元数据。",
  parameters: z.object({
    componentType: z
      .string()
      .optional()
      .describe(
        "可选：若指定，则返回该组件的详细元数据和属性 schema；若不指定则返回组件清单"
      ),
  }),
  execute: async (editor, args, context) => {
    // 优先从工作区自举资产读取组件
    if (args.componentType && context?.workspace) {
      const compDir = context.workspace.getComponentsDir();
      const safeName = args.componentType.replace(/[^a-zA-Z0-9_$]/g, "_");
      const tsPath = path.join(compDir, `${safeName}.ts`);
      if (fs.existsSync(tsPath)) {
        const content = fs.readFileSync(tsPath, "utf-8");
        return {
          source: "workspace_typescript_asset",
          componentType: args.componentType,
          typescriptContract: content,
        };
      }
    }

    if (args.componentType) {
      return await editor.getComponentMetadata(args.componentType);
    }
    return await editor.listComponents();
  },
};

export const getComponentDefTool: AgentToolDefinition = {
  name: "get_component_def",
  requiresEditor: false,
  description:
    "从工作区 components/ 读取指定组件的完整 TypeScript 规范代码（包括字段说明、严格枚举联合类型、默认值和预设模版）。比死板的 JSON 更精准，杜绝属性名与枚举幻觉。",
  parameters: z.object({
    componentType: z
      .string()
      .describe("组件类型名称，如 'Button', 'Container', 'Table' 等"),
  }),
  execute: async (editor, args, context) => {
    const ws = context?.workspace || WorkspaceContext.findAndLoad();
    const compDir = ws.getComponentsDir();
    const safeName = args.componentType.replace(/[^a-zA-Z0-9_$]/g, "_");
    const tsPath = path.join(compDir, `${safeName}.ts`);

    if (fs.existsSync(tsPath)) {
      const content = fs.readFileSync(tsPath, "utf-8");
      return {
        componentType: args.componentType,
        filePath: tsPath,
        code: content,
      };
    }

    throw new Error(
      `工作区 components/ 中尚未维护组件 [${args.componentType}] 的 TypeScript 规范文件 (${tsPath})。`
    );
  },
};

export const clickUiElementTool: AgentToolDefinition = {
  name: "click_ui_element",
  description:
    "在当前画布中，根据可见文字点击指定节点内的元素（例如点击按钮、选项卡等）。",
  parameters: z.object({
    nodeId: z.string().describe("目标节点的 ID"),
    text: z.string().describe("需要点击的目标文本"),
    match: z
      .enum(["exact", "contains"])
      .optional()
      .default("exact")
      .describe("文本匹配模式，默认 exact (精确匹配)"),
  }),
  execute: async (editor, args) => {
    return await editor.clickNodeElementByText({
      nodeId: args.nodeId,
      text: args.text,
      match: args.match,
    });
  },
};

export const openBlankCanvasTool: AgentToolDefinition = {
  name: "open_blank_canvas",
  description:
    "在当前 Oasis IDE 页面中自动完成【工程 -> 开始工作 -> (若有弹窗确认则自动接受) -> 新建空白页面】的完整流程，初始化全新空白画布并激活底层通信 Bridge。当刚打开 IDE、处于非画布页面、Bridge 未就绪或需要开启全新页面时调用此工具。",
  parameters: z.object({}),
  execute: async (editor, _args, context) => {
    const res = await openBlankCanvas(editor.pageBridge, {
      editorUrl: context?.workspace?.config?.editorUrl,
    });
    await editor.waitForReady(15000);
    return res;
  },
};

export const inspectNetworkTool: AgentToolDefinition = {
  name: "inspect_network",
  description:
    "查看当前浏览器页面通过 CDP 捕获到的 XHR/Fetch 接口请求（含 POST 请求、请求头、POST 参数与响应体）。支持列表检索 ('list')、查看单条请求完整详情 ('detail') 和清空缓存 ('clear')。",
  requiresPageOnly: true,
  parameters: z.object({
    action: z
      .enum(["list", "detail", "clear"])
      .default("list")
      .describe("操作模式：'list' 列出最近捕获的请求；'detail' 查看指定 requestId 完整请求与响应；'clear' 清空缓冲区"),
    requestId: z
      .string()
      .optional()
      .describe("当 action='detail' 时必须提供目标请求的 requestId"),
    urlFilter: z
      .string()
      .optional()
      .describe("仅在 action='list' 时生效，按 URL 关键字忽略大小写过滤"),
    method: z
      .string()
      .optional()
      .describe("仅在 action='list' 时生效，按 HTTP 方法过滤（如 GET, POST）"),
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .optional()
      .default(20)
      .describe("仅在 action='list' 时生效，返回最新请求条数上限（默认 20，最大 100）"),
  }),
  execute: async (editor, args, context) => {
    const pageBridge = context?.pageBridge || editor?.pageBridge;
    if (!pageBridge) {
      throw new Error("当前未连接到浏览器页面");
    }

    if (args.action === "clear") {
      pageBridge.networkMonitor.clear();
      return { cleared: true, message: "已清空网络请求监听缓冲区" };
    }

    if (args.action === "detail") {
      if (!args.requestId) {
        throw new Error("action='detail' 时必须提供 requestId");
      }
      return await pageBridge.networkMonitor.getEntryDetail(args.requestId);
    }

    const entries = pageBridge.networkMonitor.listEntries({
      urlFilter: args.urlFilter,
      method: args.method,
      limit: args.limit,
    });
    return {
      totalReturned: entries.length,
      requests: entries,
    };
  },
};

export const pageFetchTool: AgentToolDefinition = {
  name: "page_fetch",
  description:
    "在当前浏览器页面上下文中直接发起 HTTP 请求（支持 GET/POST/PUT/DELETE/PATCH），自动复用当前登录态 Cookie 与同源鉴权状态，用于主动查询业务元数据、字段定义或调试后端接口。",
  requiresPageOnly: true,
  parameters: z.object({
    url: z.string().min(1).describe("请求路径或完整 URL（如 '/com/bm/be/query'）"),
    method: z
      .enum(["GET", "POST", "PUT", "DELETE", "PATCH"])
      .default("GET")
      .describe("HTTP 请求方法，默认 GET"),
    headers: z
      .record(z.string(), z.string())
      .optional()
      .describe("附加请求头字典"),
    body: z
      .unknown()
      .optional()
      .describe("请求体（非 GET 请求时生效；传入对象会自动 JSON 序列化并设置 Content-Type: application/json）"),
    timeoutMs: z
      .number()
      .int()
      .min(1000)
      .max(60000)
      .optional()
      .default(15000)
      .describe("请求超时时间（毫秒），默认 15000"),
  }),
  execute: async (editor, args, context) => {
    const pageBridge = context?.pageBridge || editor?.pageBridge;
    if (!pageBridge) {
      throw new Error("当前未连接到浏览器页面");
    }

    return await pageBridge.fetch({
      url: args.url,
      method: args.method,
      headers: args.headers,
      body: args.body,
      timeoutMs: args.timeoutMs,
    });
  },
};

export const allOasisTools: AgentToolDefinition[] = [
  inspectUiTreeTool,
  editUiTreeTool,
  getUiComponentsTool,
  getComponentDefTool,
  clickUiElementTool,
  openBlankCanvasTool,
  inspectNetworkTool,
  pageFetchTool,
];
