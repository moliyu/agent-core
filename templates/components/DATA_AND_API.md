# Oasis 接口调用与表格/表单详情加载指南

本指南沉淀自 Oasis 运行时与标准 BE 协议，说明 **如何在页面中调用接口**、**表格如何加载数据** 以及 **表单如何加载与回填详情**。

---

## 1. 如何调用接口（`ServiceData` + `request`）

### 1.1 通过 `ServiceData` 发布页面数据与方法
推荐使用 `ServiceData`（`dataSourceType: "default"` + `customFunction`）**直接包裹**需要消费数据的区域或整页内容区（保持 `visible: true`，**严禁**设为 `visible: false` 空置，否则 IDE 设计态会渲染大块 `>隐藏状态<` 占位框影响画布排版）。在挂载时执行初始化函数，并通过 `context.updateContext((draft) => { ... })` 发布数据与刷新方法：

```ts
// ServiceData.customFunction.value 实站标准写法（Immer draft 回调）
`return () => {
  const loadDetail = async (id) => {
    if (!id) return;
    context.updateContext((draft) => {
      draft.detailLoading = true;
    });
    try {
      const res = await request({
        url: "/com/TZConsumerLeads/TZConsumerLeads/searchObj/" + id,
        method: "GET",
        params: {
          tzParams: JSON.stringify({
            resultFld: "Id,Name,Mobile,Status,ModificationNumber",
            dataset: "",
          }),
        },
      });
      context.updateContext((draft) => {
        draft.leadDetail = res?.data || {};
        draft.detailLoading = false;
      });
    } catch (e) {
      context.updateContext((draft) => {
        draft.detailLoading = false;
      });
      sendMessage("详情加载失败，请稍后重试", "error");
    }
  };

  const leadId = router?.searchParams?.get("Id") || router?.searchParams?.get("id") || "";
  context.updateContext((draft) => {
    draft.leadDetail = {};
    draft.detailLoading = false;
    draft.reloadLeadDetail = () => loadDetail(leadId);
  });
  if (leadId) loadDetail(leadId);
}`
```

> **实站高频约定（来自线上业务页面）**：
> - **`context.updateContext((draft) => { ... })`**：传入回调修改 `draft`（如 `draft.stepAllStages = step`），**不要**直接传普通对象。
> - **`request` 调用约定**：`url` **必须省略 `/api` 前缀**（如 `/com/{bm}/{be}/searchList`、`/system/TZTransform/transform/{code}/ZHS`、`/state-model/get/primary-path`）。
> - **常用全局内置对象/函数**：
>   - `router?.searchParams?.get("Id")`：读取 URL 查询参数（注意大小写，部分页面用 `Id` / `TenantId` / `BuId`）。
>   - `user?.positions?.primaryPosition?.buId`：读取当前登录用户的默认组织/岗位信息。
>   - `sendMessage("提示内容", "success" | "error" | "warning")`：全局轻提示。
>   - `context[alias]`：直接调用同页其他组件暴露的方法（如 `context?.leadStage?.setPosition(currentIndex)`）。
> - **两种典型落位（均保持 `visible: true` 包裹子组件）**：
>   1. **包裹局部组件**：如 `ServiceData -> Step`、`ServiceData -> Timeline` 或 `ServiceData -> Table / GridPlus`，加载阶段/列表/字典后直接驱动子组件；
>   2. **包裹整页/主内容区**：将 `ServiceData` 包裹整块业务内容（初始化空数组、`childBuids` 等共享上下文以及 `loadXxx`/`refreshXxx` 方法），供子树内所有 `GridPlus`、`IteratorContainer` 或按钮消费。

### 1.2 标准 BE 接口速查表

> 若操作子实体（Child BE），路径前缀由 `/com/{bm}/{be}/...` 变为 `/com/{bm}/{parentBe}/{parentBeId}/{be}/...`。

