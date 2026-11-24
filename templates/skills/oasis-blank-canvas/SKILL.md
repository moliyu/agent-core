---
name: oasis-blank-canvas
description: >-
  Oasis 低代码编辑器自动化新建空白画布 Skill：当刚打开 Oasis IDE 页面、浏览器停留在 IDE 外层工作台导航页、或者画布通信 Bridge (__OASIS_UI_EDITOR_BRIDGE__) 尚未就绪时使用。自动化执行【顶部菜单“工程” -> “开始工作” -> 确认丢弃旧空间 -> 操作面板“新建空白页面”】的完整初始化链路，进入全新空白画布并激活底层通信 Bridge。
---

# Oasis 自动化新建空白画布 Skill

在 Oasis 低代码可视化平台中，当直接打开 IDE 页面时，底层画布与操作通信 Bridge（`window.__OASIS_UI_EDITOR_BRIDGE__`）默认尚未挂载，必须先进入具体画布环境才能调用组件增删改查工具。

本 Skill 固化了从 IDE 初始界面自动跳转并初始化空白画布的标准化动作流程。

---

## 触发场景
1. 用户在对话中提出：
   - “新建一个空白页面”
   - “打开新画布”
   - “重置并创建一个新页面”
   - “为什么连不上画布 / Bridge 未就绪”
2. Agent 调用 `inspect_ui_tree` 或 `edit_ui_tree` 时收到错误提示：`Oasis 画布通信 Bridge 尚未就绪...`

---

## 执行方式

### 方式一：直接调用专用 MCP 工具 (最高效 / 推荐)
如果当前已挂载 `oasis-editor` MCP Server，直接调用内置工具：
```json
// 调用 MCP 工具
open_blank_canvas()
```
该工具会在后台自动完成菜单穿透、弹窗确认和真实鼠标点击，并在 3~5 秒内返回 `{ success: true, nodeCount: 1 }`。

---

### 方式二：通过 CDP 执行自动化浏览器操作
如果处于自建脚本或 CDP 命令行环境中，执行以下标准化流程：

1. **探测当前状态**：
   - 检查视口内是否已存在 `.WorkspaceOperationPanel_operation__g5JIE`（新建空白页面卡片）；
   - 若已存在，直接执行步骤 4。

2. **点击左上角【工程】菜单**：
   - 选择器：`.menubar_projectMenu__6e2_s .p-menuitem-link` 或文本匹配 `"工程"`；
   - 触发方式：原生点击或派发 MouseEvent。

3. **点击【开始工作】**：
   - 选择器：文本匹配 `"开始工作"` 的 `.p-menuitem-text` 或 `.p-menuitem-link`；
   - 若弹出二次确认框（`.menubar_confirmDialogCreateWorkspace__JoEGY`），点击右侧确认按钮 `.p-confirm-dialog-accept`（“是”）。

4. **点击【新建空白页面】**：
   - 选择器：包含文本 `"新建空白页面"` 的操作卡片容器 `.WorkspaceOperationPanel_operation__g5JIE`；
   - 获取该元素的中心坐标 `(x, y)`，使用 CDP 原生 `Input.dispatchMouseEvent`（mousePressed + mouseReleased）进行真实硬件点击，触发 React 页面挂载。

5. **校验画布 Bridge 就绪**：
   - 轮询执行 `Boolean(window.__OASIS_UI_EDITOR_BRIDGE__ && window.__OASIS_UI_EDITOR_BRIDGE__.getAvailability().ok)`；
   - 确认返回 `available: true` 且根节点为 `PageRoot` (`nodeCount: 1`) 即初始化完毕。
