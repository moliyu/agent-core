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
| **`Form`** | 表单容器 | 结构化数据录入、校验、BE 提交或函数驱动表单 | **Canvas 容器**<br/>内部应放 `FormItemContainer` | `alias`, `beName`, `columns`, `layout`, `rules`, `events` |
| **`FormItemContainer`** | 表单字段区 | `Form` 的唯一字段区入口，自动按 `Form.columns` 分栏 | **Canvas 容器**<br/>放字段控件或 `Container` | 无持久化 props（传 `{}`，严禁配置 `gap`） |
| **`GridPlus`** | 数据表格 | BE 列表展示、分页、排序、筛选、行内编辑、CRUD 操作 | **业务复合组件**<br/>通过 `formDialogProperty` 关联弹窗表单 | `alias`（必填）, `isFinishGuide=true`, `metaData.beName`, `columns`, `pagination` |
| **`Dialog`** | 模态弹窗 | 承载表单弹窗、确认提示、详情抽屉 | **Canvas 容器**<br/>可直接放 `Form` 等子组件 | `alias`, `headTitle`, `showButton`, `footerContent` |
| **`Input`** | 表单输入 | 文本、密码、多行文本、数字录入 | **纯叶子节点**<br/>放入 `FormItemContainer` 内 | `fieldName`, `displayName`, `type`, `required`, `maxLength` |
| **`Transform`** | 转换值选择 | 平台转换码（`transformCode`）字典下拉 | **纯叶子节点**<br/>放入 `FormItemContainer` 内 | `fieldName`, `displayName`, `transformCode`, `parentTransformValue` |
| **`Select`** | 静态下拉 | 固定枚举选项的单选/多选下拉 | **纯叶子节点**<br/>放入 `FormItemContainer` 内 | `fieldName`, `displayName`, `options`, `isMultiple` |
| **`DatetimePicker`** | 日期时间 | 日期、时间、年份选择或双字段日期范围 | **纯叶子节点**<br/>放入 `FormItemContainer` 内 | `type`, `fieldName`, `format`, `isRange` |
| **`CheckBox`** | 复选框 | 多选复选框组或单项开关复选框 | **纯叶子节点**<br/>放入 `FormItemContainer` 内 | `type`, `fieldName`, `options` |
| **`Icon`** | 图标展示 | 语义图标与图标化点击入口 | **纯叶子节点**<br/>无子组件 | `iconName` (`"pi.pi-..."` / `"antd...."`), `iconSize`, `iconColor` |
| **`IteratorContainer`** | 循环容器 | 用一份模板子树循环渲染列表数据 | **Canvas 容器**<br/>仅放一份模板子树 | `iteratorData`, `iteratorKey`, `iteratorVariableName` |
| **`ServiceData`** | 数据服务 | 挂载时执行自定义脚本或查询 BE 数据发布上下文 | **数据容器**<br/>可包裹页面子树 | `dataSourceType`, `customFunction`, `beName`, `resultField` |
| **`PageRoot`** | 页面根节点 | `ROOT` 节点，承载 `bmName`、`css`、`mock` 与默认 BE 上下文 | **唯一根节点**<br/>仅允许 `update`，不可插入 | `bmName`, `css`, `beName`, `enableValidFormStatus` |
| **`Prompt`** | 业务提示选择 | 业务 PT 资源弹窗/下拉选择，支持动态级联 | **纯叶子节点**<br/>放入 `FormItemContainer` 内 | `fieldName`, `promptName`, `type`, `config`, `remoteForm` |
| **`StepPlus`** | 流程步骤条 | 多步骤流程展示与分步内容切换 | **槽位容器**<br/>按索引对应 `Container` 槽位 | `alias`, `stepItems`, `direction`, `enableClick` |
| **`SingleUpload`** | 文件上传 | 单文件/多文件上传与业务字段绑定 | **纯叶子节点**<br/>放入 `FormItemContainer` 内 | `fieldName`, `mode`, `listType`, `events` |
| **`Switch`** | 切换开关 | 双值开关（如 `"Y"`/`"N"`），支持自定义文案图标 | **纯叶子节点**<br/>放入 `FormItemContainer` 内 | `fieldName`, `checkValue`, `noCheckValue`（无 `style`） |
| **`Radio`** | 单选框组 | 互斥单选或分段按钮组 | **纯叶子节点**<br/>放入 `FormItemContainer` 内 | `fieldName`, `options`, `optionType`, `buttonStyle` |
| **`Tab`** | 标签页 | 多内容区域切换标签页 | **槽位容器**<br/>每项对应 `Container` Linked Node | `alias`, `tabItem`, `tabType`, `defaultTabActiveKey` |
| **`Card`** | 信息卡片 | 独立内容卡片（自动生成标题/内容/底部等 5 区域） | **复合容器**<br/>先读真实子节点 ID 再更新 | `alias`, `data`, `displayTitle`, `collapsible` |
| **`Dropdown`** | 下拉菜单 | 菜单项触发下拉（带 Trigger/Item 插槽） | **插槽容器**<br/>`DropdownTriggerSlot` / `ItemSlot` | `menuItems`, `trigger`, `placement`, `events` |
| **`Collapse`** | 折叠面板 | 详情页多区块表单分组（可展开/收起） | **槽位容器**<br/>每项对应 `Container` Linked Node | `alias`, `collapseItem`, `defaultActiveKey`, `accordion` |
| **`StateModel`** | 状态模型 | 业务记录状态展示与流转操作 | **纯叶子节点**<br/>无子组件 | `alias`, `beName`, `id`, `displayType`, `isAfterRefreshPage` |
| **`Step`** | 阶段进度条 | 详情页顶部阶段进度展示（区别于带内容槽的 `StepPlus`） | **纯叶子节点**<br/>常包裹在 `ServiceData` 内 | `alias`, `stepItems`, `labelPlacement`, `isPercent` |
| **`Timeline`** | 时间线 | 跟进记录、变更日志等按时间轴展示 | **循环模板容器**<br/>子节点为单条模板（`context.item.data`） | `alias`, `dataSourceType`, `mode`, `onDataInitial`, `beName` |
| **`Grid`** | 经典表格 | 存量项目中的旧版数据表格（新配置优先 `GridPlus`） | **业务复合组件**<br/>通过 `formDialogProperty` 关联弹窗 | `dataConfig`, `gridColumns`, `tableGlobalStyle`, `paginationConfig` |
| **`Drawer`** | 抽屉面板 | 列表页侧滑详情预览、侧边表单、代码/文档预览 | **槽位容器**<br/>`DrawerExtra` / 内容区 / `DrawerFooter` | `alias`, `title`, `width`, `placement`, `showButton` |
| **`Descriptions`** | 描述列表 | 详情页只读摘要信息块（标签-值多列网格） | **纯叶子节点**<br/>无子组件 | `title`, `column`, `bordered`, `descriptionsItem` |
| **`CodeEditor`** | 代码编辑器 | 脚本/SQL 录入或只读代码片段展示（Monaco） | **纯叶子节点**<br/>表单内或独立展示 | `fieldName`, `language`, `theme`, `readOnly`, `defaultValue` |
| **`ColorPicker`** | 颜色选择器 | 主题色、标签色、流程阶段色配置 | **纯叶子节点**<br/>放入 `FormItemContainer` 内 | `fieldName`, `format`, `defaultValue`, `showColorText` |
| **`DetailsPageContainer`** | 详情页框架 | 三段式详情页（Head/Content/Footer）与上一条/下一条翻页 | **槽位容器**<br/>先读 Head/Content/Footer 真实 ID | `enablePage`, `displayHead`, `displayFoot` |
| **`FileUpload`** | 多文件上传 | 表单多附件/图片墙上传（数组模型） | **纯叶子节点**<br/>放入 `FormItemContainer` 内 | `fieldName`, `listType`, `maxCount`, `ruleCode`, `typeCode` |
| **`Image`** | 图片展示 | 头像、缩略图、附件图片预览（支持 `fileId`/`url`） | **纯叶子节点**<br/>无子组件 | `source`, `imageStyle`, `preview`, `lazyLoad` |
| **`Transfer`** | 穿梭框 | 左右双栏穿梭选择与批量移动 | **业务复合组件**<br/>无子组件 | `leftResource`, `rightResource`, `addRightDataSource`, `removeRightDataSource` |
| **`Tree`** | 树形控件 | 左树右表、组织架构树、多选/拖拽树 | **纯叶子节点**<br/>无子组件 | `alias`, `metaData.beName`, `treeFieldNames`, `treeConfig` |
| **`TreeSelect`** | 树选择器 | 表单内单选/多选层级树节点 | **纯叶子节点**<br/>放入 `FormItemContainer` 内 | `fieldName`, `treeData`, `isMultiple`, `isOnlyLeafNode` |
| **`AutoComplete`** | 自动完成 | 支持静态、自定义函数或 BE 异步检索的输入框 | **槽位/叶子控件**<br/>开启自定义模板时读写 `AutoCompleteOptionSlot` | `fieldName`, `dataSourceType`, `customFunction`, `beName` |

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
4. **纵向容器 (`flexDirection: "column"`) 的默认 `flexAlignItems: "center"` 收缩问题**：
   - **问题**：Oasis `Container` 默认 `flexJustifyContent: "center"`、`flexAlignItems: "center"`。在纵向容器内放置未显式声明 `width: "100%"` 的组件（如 `Collapse`、`Step`、`Tab`、`GridPlus`、`Form`）时，它们会居中并收缩为内容宽度，无法铺满整行。
   - **规范**：纵向页面骨架容器务必设置 `flexJustifyContent: "flex-start"`、`flexAlignItems: "flex-start"`，并在 `style` 中补充 `alignItems: "stretch"`（参考 `containerPresets.verticalStack`）。

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

