/**
 * Oasis 变量/JS 编辑器右侧「上下文/变量」与组件 `context[alias]` 类型定义
 *
 * 对应源码：
 * - `oasis-tools/src/components/major-window/property-list/configurators/advanced/context-metadata/`
 * - `oasis-agent/src/component-schemas-v2/` 各组件 Page Context / 子树 Context 契约
 */

// ============================================================================
// 1. 页面基础上下文（右侧「上下文/变量」默认成员）
// ============================================================================

/** 页面加载状态控制器 (`context.globalLoading`) */
export interface OasisGlobalLoading {
  loading: boolean;
  startLoading: () => void;
  endLoading: () => void;
}

/** 页面多语言读取器 (`context.l`) */
export interface OasisContextLocale {
  get: (codeKey: string) => string;
}

/** 页面元数据信息 (`context.meta`) */
export interface OasisPageMeta {
  bmName?: string;
  beName?: string;
  parentBeName?: string;
  dataset?: string;
}

/** 页面基础上下文 */
export interface OasisBasePageContext {
  /** 更新上下文数据（Immer draft 回调：`context.updateContext(draft => { draft.xxx = ... })`） */
  updateContext: (updater: (draft: Record<string, any>) => void) => void;
  /** 当前页面全路径 */
  pageFullPath: string;
  /** 页面全局加载状态控制 */
  globalLoading: OasisGlobalLoading;
  /** 页面国际化读取 */
  l: OasisContextLocale;
  /** 页面元数据信息（由 PageRoot 发布） */
  meta?: OasisPageMeta;
  /** 页面记录/实例 ID */
  _id?: string;
  /** 页面初始数据 */
  initialData?: Record<string, unknown>;
  /** 编辑器预览 Mock 参数 */
  mock?: Record<string, unknown>;
  /** 当前页面 ID */
  pageId?: string;
  /** 全局表单校验状态 */
  validFormStatus?: (...args: unknown[]) => unknown;
  /** 动态业务上下文与组件 `context[alias]` */
  [alias: string]: any;
}

// ============================================================================
// 2. 组件页面级上下文 (`context[alias]`)
// ============================================================================

/** `Button` 上下文 (`context[alias]`) */
export interface ButtonContext {
  loading: boolean;
  startLoading: () => void;
  endLoading: () => void;
  runWithLoading: <T = unknown>(fn: () => Promise<T>) => Promise<T>;
}

/** `Form` 上下文 (`context[alias]`) */
export interface FormContext {
  nodeId?: string;
  beName?: string;
  parentBeName?: string;
  id?: string;
  parentId?: string;
  dataset?: string;
  data: Record<string, unknown>;
  originalData: Record<string, unknown>;
  readOnlyFields: string[];
  rules: Record<string, unknown[]>;
  toGetLoading?: boolean;
  setRules: (rules: Record<string, unknown[]>) => void;
  validateForm: (callback: (valid: boolean, values: Record<string, unknown>) => void) => void;
  validateFields: (
    callback: (valid: boolean, values: Record<string, unknown>) => void,
    fieldNames?: string[],
  ) => void;
  syncFormData?: (data: Record<string, unknown>) => void;
  setFormFields: (data: Record<string, unknown>) => void;
  getFormFields: (fieldNames?: string[] | boolean, filterFunc?: (...args: unknown[]) => boolean) => Record<string, unknown>;
  getSubmitUrl?: () => string;
  submitForm: () => Promise<unknown>;
  resetForm: (fieldNames?: string[]) => Promise<unknown>;
  setFormId: (id?: string) => void;
  setFormDataset: (dataset?: string) => void;
  setFormParentId: (parentId?: string) => void;
  toGet: () => Promise<unknown>;
  getFormChangeData: () => Record<string, unknown>;
  setFieldsError: (errors: Array<{ name?: string; errors?: string[] }>) => void;
  getFormChangeStatus?: () => boolean;
}

/** `SubForm` 上下文 (`context[alias]` 或子树 `context.subForm`) */
export interface SubFormContext {
  nodeId: string;
  beName?: string;
  parentBeName?: string;
  parentId?: string;
  dataset?: string;
  loading?: boolean;
  pageNo: number;
  pageSize: number;
  dataSource: Array<Record<string, unknown>>;
  isCollapsed: boolean;
  queryAll?: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  setDataSource: (dataSource: Array<Record<string, unknown>>) => void;
  addDataItem: (item?: Record<string, unknown>) => void;
  removeDataItem: (index: number) => void;
  prevPage: () => void;
  afterPage: () => void;
  changePageNo: (pageNo: number) => void;
  setPageSize: (pageSize: number) => void;
  getSubFormData: () => Array<Record<string, unknown>>;
  validate: () => Promise<boolean>;
  setSubFormData?: (data: Array<Record<string, unknown>>) => void;
  getDeleteData: () => Array<Record<string, unknown>>;
  getSubFormChangeStatus: () => boolean;
  setQueryAll?: (queryAll: boolean) => void;
  getSubFormFields: () => Array<Record<string, unknown>>;
}

