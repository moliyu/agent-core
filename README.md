# Oasis Agent Core (`agent-core`)

通用 Oasis 低代码可视化画布 Agent 控制桥接库与 MCP 服务。
基于 Chrome DevTools Protocol (CDP)，解耦 AI Agent 宿主与低代码页面交互逻辑，支持任意 Agent（Codex、Cursor、Claude Desktop、Windsurf、Pi 等）直接读取、操作与编排 Oasis 低代码可视化页面。

---

## 核心特性

- **双模通信底座**：
  - 基于 CDP WebSocket 直连活跃页面，零额外中间件，毫秒级响应；
  - 深度桥接 Oasis 前端编辑器上下文 (`window.__OASIS_UI_EDITOR_BRIDGE__`)。
- **原子组件资产化 (Code-as-Asset)**：
  - 精选收敛 4 大基础原子组件规范：`Text`（文本）、`Tag`（状态胶囊）、`Button`（交互按钮）、`Container`（Flex 布局骨架）；
  - 严谨的 TypeScript 接口类型契约与场景推荐预设；
  - 配套排版知识库与排坑指南（规范 `flexRatio` 弹性缩放）。
- **IDE 自动化穿透 (Tool & Skill)**：
  - 内置 `open_blank_canvas` 工具与 `oasis-blank-canvas` Agent Skill；
  - 自动穿透【顶部菜单“工程” -> “开始工作” -> 确认丢弃旧空间 -> 操作面板“新建空白页面”】完整链路。
- **开箱即用体验**：
  - 免配置独立调试 Chrome 自动按需拉起，隔离日常 Cookie 与插件；
  - 标准 MCP Server 协议封装，单条配置即连。

---

## 目录架构

```text
agent-core/
├── src/
│   ├── cdp/         # Chrome 路径探测、进程拉起、WebSocket CDP 客户端
│   ├── bridge/      # OasisEditorBridge 画布封装与 IDE 宏动作 (openBlankCanvas)
│   ├── tools/       # 面向 Agent 的 Zod 校验标准工具集定义
│   ├── workspace/   # 工作区配置发现与加载 (oasis.config.json)
│   ├── mcp/         # Model Context Protocol (MCP) Stdio 服务端
│   ├── cli/         # 脚手架 CLI 命令 (init, launch-chrome, bootstrap, mcp)
│   └── bootstrap/   # 线上资产元数据自举与 TypeScript 代码生成引擎
├── templates/
│   ├── components/  # 内置原子组件规范资产 (Text, Tag, Button, Container, COMPONENTS.md)
│   └── skills/      # 工程级专属 Agent Skills (.agents/skills/oasis-blank-canvas)
└── tests/           # 单元测试与端到端集成测试集
```

---

## 常用命令

```bash
# 1. 在当前或目标目录初始化 Oasis Agent 工程
agent-core init [dir]

# 2. 启动 MCP 服务 (供 AI 客户端通过 stdio 接入)
agent-core mcp

# 3. 独立拉起调试浏览器 (可选，mcp 会自动按需拉起)
agent-core launch-chrome

# 4. 从当前已连接的 Oasis 画布全量自举提取组件库规范 (可选)
agent-core bootstrap
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

| 工具名称 | 功能描述 |
| :--- | :--- |
| `open_blank_canvas` | 自动在 IDE 中执行【工程 -> 开始工作 -> 新建空白页面】，重置并进入全新空白画布 |
| `inspect_ui_tree` | 检查当前页面组件树（支持 `mode="outline"` 层级大纲与 `snapshot` 完整快照） |
| `edit_ui_tree` | 操作画布组件树（支持 `insert` 插入节点、`update` 更新属性、`delete` 删除节点、`move` 移动） |
| `get_ui_components` | 列出当前画布环境注册的全部可用组件列表 |
| `get_component_def` | 获取指定组件的 TypeScript 属性定义与规范说明 |
| `click_ui_element` | 根据可见文本点击/高亮指定节点内的 DOM 元素 |
| `bootstrap_assets` | 在线提取当前连接画布中的全量组件资产 |