---

## 5. 复杂业务组件规范：`Form` 与 `GridPlus`

### 5.1 Form 表单的双路径布局与绑定规范
1. **结构树规则**：`Form` 内部必须通过 `FormItemContainer` 承载字段区域（`FormItemContainer` 本身无任何可配置 props，传入 `{}`）。
2. **两种字段区排版路径**：
   - **简单等宽分栏**：`Form.columns` 设为 `"1"` / `"2"` / `"3"`，字段控件直接放在 `FormItemContainer` 下，运行时自动按 `repeat(columns, minmax(0, 1fr))` 均分。
   - **灵活布局（含 `gap`、分组、跨列）**：`Form.columns` 设为 `"1"`，在 `FormItemContainer` 下放入一个 `Container`（通过 `Container.style` 配置 Flex/Grid 与 `gap`），再把字段控件放入该 `Container`。
3. **BE 绑定 vs 未绑定原型表单**：
   - **未绑定/函数驱动表单**：保持 `type: "be"` 且将 `beName`、`parentBeName` 留空，**严禁**配置 `BEResultFields`、`id`、`parentId`、`dataset`，也不要调用内置 `toGet()` / `submitForm()`；统一通过 `context.form.setFormFields` / `getFormFields` 或 `context[alias]` 读写。
   - **BE 绑定表单**：仅在 BM/BE 已确认后配置 `beName`、`BEResultFields` 与业务 `rules`。