/** `GridPlus` / `Grid` 上下文 (`context[alias]`) */
export interface GridPlusContext {
  rowKey: string;
  data: Array<Record<string, unknown>>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  summary: Record<string, unknown>;
  datasetId: string;
  dataset: unknown[];
  sort: unknown[];
  searchParams: Record<string, unknown>;
  chooseData: Array<Record<string, unknown>>;
  page: { page: number; limit: number; total: number };
  parentBusinessEntityId: string;
  setGridValues: (values: Array<Record<string, unknown>>) => void;
  getGridDataByKey: (key: string | number) => Record<string, unknown> | undefined;
  getChooseGridData: () => Array<Record<string, unknown>>;
  setChooseGridData: (rows: Array<Record<string, unknown>>) => void;
  setChooseAllGridData: (selected: boolean) => void;
  setQueryParams: (params: Record<string, unknown>) => void;
  setGridSort: (sort: unknown[]) => void;
  setPageNo: (page: number) => void;
  setPageLimit: (limit: number) => void;
  queryGrid: () => void;
  refreshGrid: () => void;
  switchDatasets: (datasetId: string) => void;
  setParentBusinessEntityId: (id: string) => void;
}

/** `Table` 上下文 (`context[alias]`) */
export interface TableContext {
  data: Array<Record<string, unknown>>;
  summary: Record<string, unknown>;
}

/** `Dialog` 上下文 (`context[alias]`) */
export interface DialogContext {
  onOpenDialog: (options?: { after?: (fnCtx: { context: OasisBasePageContext }) => void; [key: string]: unknown }) => void;
  onHideDialog: (options?: { after?: (fnCtx: { context: OasisBasePageContext }) => void; [key: string]: unknown }) => void;
}

/** `Drawer` 上下文 (`context[alias]`) */
export interface DrawerContext {
  onShowDrawer: (options?: Record<string, unknown>) => void;
  onHideDrawer: (options?: Record<string, unknown>) => void;
}

/** `Prompt` 上下文 (`context[alias]`) */
export interface PromptContext {
  onOpenDialog: () => void;
  onHideDialog: () => void;
  setDisabledOptions: (ids: string[]) => void;
}

/** `ExportProgressDialog` 上下文 (`context[alias]`) */
export interface ExportProgressDialogContext {
  showExportProcessDialog: (historyId: string, title?: string) => void;
}

/** `Tab` 上下文 (`context[alias]`) */
export interface TabContext {
  getCurrentActiveKey: () => string;
}

/** `Card` 上下文 (`context[alias]`) */
export interface CardContext {
  cardData: Record<string, unknown>;
  cardExpanded: boolean;
}

/** `Collapse` 上下文 (`context[alias]`) */
export interface CollapseContext {
  expand: () => void;
  collapse: () => void;
}

/** `Step` / `StepPlus` 上下文 (`context[alias]`) */
export interface StepContext {
  current?: number;
  step?: string | number;
  previous: () => void;
  next: () => void;
  setPosition: (index: number) => void;
}

/** `Timeline` 上下文 (`context[alias]`) */
export interface TimelineContext {
  pageNo: number;
  data: Array<Record<string, unknown>>;
  bmName?: string;
  parentBeName?: string;
  beName?: string;
  setTimeLineData: (data: Array<Record<string, unknown>>) => void;
  setTimeLinePageNo: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
}

/** `Tree` 上下文 (`context[alias]`) */
export interface TreeContext {
  data: Array<Record<string, unknown>>;
  datasetId: string;
  datasets?: unknown[];
  dataset?: unknown[];
  switchDataset?: (datasetId: string) => void;
  switchDatasets?: (datasetId: string) => void;
  selectedKeys: string[];
  setSelectedKeys: (keys: string[]) => void;
  checkedKeys: string[];
  setCheckedKeys: (keys: string[]) => void;
  expandedKeys: string[];
  setExpandedKeys: (keys: string[]) => void;
}

/** `TreeView` 上下文 (`context[alias]`) */
export interface TreeViewContext {
  expandAll: () => void;
  collapseAll: () => void;
}

/** `QrCode` 上下文 (`context[alias]`) */
export interface QrCodeContext {
  download: (filename?: string) => void;
}

/** `StateModel` 上下文 (`context[alias]`) */
export interface StateModelContext {
  transitionState: (...args: unknown[]) => Promise<unknown>;
  close: () => void;
  refresh?: () => void;
}

/** `UnitPicker` 上下文 (`context[alias]`) */
export interface UnitPickerContext {
  bmName: string;
  nodeId: string;
  openDialog: (options: {
    type?: string;
    allowUnitTypes?: string[];
    value?: { unitType: string; value: string } | Array<{ unitType: string; value: string }> | null;
  }) => void;
  closeDialog: () => void;
  clearValue: () => void;
  getValue: () => unknown;
  getSelectedItems: () => Array<{ unitType: string; value: string; label: string; option?: unknown; data?: unknown }>;
  isDialogVisible: () => boolean;
}

