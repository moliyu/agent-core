# Oasis 配置器右侧「上下文/变量」与组件 `context[alias]` 速查表

在 Oasis 变量 / JS 编辑器中，左侧是全局「函数/常量」（见 [RUNTIME_GLOBALS.md](./RUNTIME_GLOBALS.md)），**右侧「上下文/变量」**则是页面级状态与各组件通过 `alias` 注册到 `context` 上的运行时对象（类型定义见 [runtime-context.ts](./runtime-context.ts)）。

> 对应 Oasis 源码：
> - `oasis-tools/.../configurators/advanced/context-metadata/`
> - `oasis-agent/src/component-schemas-v2/` 各组件 Page Context / 子树 Context 契约

---

## 1. 页面基础上下文（右侧默认成员）

| 上下文路径 | 编辑器显示名称 | 类型 | 说明 |
| :--- | :--- | :--- | :--- |
| **`context.updateContext`** | 更新上下文数据 | 函数 | `context.updateContext(draft => { draft.xxx = val; })`（Immer draft 回调） |
| **`context.globalLoading`** | 页面的加载 | 对象 | `loading`、`startLoading()`、`endLoading()` |
| **`context.meta`** | 元数据信息 | 对象 | `bmName`、`beName`、`parentBeName`、`dataset`（由 `PageRoot` 发布） |
| **`context.l`** | 国际化 | 对象 | `l.get('集合码值.码值')` |
| **`context.pageFullPath`** | 当前页面全路径 | 字符串 | 当前页面完整路径 |
| **`context.pageId`** | `pageId` | 字符串 | 当前页面 ID |
| **`context._id`** | `_id` | 字符串 | 当前页面记录 ID |
| **`context.initialData`** | `initialData` | 对象 | 页面初始数据 |
| **`context.mock`** | `mock` | 对象 | 编辑器预览 Mock 数据 |
| **`context.validFormStatus`** | `validFormStatus` | 函数 | 全局表单校验状态 |

---

## 2. 组件页面级上下文 (`context[alias]`)

当组件配置了非空 `alias` 时，运行时会将其状态与操作方法挂载到 `context[alias]` 上（部分组件如 `EventCalendar` / `SchedulingWorkbench` / `AssignmentBoard` / `ApprovalFlow` 具有默认 `alias`）。

### 2.1 表单与条件类
| 组件 | `alias` 暴露的核心成员与方法 |
| :--- | :--- |
| **`Form`** | `nodeId`, `beName`, `parentBeName`, `id`, `parentId`, `dataset`, `data`, `originalData`, `readOnlyFields`, `rules`, `toGetLoading`<br/>`setRules(rules)`, `validateForm(cb)`, `validateFields(cb, names?)`, `syncFormData(data)`, `setFormFields(data)`, `getFormFields(names?, filter?)`, `getSubmitUrl()`, `submitForm()`, `resetForm(names?)`, `setFormId(id?)`, `setFormDataset(ds?)`, `setFormParentId(pid?)`, `toGet()`, `getFormChangeData()`, `setFieldsError(errors)`, `getFormChangeStatus()` |
| **`SubForm`** | `nodeId`, `beName`, `parentBeName`, `parentId`, `dataset`, `loading`, `pageNo`, `pageSize`, `dataSource`, `isCollapsed`, `queryAll`<br/>`setIsCollapsed()`, `setDataSource()`, `addDataItem()`, `removeDataItem()`, `prevPage()`, `afterPage()`, `changePageNo()`, `setPageSize()`, `getSubFormData()`, `validate()`, `setSubFormData()`, `getDeleteData()`, `getSubFormChangeStatus()`, `setQueryAll()`, `getSubFormFields()` |
| **`UnitPicker`** | `bmName`, `nodeId`, `openDialog({ type, allowUnitTypes, value })`, `closeDialog()`, `clearValue()`, `getValue()`, `getSelectedItems()`, `isDialogVisible()` |
| **`ConditionBuilder`** | `setCondition(cond)`, `getCondition()`, `validate(cb?)`, `getPreviewText()`, `getConditionWithoutInitialValues()` |
| **`BeConditionBuilder`** | `setCondition(cond)`, `getCondition()`, `validate(cb?)`, `getPreviewText()` |
| **`AndOrComponent`** | `getData()`, `valid()` |
| **`SearchParamsConstructor`** | `onGetSearchParams()`, `getPreviewText()` |

### 2.2 表格、树与列表类
| 组件 | `alias` 暴露的核心成员与方法 |
| :--- | :--- |
| **`GridPlus` / `Grid`** | `rowKey`, `data`, `isLoading`, `summary`, `datasetId`, `dataset`, `sort`, `searchParams`, `chooseData`, `page` (`{ page, limit, total }`), `parentBusinessEntityId`<br/>`setIsLoading(bool)`, `setGridValues(rows)`, `getGridDataByKey(key)`, `getChooseGridData()`, `setChooseGridData(rows)`, `setChooseAllGridData(bool)`, `setQueryParams(params)`, `setGridSort(sort)`, `setPageNo(page)`, `setPageLimit(limit)`, `queryGrid()`, `refreshGrid()`, `switchDatasets(datasetId)`, `setParentBusinessEntityId(id)` |
| **`Table`** | `data`, `summary` |
| **`StructureBuilder`** | `getVisibleRowData()`, `getTreeData()`, `getRow(id)`, `getSelectedRows()`, `getSelectedIds()`, `addRow(data)`, `addChildRow(parentId, data)`, `updateRow(id, data)`, `removeRow(id)`, `removeRows(ids)`, `removeChildren(id)`, `expand(id)`, `collapse(id)`, `toggleExpand(id)`, `getChildren(id)`, `getParent(id)`, `getAncestors(id)` |
| **`Tree`** | `data`, `datasetId`, `dataset`/`datasets`, `selectedKeys`, `checkedKeys`, `expandedKeys`, `switchDataset`/`switchDatasets(id)`, `setSelectedKeys(keys)`, `setCheckedKeys(keys)`, `setExpandedKeys(keys)` |
| **`TreeView`** | `expandAll()`, `collapseAll()` |
| **`Timeline`** | `pageNo`, `data`, `bmName`, `parentBeName`, `beName`, `setTimeLineData(data)`, `setTimeLinePageNo(page)`, `setHasMore(bool)` |