### 5.2 GridPlus 数据表格关键不变量
1. **三大必填/不变量**：
   - `alias` 必须是非空、页面唯一的字面量字符串（**禁止**用 `JSExpression`）；
   - `isFinishGuide` 必须为 `true`；
   - `metaData.beName` 为空时运行时只渲染占位符 `<Placeholder content="表格" />`。
2. **列与标签规范**：
   - 缺失 BE 字段类型时 `type` 回退为 `"Varchar"`（不能填 `"string"`）；
   - 新配置标签列使用 `cellRender: "tag"` 并保持 `format: "none"`（不要用已废弃的 `format: "tag"`）。
3. **事件格式区分**：
   - `columns[].events` 与 `inlineEditing.events` 是**数组**：`[{ trigger, code }]`；
   - `globalOperationConfig.buttons[].event`、`rowOperationConfig.buttons[].event` 与 `customerProperty.events` 是**包装对象**：`{ id, events: [{ trigger, code }] }`；内置 `add`/`update`/`delete` 无自定义逻辑时直接省略 `event`。

### 5.3 `Dialog` 弹窗与设计态打开技巧
* **标题与底部按钮字段**：弹窗标题使用 `headTitle`（不是 `title`）；底部按钮使用 `footer: true` + `footerContent: [...]`（提交表单用 `buttonBehavior: "submit"` + `formAlias`，关闭弹窗用 `buttonBehavior: "cancel"` + `isCloseDialog: true`）。
* **设计态打开表单技巧**：在 IDE 配置器中直接点击 `GridPlus` 的新建/编辑按钮不会弹出关联的 `Dialog`。业务人员通常会保留 `Dialog.showButton: true`（或配置一个隐藏按钮调用 `context[dialogAlias].onOpenDialog()`），以便在配置器里随时点开编辑内部的 `Form`。