| 能力 | Method & URL（省略 `/api`） | 核心参数说明 |
| :--- | :--- | :--- |
| **列表查询** | `GET /com/{bm}/{be}/searchList` | Query `tzParams` (JSON 字符串)：`resultFld`（必填，逗号分隔字段）、`condition`、`sort`、`page`、`limit`、`dataset`、`resultCount`、`filterName` |
| **详情查询** | `GET /com/{bm}/{be}/searchObj/{id}` | Query `tzParams` (JSON 字符串)：`resultFld`（必填）、`dataset` |
| **新增单条** | `POST /com/{bm}/{be}/addObj` | Body：`{ dataset, data: { "FieldName-value": "..." } }`（字段名需带 `-value` 后缀） |
| **修改单条** | `POST /com/{bm}/{be}/updateObj/{id}` | Body：`{ dataset, data: { "Id-value": id, "ModificationNumber-value": ver, "FieldName-value": "..." } }`（必须带版本号 `ModificationNumber-value`） |
| **删除单条** | `POST /com/{bm}/{be}/deleteObj/{id}` | Body/Query：`{ dataset }` |
| **批量删除** | `POST /com/{bm}/{be}/batchDeleteObj` | Body：`{ data: "id1,id2", dataset }` |
| **BE Action** | `POST /com/be/{be}/action-execute/{actionCode}` | 自定义后端动作，入参与响应按实际 Action 定义 |

---

## 2. 表格如何加载数据

### 2.1 `GridPlus`（BE 自动加载，推荐）
1. 确保 `isFinishGuide: true` 且 `alias` 为页面唯一非空字面量字符串。
2. 配置 `metaData`：
   - `beName`：目标业务实体名（为空时运行时仅显示占位符）；
   - `parentId`：子表场景下用 `JSExpression` 绑定父记录 ID；
   - `datasets` / `filterName` / `defaultQueryParams`：按需配置数据集、可配置查询或默认过滤条件。
3. 运行时 `GridPlus` 会自动请求 `searchList` 加载分页数据；外部脚本可通过 `context[alias]` 触发刷新或检索。

### 2.2 `ServiceData` + `IteratorContainer`（自定义接口 / 卡片列表）
1. `ServiceData` 调用自定义接口或 `searchList`，通过 `context.updateContext({ items: list })` 发布数组。
2. `IteratorContainer` 的 `iteratorData` 绑定 `return context.items || []`。
3. 模板子树内通过 `context.iterator.item` 与 `context.iterator.index` 读取当前项字段。

---

## 3. 表单如何加载详情（`Form` 三种路径）

### 3.1 路径 A：BE 自动加载详情（独立详情页 / 编辑页）
适用于表单直接绑定业务实体并自动拉取/提交的场景：
- 配置 `beName`（及子实体的 `parentBeName`）与 `BEResultFields`（需要回填的字段列表）。
- 将 `id` 配置为 `JSExpression` 从路由或上下文读取主键，例如：
  ```json
  {
    "_type": "JSExpression",
    "value": "return router?.searchParams?.get('id') || '';"
  }
  ```
- 子实体表单还需配置 `parentId`（`JSExpression` 绑定父记录 ID）。
- 挂载后或调用 `context[alias].toGet()` 时，表单自动请求 `searchObj/{id}` 并回填字段；提交时调用 `submitForm()`。

### 3.2 路径 B：`GridPlus` 列表行点击弹窗加载详情（CRUD 弹窗）
适用于列表页的新增/编辑弹窗：
1. 在 `GridPlus` 同级放置共享 `Dialog`，其内部放置 `Form -> FormItemContainer -> 字段控件`。
2. `Form` 配置好 `alias`、`beName`、`BEResultFields`（**不手写固定 `id`**）。
3. 将 `Dialog` 与 `Form` 的真实节点 ID 填入 `GridPlus.formDialogProperty`（`addDialogNodeId`、`addFormNodeId`、`updateDialogNodeId`、`updateFormNodeId`）。
4. 运行时点击表格行“编辑”按钮，`GridPlus` 会自动打开弹窗并将当前行 `Id` 注入 `Form` 加载详情。

### 3.3 路径 C：自定义接口 / 函数驱动回填（未绑定 BE 原型表单）
适用于提交到非标准接口或由 `ServiceData` 统一拉取多块数据的页面：
1. `Form` 保持 `type: "be"`，但**将 `beName`、`parentBeName`、`BEResultFields`、`id`、`parentId`、`dataset` 全部留空**（且不要调用 `toGet()` / `submitForm()`）。
2. 由 `ServiceData` 或按钮事件调用 `request(...)` 获取详情数据后，调用：
   - **Form 内部事件/子脚本**：`context.form.setFormFields(detailObj)`
   - **Form 外部脚本**：`context[formAlias].setFormFields(detailObj)`
3. 读取表单当前值同理使用 `context.form.getFormFields()` 或 `context[formAlias].getFormFields()`。