### 2.3 交互、容器与弹窗类
| 组件 | `alias` 暴露的核心成员与方法 |
| :--- | :--- |
| **`Button`** | `loading`, `startLoading()`, `endLoading()`, `runWithLoading(async () => ...)` |
| **`Dialog`** | `onOpenDialog({ after?: ({ context }) => ... })`, `onHideDialog({ after?: ({ context }) => ... })` |
| **`Drawer`** | `onShowDrawer()`, `onHideDrawer()` |
| **`Prompt`** | `onOpenDialog()`, `onHideDialog()`, `setDisabledOptions([...ids])` |
| **`ExportProgressDialog`** | `showExportProcessDialog(historyId, title?)` |
| **`StateModel`** | `transitionState()`, `close()`, `refresh()` |
| **`Tab`** | `getCurrentActiveKey()` |
| **`Card`** | `cardData`, `cardExpanded` |
| **`Collapse`** | `expand()`, `collapse()` |
| **`Step` / `StepPlus`** | `current` / `step`, `previous()`, `next()`, `setPosition(index)` |
| **`QrCode`** | `download(filename?)` |

### 2.4 流程、看板、日历与高级组件
| 组件 | `alias` 暴露的核心成员与方法 |
| :--- | :--- |
| **`ApprovalFlow`** *(默认 `approvalFlow`)* | `workflowTask`, `form`, `positions`, `isOwner`, `operations`, `access`, `resources`, `resourcesCtrl`, `areaMap`, `fieldMap` |
| **`WorkFlow`** | 运行时工作流实例 API（供节点事件或侧栏调用） |
| **`DashboardDesign`** | `getLayouts()` |
| **`EventCalendar`** *(默认 `eventCalendar`)* | `refreshView()` |
| **`SchedulingWorkbench`** *(默认 `schedulingWorkbench`)* | `refreshView()` |
| **`AssignmentBoard`** *(默认 `assignmentBoard`)* | 看板运行时容器/项目分配状态与操作 |
| **`PipelineV2`** | 阶段与任务分页看板运行时 API |
| **`SchemaDefinition`** | `nodeId`, `setData(schema)`, `getData()` |
| **`SchemaBinding`** | `nodeId`, `setData(mapping)`, `getData()` |
| **`RecursiveContainer`** | 递归 Store（`data`, `templates`, `childrenKey`, `itemKey`, `rootNodeId` 等） |
| **`StreamContentRender`** | 从 `context[alias]` 读取当前流式字符串内容 |
| **`CustomerJourneySearch`** | `getData()` |
| **`ModelResultFusion`** | `getModelList()`, `getNodeList()`, `updateNodeById(id, item)` |
| **`ServiceData`** | 推荐通过 `customFunction` 调 `context.updateContext(...)` 发布显式业务键 |

---

## 3. 局部子树 / 迭代上下文（仅在模板子树内有效）

| 所属组件 / 模板 | 子树内可用上下文路径 | 说明 |
| :--- | :--- | :--- |
| **`IteratorContainer`** | `context.iterator.item`、`context.iterator.index` | 随 `iteratorVariableName` / `indexVariableName` 变化 |
| **`PipelineKanban`** | `context.iterator.item`、`context.iterator.index`、`context.pipeline.stageId` | 阶段与任务迭代模板实例内可用 |
| **`SubForm` / `SubFormItem`** | `context.subForm`、`context.subFormItem.data`、`context.subFormItem.index`、`context.subFormItem.parentContext` | `context.subForm` 即使 `alias` 为空也可在子树内访问 |
| **`Timeline` / `TimelineItem`** | `context.item.data`、`context.item.index` | 单条时间线模板内可用 |
| **`AutoComplete` / `AutoCompleteOptionSlot`** | `context.item.data`、`context.item.index` | 自定义选项模板内可用 |
| **`RecursiveContainerTemplate`** | `context.item`、`context.index`、`context.recursiveTemplateId` | 递归模板子树内可用 |
| **`AssignmentBoardContainerTemplate` / `ItemTemplate`** | `context.item`、`context.index` | 当前 Container / Item 模板内可用 |
| **`Card`** | `context.cardData`、`context.cardExpanded` | Card 后代节点可直接读取 |
| **`Collapse`** | `context.initialData` | Collapse 内容 Linked Node 子树内可用 |
| **`Dialog`** | `context.onOpenDialog(options?)`、`context.onHideDialog(options?)` | 弹窗内容子树内可直接调用 |
| **`Drawer`** | `context.onShowDrawer()`、`context.onHideDrawer()` | 抽屉内容子树内可直接调用 |
| **`Dropdown`** | 下拉选项/触发器局部上下文 | 仅在对应 Slot 子树内可用 |
| **`DetailsPageContainer`** | `context.detailPage` | `enablePage: true` 时在 Head/Content/Footer 内可用 |