---

## 6. 实站沉淀：企业级 CRM 页面典型架构菜谱 (CRM Recipes)

以下两类结构沉淀自真实线上业务页面（如「个人客户线索管理」「个人客户线索详情」）：

### 6.1 企业级列表管理页（List Management Page）
* **典型结构树**：
  * `PageRoot (ROOT)`
    * `Container (页面主容器, vertical, gap: 12px)`
      * `Container (顶部筛选卡片)` → `Form (columns: "3" 或 "4", 放 Input/Transform/Prompt)` + `Container (搜索 / 高级搜索 / 重置 Button 组)`
      * `GridPlus`（或存量页面中的 `Grid`，绑定 BE 实体与 `globalOperationConfig` / `rowOperationConfig`）
      * `Dialog`（新增/修改弹窗，内部放 `Form -> FormItemContainer -> 字段控件`）

### 6.2 企业级多页签详情页（Detail Page with Step & Collapse & Timeline）
* **典型结构树**：
  * `PageRoot (ROOT)`
    * `Container (详情页整体容器, vertical)`
      * `Container (顶部-主体区域外部容器)`
        * `Container (顶部标题与状态区)`
          * `Container (标题行: Text 标题 + Button/StateModel 状态流转)`
          * `ServiceData` → `Step (labelPlacement: "vertical", isPercent: true, stepItems 动态绑定 context?.stepAllStages)`
        * `Container (主内容区域)`
          * `Tab (如 "基本信息" / "联系报告" / "变更日志"，每个页签对应一个 Container Linked Node)`
            * **基本信息槽位**：`Collapse (defaultActiveKey 全展开)` → 各折叠块 Linked Node 内放 `Form (主表单)` 或子表 `GridPlus`
            * **联系报告槽位**：`GridPlus` / `Grid` + 关联 `Dialog`
            * **变更日志槽位**：`Timeline (dataSourceType: "default" 或 "be", 子节点为单条模板)`
      * `Container (底部固定操作栏, flexDirection: "row", flexJustifyContent: "flex-end")` → `Button (保存 / 返回)`

### 6.3 列表页 + 侧滑抽屉详情 / 代码预览（`Drawer` + `Tab` + `CodeEditor`）
* 沉淀自「数据埋点-埋点事件管理」等配置管理页面：
  * `PageRoot (ROOT)` → `Container`
    * `GridPlus`（或 `Grid`）+ 新增/编辑 `Dialog`
    * `Drawer (alias: "detailDrawer", showButton: false, placement: "right", width: 720)`：行内“详情/查看代码”按钮触发 `context.detailDrawer.onShowDrawer()`
      * 抽屉内容区放 `Tab`（多环境/多格式切页）+ `Text` 说明 + `CodeEditor (readOnly: true, isNeedFormItem: false)`，底部 `DrawerFooter` 放关闭/复制 `Button`。

---

> **接口调用与详情加载**：关于 `ServiceData` + `request` 调用标准 BE 接口、`GridPlus` 列表加载以及 `Form` 详情加载与回填的完整协议，见 [DATA_AND_API.md](./DATA_AND_API.md)。
