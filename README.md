# Oasis Agent Core (`@moliyu/agent-core`)

通用 Oasis 低代码可视化画布 Agent 控制桥接库与 MCP 服务。
基于 Chrome DevTools Protocol (CDP)，解耦 AI Agent 宿主与低代码页面交互逻辑，支持任意 Agent（Codex、Cursor、Claude Desktop、Windsurf、Pi 等）直接读取、操作与编排 Oasis 低代码可视化页面。

---

## 核心特性

- **双模通信底座**：
  - 基于 CDP WebSocket 直连活跃页面，零额外中间件，毫秒级响应；
  - 深度桥接 Oasis 前端编辑器上下文 (`window.__OASIS_UI_EDITOR_BRIDGE__`)。
- **组件资产化 (Code-as-Asset)**：
  - 内置 129 个组件 TypeScript 规范（全量覆盖 `component-schemas-v2` 全部 128 个组件及旧版 `Grid`，涵盖布局容器、表单与条件控件、数据表格 `GridPlus`/`Table`、子表单 `SubForm`、数据服务 `ServiceData`、图表与关系图、审批/工作流/看板、日历排班、业务专有组件及内部槽位/模板节点）；
  - 严谨的 TypeScript 接口类型定义、枚举联合类型与场景推荐预设；
  - 配套排版选型指南 [COMPONENTS.md](templates/components/COMPONENTS.md) 与页面数据/接口联调规范 [DATA_AND_API.md](templates/components/DATA_AND_API.md)。
- **IDE 自动化穿透 (Tool & Skill)**：
  - 内置 `open_blank_canvas` 工具与 `oasis-blank-canvas` Agent Skill；
  - 自动穿透【顶部菜单“工程” -> “开始工作” -> 确认丢弃旧空间 -> 操作面板“新建空白页面”】完整链路。
- **自治 Issue 任务中枢与异常追踪**：
  - 纯后台无感运行：Agent 自动从 GitHub Issues 拉取任务并执行，无需人工引导；
  - 画布报错、未知组件、Schema 缺失时，自动向 GitHub Issues 提报结构化故障快照。
- **开箱即用体验**：
  - 免配置独立调试 Chrome 自动按需拉起，隔离日常 Cookie 与插件；
  - 标准 MCP Server 协议封装，单条配置即连。

---

## 目录架构

```text
agent-core/
├── src/
│   ├── cdp/         # Chrome 路径探测、进程拉起、WebSocket CDP 客户端
│   ├── bridge/      # OasisEditorBridge 画布封装、网络监控与 IDE 宏动作 (openBlankCanvas)
│   ├── tools/       # 面向 Agent 的 Zod 校验标准工具集定义
│   ├── workspace/   # 工作区配置发现与加载 (oasis.config.json)
│   ├── mcp/         # Model Context Protocol (MCP) Stdio 服务端
│   └── cli/         # 脚手架 CLI 命令 (init, launch-chrome, mcp)
├── templates/
│   ├── components/  # 内置 129 个组件规范资产、COMPONENTS.md、DATA_AND_API.md、RUNTIME_GLOBALS.md 与 RUNTIME_CONTEXT.md
│   └── skills/      # 工程级专属 Agent Skills (.agents/skills/oasis-blank-canvas)
└── tests/           # 单元测试与端到端集成测试集
```

---

## 常用命令

```bash
# 1. 在当前工作目录初始化 Oasis Agent 工程
agent-core init

# 2. 启动 MCP 服务 (供 AI 客户端通过 stdio 接入)
agent-core mcp

# 3. 独立拉起调试浏览器 (可选，mcp 会自动按需拉起)
agent-core launch-chrome
```

---

## MCP 客户端配置

在 **Cursor** (`~/.cursor/mcp.json`)、**Codex** 或 **Claude Desktop** 中配置：

```json
{
  "mcpServers": {
    "oasis-editor": {
      "command": "agent-core",
      "args": ["mcp"]
    }
  }
}
```

### 提供的 MCP 工具列表

#### 1. 画布与低代码 IDE 操作工具
| 工具名称 | 功能描述 |
| :--- | :--- |
| `open_blank_canvas` | 自动在 IDE 中执行【工程 -> 开始工作 -> 新建空白页面】，重置并进入全新空白画布 |
| `inspect_ui_tree` | 检查当前页面组件树（支持 `mode="outline"` 层级大纲与 `snapshot` 完整快照） |
| `edit_ui_tree` | 操作画布组件树（支持 `insert` 插入节点、`update` 更新属性、`delete` 删除节点、`move` 移动） |
| `get_ui_components` | 列出当前画布环境注册的全部可用组件列表 |
| `get_component_def` | 获取指定组件的 TypeScript 属性定义与规范说明 |
| `click_ui_element` | 根据可见文本点击/高亮指定节点内的 DOM 元素 |

#### 2. 自治 GitHub Issues 任务与异常闭环工具
| 工具名称 | 功能描述 |
| :--- | :--- |
| `github_list_issues` | 获取待办需求/任务 Issues 列表（支持 state/labels 过滤，零浏览器依赖） |
| `github_get_issue` | 获取指定 Issue 标题、需求描述与评论记录 |
| `github_create_issue` | 运行时发现未知组件、Bridge 故障或未受控行为时自动提报 Issue |
| `github_comment_issue` | 在指定 Issue 下回填执行结果或验证进展 |
| `github_close_issue` | 任务完成并校验通过后自动关闭 Issue |