/** `ConditionBuilder` 上下文 (`context[alias]`) */
export interface ConditionBuilderContext {
  setCondition: (condition: unknown) => void;
  getCondition: () => unknown;
  validate: (callback?: (valid: boolean) => void) => void;
  getPreviewText: () => string;
  getConditionWithoutInitialValues: () => unknown;
}

/** `BeConditionBuilder` 上下文 (`context[alias]`) */
export interface BeConditionBuilderContext {
  setCondition: (condition: unknown) => void;
  getCondition: () => unknown;
  validate: (callback?: (valid: boolean) => void) => void;
  getPreviewText: () => string;
}

/** `AndOrComponent` 上下文 (`context[alias]`) */
export interface AndOrComponentContext {
  getData: () => unknown;
  valid: () => Promise<boolean>;
}

/** `SearchParamsConstructor` 上下文 (`context[alias]`) */
export interface SearchParamsConstructorContext {
  onGetSearchParams: () => unknown;
  getPreviewText: () => string;
}

/** `StructureBuilder` 上下文 (`context[alias]`) */
export interface StructureBuilderContext {
  getVisibleRowData: () => Array<Record<string, unknown>>;
  getTreeData: () => Array<Record<string, unknown>>;
  getRow: (id: string) => Record<string, unknown> | undefined;
  getSelectedRows: () => Array<Record<string, unknown>>;
  getSelectedIds: () => string[];
  addRow: (data: Record<string, unknown>) => void;
  addChildRow: (parentId: string, data: Record<string, unknown>) => void;
  updateRow: (id: string, data: Record<string, unknown>) => void;
  removeRow: (id: string) => void;
  removeRows: (ids: string[]) => void;
  removeChildren: (id: string) => void;
  expand: (id: string) => void;
  collapse: (id: string) => void;
  toggleExpand: (id: string) => void;
  getChildren: (id: string) => Array<Record<string, unknown>>;
  getParent: (id: string) => Record<string, unknown> | undefined;
  getAncestors: (id: string) => Array<Record<string, unknown>>;
}

/** `SchemaDefinition` / `SchemaBinding` 上下文 (`context[alias]`) */
export interface SchemaEditorContext<TData = Record<string, unknown>> {
  nodeId?: string;
  setData: (data: TData | null | undefined) => void;
  getData: () => TData;
}

/** `DashboardDesign` 上下文 (`context[alias]`) */
export interface DashboardDesignContext {
  getLayouts: () => unknown[];
}

/** `EventCalendar` / `SchedulingWorkbench` 上下文 (`context[alias]`) */
export interface RefreshableViewContext {
  refreshView: () => void;
}

/** `ApprovalFlow` 上下文 (`context[alias]`, 默认 `approvalFlow`) */
export interface ApprovalFlowContext {
  workflowTask: unknown;
  form: unknown;
  positions: unknown;
  isOwner: boolean;
  operations: Record<string, unknown>;
  access: Record<string, unknown>;
  resources: unknown;
  resourcesCtrl: unknown;
  areaMap: Record<string, unknown>;
  fieldMap: Record<string, unknown>;
}

/** `CustomerJourneySearch` 上下文 (`context[alias]`) */
export interface CustomerJourneySearchContext {
  getData: () => unknown;
}

/** `ModelResultFusion` 上下文 (`context[alias]`) */
export interface ModelResultFusionContext {
  getModelList: () => Array<Record<string, unknown>>;
  getNodeList: () => Array<Record<string, unknown>>;
  updateNodeById: (id: string, item: Record<string, unknown>) => void;
}

// ============================================================================
// 3. 局部子树 / 迭代上下文（仅在特定模板子树内可用）
// ============================================================================

/** `IteratorContainer` / `PipelineKanban` 迭代子树上下文 */
export interface IteratorSubtreeContext<T = Record<string, unknown>> {
  iterator: {
    iteratorVariableName: string;
    indexVariableName: string;
    /** 默认路径 `context.iterator.item`（随 `iteratorVariableName` 变化） */
    item: T;
    /** 默认路径 `context.iterator.index`（随 `indexVariableName` 变化） */
    index: number;
    [varName: string]: unknown;
  };
}

/** `SubFormItem` 子表单项子树上下文 */
export interface SubFormItemSubtreeContext<T = Record<string, unknown>> {
  subForm: SubFormContext;
  subFormItem: {
    data: T;
    index: number;
    parentContext: OasisBasePageContext;
  };
}

/** `TimelineItem` / `AutoCompleteOptionSlot` 循环项子树上下文 */
export interface CycleItemSubtreeContext<T = Record<string, unknown>> {
  item: {
    data: T;
    index: number;
  };
}

/** `RecursiveContainerTemplate` / `AssignmentBoard*` 模板子树上下文 */
export interface TemplateItemSubtreeContext<T = Record<string, unknown>> {
  item: T;
  index: number;
  recursiveTemplateId?: string;
}

/** `DetailsPageContainer`（`enablePage: true` 时）子树上下文 */
export interface DetailsPageSubtreeContext {
  detailPage: Record<string, unknown>;
}
