---
name: start
description: >-
  Oasis 低代码项目启动与引导 Skill：当用户主动触发“开始项目”“启动 Oasis”“打开浏览器”“准备搭建页面”时使用。自动检查工作区初始化状态、探测或拉起调试 Chrome 浏览器、检查 IDE 登录与画布 Bridge 状态，并一步步引导用户开始列表页、详情页或现有页面的可视化搭建。
---

# Oasis 项目启动与浏览器引导 Skill

当用户希望从零开始或恢复一个 Oasis 低代码项目时，按以下标准化步骤完成环境检查、拉起浏览器，并给出清晰的下一步操作引导。

---

## 触发场景
- 用户主动触发本 Skill，或说出：
  - “开始项目” / “启动 Oasis”
  - “打开浏览器准备配置页面”
  - “我要开始做 Oasis 低代码开发了，下一步怎么做”

---

## 执行步骤

### 1. 检查工作区初始化状态
1. 检查当前工作区根目录是否存在 [oasis.config.json](oasis.config.json)、`components/` 与 `AGENTS.md`。
2. 如果尚未初始化：
   - 确认当前目录是用户的目标项目/测试工作区（不要在 `/Users/zzy/work` 等总根目录误执行）；
   - 执行工作区初始化命令（优先使用已安装的 `agent-core init`，若未全局安装则执行 `npx @moliyu/agent-core init`）。
3. 读取 `oasis.config.json` 中的 `port`（默认 `9222`）、`urlMatch`（默认 `"oasis"`）与 `editorUrl`（如有）。

### 2. 探测或打开调试 Chrome 浏览器
1. 先检查调试端口是否已在运行：
   ```bash
   curl -s --max-time 2 http://127.0.0.1:9222/json/list
   ```
   （若 `oasis.config.json` 配置了其他 `port`，替换为对应端口。）
2. **若端口未响应**，拉起独立调试 Chrome：
   ```bash
   agent-core launch-chrome
   ```
   （若未全局安装 `agent-core`，改用 `npx @moliyu/agent-core launch-chrome` 或当前仓库的 `node dist/cli.js launch-chrome`。）
   - 若 `oasis.config.json` 配有 `editorUrl` 且刚启动的浏览器停在空白页，可在启动后提示用户在浏览器中访问该地址，或通过 CDP/浏览器打开。
3. **若端口已在运行**：
   - 检查返回的标签页列表中是否已有 Oasis IDE 页面；
   - 注意区分 IDE 编辑页与 `/preview` 预览页，不要将 `/preview` 当成编辑画布。

### 3. 检查画布 Bridge 就绪状态
- 如果已配置并启用了 `oasis-editor` MCP：
  - 若当前浏览器尚未打开 IDE 或未登录：**不要强行继续编辑**，直接引导用户在已打开的 Chrome 窗口中打开 IDE 地址并完成登录；
  - 若已登录并停留在 IDE 外层工作台导航页：调用 `open_blank_canvas()` 进入空白画布；
  - 若已在画布中：调用 `inspect_ui_tree(mode="outline")` 确认当前页面结构。

### 4. 向用户输出清晰的“下一步引导”
完成浏览器拉起与状态确认后，用简洁的清单告诉用户当前状态与接下来可以直接说的话：

1. **当前环境状态**：
   - 工作区路径与配置端口（如 `9222`）
   - Chrome 是否已打开 / 当前是否已进入 IDE 画布
2. **如果是首次打开或未登录**：
   - 请在刚打开的 Chrome 窗口中访问 Oasis IDE 地址并完成登录；
   - 登录成功后，告诉我“**新建空白画布**”或直接进入目标页面。
3. **如果已进入画布，可以立即开始**：
   - **从零新建页面**：告诉我目标页面类型（如列表管理页 / 详情页）以及对应的业务模型/实体（`bmName` / `beName`），我会按 `components/` 规范自动搭建；
   - **修改当前画布**：直接告诉我需要调整的区块、组件或布局需求；
   - **联调与预览提醒**：搭建过程中可在 Chrome 里自由切换到 `/preview` 等标签页查看效果（请保留 IDE 编辑页不要关闭）；配置 `Dialog` / `Drawer` 时设计态不会直接弹窗，无需点击触发按钮。
