# Oasis 基础原子组件规范 (Design System Knowledge)

本文件是 Oasis 基础原子组件的核心知识库。AI Agent 在进行 UI 决策、选型和生成配置时应以本规范为准。

---

## 1. 核心组件目录与选型指南 (Selection Guide)

| 组件 | 角色 | 适用场景 | 嵌套能力 | 关键属性 |
| :--- | :--- | :--- | :--- | :--- |
| **`Container`** | 结构与布局 | 页面骨架、工具栏、卡片容器、内容排版 | **Canvas 容器**<br/>可包含任意子组件 | `display="flex"`, `flexDirection`, `gap`, `width`, `backgroundColor` |
| **`Text`** | 纯文本展示 | 页面标题、副标题、说明段落、辅助文字 | **纯叶子节点**<br/>无子组件 | `text`, `style: { fontSize, fontWeight, color }` |
| **`Tag`** | 状态与标签 | 审批状态、数据徽标、分类标签、可关闭胶囊 | **纯叶子节点**<br/>无子组件 | `content`, `tagColor="success/error/..."`, `isBorder` |
| **`Button`** | 交互触发 | 主行动点、次要取消、删除二次确认、行内跳转 | **纯叶子节点**<br/>无子组件 | `label`, `theme`, `variant`, `confirmType="popConfirm"` |

---

## 2. 嵌套与布局规则 (Nesting & Layout Rules)

1. **容器唯一性原则**：
   * 只有 `Container` 是布局容器。`Text`、`Tag`、`Button` 均为叶子节点，**绝不能向 Text/Tag/Button 中添加子组件**。
2. **水平排版规范**：
   * 凡是将文字与标签、多个按钮水平并排摆放的场景，必须用 `Container` 包裹，并设置：
     ```json
     {
       "display": "flex",
       "flexDirection": "row",
       "flexAlignItems": "center",
       "gap": "8px"
     }
     ```
3. **两端对齐规范 (Toolbar)**：
   * 典型的“左侧标题/状态，右侧操作按钮”工具栏，父容器设置：
     ```json
     {
       "display": "flex",
       "flexDirection": "row",
       "flexJustifyContent": "space-between",
       "flexAlignItems": "center",
       "width": "100%"
     }
     ```

---

## 3. 经典业务场景拼装菜谱 (Recipes)

### 场景 A：标准页面顶栏 (Page Header)
* **结构树**：
  * `Container (id: header_container, 两端对齐)`
    * `Container (id: title_group, 水平靠左对齐, gap: 12px)`
      * `Text (id: title_text, "订单详情 #20261124", 20px 加粗)`
      * `Tag (id: status_tag, "进行中", tagColor: "processing")`
    * `Container (id: action_group, 水平靠右对齐, gap: 8px)`
      * `Button (id: cancel_btn, label: "返回列表", variant: "outlined")`
      * `Button (id: pay_btn, label: "立即支付", theme: "primary")`

---

## 4. 关键排坑要点：Container 的默认 `flexRatio: 1` 行为

Oasis 中 `Container` 的 `flexRatio` 默认值为 `1`（相当于 CSS `flex: 1 1 0%` 或 `flex-grow: 1`）。在编写排版时必须注意以下 3 种典型场景：

1. **两端对齐顶栏中的右侧操作区**：
   - **问题**：若左右两容器都默认 `flexRatio: 1`，两边各占 50% 宽度，右侧按钮组会被强行拉伸或无法自然靠右紧凑排列。
   - **规范**：右侧操作栏 Container 必须显式指定 `flexRatio: 0` 和 `widthType: "auto"`。
2. **纵向卡片内部的行容器**：
   - **问题**：在 `flexDirection: "column"` 的卡片中，内部嵌套的多个行 Container 若为 `flexRatio: 1`，会在纵向主轴上等分卡片高度，导致元素上下之间被撑出过大空白。
   - **规范**：卡片内部的文本行、数值行等包裹容器应显式设置 `flexRatio: 0`。
3. **流式网格/卡片列表 (flexWrap="wrap")**：
   - **问题**：若设置了 3 列卡片（如 `width: "calc((100% - 24px) / 3)"`），当总卡片数不能被 3 整除时，最后一行的卡片会因为 `flexRatio: 1` 自动拉伸铺满剩余宽度。
   - **规范**：希望保持固定/等宽卡片时，卡片必须显式指定 `flexRatio: 0`。

### 场景 B：指标统计卡片 (Stat Card)
* **结构树**：
  * `Container (id: stat_card, 垂直排列, 白色背景, 带圆角与内边距)`
    * `Text (id: stat_label, "本月成交总额", 12px 灰色次级文本)`
    * `Container (id: value_row, 水平排列, 对齐底端, gap: 8px)`
      * `Text (id: stat_val, "¥ 128,450.00", 24px 加粗深色)`
      * `Tag (id: growth_tag, "+15.2%", tagColor: "success")`
    * `Text (id: stat_desc, "较上月同期增长 3,200 元", 12px 灰色)`

### 场景 C：危险操作按钮 (带 PopConfirm 二次确认)
* 避免直接执行敏感操作：
  ```json
  {
    "label": "彻底删除",
    "theme": "danger",
    "variant": "solid",
    "confirmType": "popConfirm",
    "confirmTitle": "此操作将永久删除该资源且不可逆，确认继续？",
    "confirmPlacement": "top"
  }
  ```
