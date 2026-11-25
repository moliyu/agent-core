import type {
  MessageValue,
  ExpressionValue,
  JSFunction,
  StyleProps,
  EventItem,
  EventWrapper,
  OperatorCode,
} from "./types.js";

/** BE 字段数据类型（缺失时回退为 "Varchar"，禁止写 "string"） */
export type GridPlusFieldType =
  | "Number"
  | "Date"
  | "DateTime"
  | "Time"
  | "Long"
  | "Character"
  | "Varchar";

/** BE 字段性质 */
export type GridPlusFieldProperty =
  | "SReference"
  | "MReference"
  | "Calculated"
  | "StaticCalculated"
  | "Standard"
  | "ForeignId";

/** Join 关联类型 */
export type GridPlusJoinType =
  | "general"
  | "vertical"
  | "extend"
  | "smJoin"
  | "tree"
  | "mmJoin";

/** 控件类型 */
export type GridPlusControlType =
  | "string"
  | "number"
  | "date"
  | "datetime"
  | "time"
  | "prompt"
  | "transform";

/** GridPlus 数据集定义 */
export interface GridPlusDataset {
  id: string;
  name: string;
  displayName?: string;
}

/** GridPlus 默认查询/排序参数 */
export interface GridPlusQueryParam {
  fieldName?: ExpressionValue<string>;
  operation?: ExpressionValue<OperatorCode>;
  value?: ExpressionValue<string>;
  hidden?: ExpressionValue<boolean>;
  sort?: ExpressionValue<"none" | "asc" | "desc">;
}

/** GridPlus 元数据配置 */
export interface GridPlusMetaData {
  /**
   * 业务实体名称（确定性字面量）。
   * 注意：运行时若 `beName` 为空，GridPlus 只渲染 `<Placeholder content="表格" />`。
   */
  beName?: string;
  /** 父业务实体名称（子表场景） */
  parentBeName?: string;
  /** 可用数据集列表 */
  datasets?: GridPlusDataset[];
  /** 可配置查询名称 */
  filterName?: ExpressionValue<string>;
  /** 默认查询与排序条件 */
  defaultQueryParams?: ExpressionValue<GridPlusQueryParam[]>;
  /** 父业务实体记录 ID */
  parentId?: ExpressionValue<string>;
}

/** 列行内编辑配置 */
export interface GridPlusInlineEditing {
  disabled?: ExpressionValue<boolean>;
  editType?: ExpressionValue<"default" | "dbClick">;
  inputType?: ExpressionValue<
    | "Input"
    | "InputNumber"
    | "Switch"
    | "Transform"
    | "Select"
    | "Prompt"
    | "Date"
    | "Time"
    | "DateTime"
    | "VariableSelector"
  >;
  maxLength?: ExpressionValue<number>;
  min?: ExpressionValue<number>;
  max?: ExpressionValue<number>;
  precision?: ExpressionValue<number>;
  step?: ExpressionValue<number>;
  checkValue?: ExpressionValue<string>;
  noCheckValue?: ExpressionValue<string>;
  isNeedWordOrIcon?: ExpressionValue<boolean>;
  checkedChildrenType?: ExpressionValue<"word" | "icon">;
  wordCheckedChildren?: ExpressionValue<string>;
  wordNoCheckedChildren?: ExpressionValue<string>;
  iconCheckedChildren?: ExpressionValue<string>;
  iconNoCheckChildren?: ExpressionValue<string>;
  transformCode?: ExpressionValue<string>;
  parentTransformValue?: ExpressionValue<string>;
  selectOptions?: ExpressionValue<
    Array<{
      label?: ExpressionValue<string>;
      value?: ExpressionValue<string>;
    }>
  >;
  dateTimeFormat?: ExpressionValue<string>;
  promptName?: ExpressionValue<string>;
  promptType?: ExpressionValue<"default" | "select">;
  promptConfig?: ExpressionValue<string>;
  isOnlyLeafNode?: ExpressionValue<boolean>;
  dataMetas?: ExpressionValue<Array<Record<string, unknown>>>;
  isMultiple?: ExpressionValue<boolean>;
  /**
   * 行内编辑事件列表（注意此处是 `events` 数组，不是 `{ id, events }` 包装）：
   * - `beforeToSubmit`: `({ rowData, oldValue }) => Promise<boolean>`
   * - `onChange`: `({ index, rowData, oldValue, value, setValue, data, setGridData, refreshGrid, switchRef?, submitEdit, fieldName, otherArgs }) => void`
   * - `onBlur`: `({ index, rowData, oldValue, value, setValue, data, setGridData, refreshGrid, switchRef?, submitEdit, fieldName }) => void`
   */
  events?: EventItem<"beforeToSubmit" | "onChange" | "onBlur">[];
}

/** 列样式配置 */
export interface GridPlusColumnStyle {
  /** 支持静态类名、表达式或 `({ value, oldValue, rowData, index }) => string` */
  className?: ExpressionValue<string> | JSFunction;
  color?: ExpressionValue<string>;
  /** 支持静态样式、表达式或 `({ value, oldValue, rowData, index }) => CSSProperties` */
  styles?: ExpressionValue<StyleProps> | JSFunction;
  width?: ExpressionValue<string>;
}

/** GridPlus 数据列定义 */
export interface GridPlusColumn {
  columnType?: ExpressionValue<"data" | "dynamic">;
  fieldName?: ExpressionValue<string>;
  /** 动态列分组名称（columnType="dynamic" 时使用） */
  groupName?: ExpressionValue<string>;
  show?: ExpressionValue<boolean>;
  displayName?: MessageValue<string>;
  tooltip?: MessageValue<string>;
  /** BE 字段类型（缺失时回退为 "Varchar"） */
  type?: GridPlusFieldType;
  length?: ExpressionValue<number>;
  precision?: ExpressionValue<number>;
  fieldProperties?: GridPlusFieldProperty;
  joinType?: GridPlusJoinType;
  controlType?: GridPlusControlType;
  promptName?: ExpressionValue<string>;
  /**
   * 格式化模式；新配置标签列请使用 `cellRender: "tag"` 并保持 `format: "none"`，
   * 勿再使用已废弃的 `format: "tag"`。
   */
  format?: ExpressionValue<
    | "date"
    | "time"
    | "datetime"
    | "scientific"
    | "thousandSeparator"
    | "transform"
    | "customer"
    | "tag"
    | "none"
  >;
  transformCode?: ExpressionValue<string>;
  parentTransformValue?: ExpressionValue<string>;
  /** `format="customer"` 时的格式化函数: `({ rowData, currentValue }) => unknown` */
  formatFunction?: JSFunction | "";
  fix?: ExpressionValue<"left" | "right" | "none">;
  /** 是否开启行内编辑，支持 `({ val, oldValue, rowData, index }) => boolean` */
  inlineEnable?: ExpressionValue<boolean> | JSFunction;
  inlineEditing?: ExpressionValue<GridPlusInlineEditing>;
  colStyle?: ExpressionValue<GridPlusColumnStyle>;
  /** 单元格渲染方式，默认: "text"（标签列用 `"tag"`） */
  cellRender?: ExpressionValue<"text" | "link" | "tag" | "badge" | "progress" | "icon" | "custom">;
  /** 卡片视图字段角色，默认: "meta" */
  cardRole?: ExpressionValue<"title" | "subtitle" | "badge" | "meta" | "hidden">;
  /** 卡片视图字段顺序，默认: 0 */
  cardOrder?: ExpressionValue<number>;
  /** 标签/文本颜色，支持 `({ value, oldValue, rowData, index }) => string` */
  renderColor?: ExpressionValue<string> | JSFunction;
  /** badge 封顶数字，默认: 99 */
  overflowCount?: ExpressionValue<number>;
  iconName?: ExpressionValue<string>;
  /** 自定义渲染回调: `({ value, oldValue, rowData, index }) => string | ReactNode` */
  customRender?: JSFunction | "";
  /** 列点击事件: `params[0]` 为 `{ rowData, currentValue, oldValue, fieldName, extra? }` */
  events?: EventItem<"onClick">[];
}

/** 按数据集控制列显隐 */
export interface GridPlusColumnDataset {
  fieldName?: ExpressionValue<string>;
  dataset?: Array<{
    datasetId?: string;
    hidden?: ExpressionValue<boolean>;
  }>;
}

/** 高级/行内筛选字段配置（`defaultOperator` 必须包含在 `operators` 中） */
export interface GridPlusFilter {
  fieldName: ExpressionValue<string>;
  controlType: ExpressionValue<GridPlusControlType>;
  defaultOperator: ExpressionValue<OperatorCode>;
  operators: ExpressionValue<OperatorCode[]>;
  transformCode?: ExpressionValue<string>;
  parentTransformValue?: ExpressionValue<string>;
  promptName?: ExpressionValue<string>;
  promptMode?: ExpressionValue<"default" | "select">;
  promptValueFieldName?: ExpressionValue<string>;
  ptDynamicCascadeField?: ExpressionValue<string>;
  /** 动态 PT 字段名，保持字符串类型（默认 `""`） */
  ptDynamicPromptField?: ExpressionValue<string>;
  ptConditionField?: ExpressionValue<string>;
}

/** 全局操作按钮配置 */
export interface GridPlusGlobalOperationButton {
  operationType?:
    | "add"
    | "update"
    | "delete"
    | "customer"
    | "sms"
    | "email"
    | "import"
    | "export";
  buttonName?: MessageValue<string>;
  title?: MessageValue<string>;
  loadingMode?: "none" | "button" | "page";
  deleteTip?: MessageValue<string>;
  permission?: ExpressionValue<string>;
  theme?: ExpressionValue<"primary" | "success" | "info" | "warning" | "danger" | "default">;
  variant?: ExpressionValue<"solid" | "filled" | "outlined" | "dashed" | "link" | "text">;
  iconName?: ExpressionValue<string>;
  iconPosition?: ExpressionValue<"start" | "end">;
  importTemplateBeName?: string;
  importTemplates?: ExpressionValue<string[]>;
  additionalParameters?: ExpressionValue<Record<string, unknown>>;
  personIdField?: ExpressionValue<string>;
  emailTemplates?: ExpressionValue<string[]>;
  smsTemplates?: ExpressionValue<string[]>;
  isOpen?: ExpressionValue<boolean>;
  disabled?: ExpressionValue<boolean>;
  /**
   * 操作按钮事件包装器：`{ id, events: [{ trigger: "onClick", code }] }`。
   * 内置 `add`/`update`/`delete` 无自定义逻辑时直接省略 `event`。
   */
  event?: EventWrapper<"onClick">;
}

/** 行操作按钮配置 */
export interface GridPlusRowOperationButton {
  operationType?: "update" | "delete" | "customer";
  /** 支持普通文案、表达式或页面脚本 JSFunction（非行级回调，不接收 `{ rowData }`） */
  buttonName?: MessageValue<string> | JSFunction;
  title?: MessageValue<string>;
  loadingMode?: "none" | "button" | "page";
  deleteTip?: MessageValue<string>;
  permission?: ExpressionValue<string>;
  theme?: ExpressionValue<"primary" | "success" | "info" | "warning" | "danger" | "default">;
  variant?: ExpressionValue<"solid" | "filled" | "outlined" | "dashed" | "link" | "text">;
  iconName?: ExpressionValue<string>;
  /** 控制按钮显隐，支持 `({ rowData }) => boolean` */
  isOpen?: ExpressionValue<boolean> | JSFunction;
  /** 控制按钮禁用，支持 `({ rowData }) => boolean`（源码 `operation-button.ts` 支持 function/expression） */
  disabled?: ExpressionValue<boolean> | JSFunction;
  /** 行操作按钮事件包装器；`params[0]` 为 `{ rowData, rowIndex }` */
  event?: EventWrapper<"onClick">;
}

/** 汇总项配置 */
export interface GridPlusSummaryConfig {
  summaryType?: ExpressionValue<"SUM" | "COUNT" | "AVG" | "MAX" | "MIN" | "none">;
  label?: MessageValue<string>;
  fieldName?: ExpressionValue<string[]>;
}

/** 表格汇总配置 */
export interface GridPlusSummary {
  enableSummary?: ExpressionValue<boolean>;
  summaryConfig?: ExpressionValue<GridPlusSummaryConfig[]>;
}

/** 树形表格配置 */
export interface GridPlusTreeConfig {
  enableTree?: ExpressionValue<boolean>;
  enableLazy?: ExpressionValue<boolean>;
  joinName?: ExpressionValue<string>;
  parentField?: ExpressionValue<string>;
}

/** 表格扩展行为配置 */
export interface GridPlusCustomerProperty {
  enableInlineGlobalFilter?: ExpressionValue<boolean>;
  isRowSelection?: ExpressionValue<boolean>;
  isCrossPageSelection?: ExpressionValue<boolean>;
  /** 跨页多选稳定唯一字段，默认: "Id" */
  crossPageSelectionKey?: ExpressionValue<string>;
  /** 行填充样式回调: `(record) => CSSProperties` */
  rowFillStyle?: JSFunction | "";
  /** 生命周期事件包装器: `{ id, events: [...] }` */
  events?: EventWrapper<
    "afterSwitchDatasetsCallback" | "beforeToGetCustomColumn" | "afterSearchConditionChange"
  >;
}

/** 分页配置 */
export interface GridPlusPagination {
  defaultPageSize?: ExpressionValue<number>;
  isShowTotal?: ExpressionValue<boolean>;
  pageSizeOptions?: ExpressionValue<string>;
  position?: ExpressionValue<"none" | "bottomLeft" | "bottomCenter" | "bottomRight">;
}

/** 视图展示模式与卡片视图配置 */
export interface GridPlusDisplayConfig {
  displayMode?: ExpressionValue<"table" | "card" | "tableCard">;
  defaultViewMode?: ExpressionValue<"table" | "card">;
  cardOrderMode?: ExpressionValue<"inheritTable" | "custom">;
  cardLayout?: {
    allowUserCustomize?: ExpressionValue<boolean>;
    defaults?: {
      columns?: ExpressionValue<"auto" | "1" | "2" | "3" | "4">;
      density?: ExpressionValue<"default" | "compact">;
      fieldColumns?: ExpressionValue<number>;
      inlineField?: ExpressionValue<boolean>;
      showSelection?: ExpressionValue<boolean>;
    };
  };
}

/** 全局样式配置 */
export interface GridPlusGlobalStyle {
  /** 表头样式（注意：不支持整对象 JSExpression 包装） */
  headStyle?: StyleProps;
  scrollHeight?: ExpressionValue<number>;
  tableStyle?: {
    border?: ExpressionValue<boolean>;
    size?: ExpressionValue<"small" | "middle" | "large">;
    stripe?: ExpressionValue<boolean>;
  };
}

/** 关联的新增/编辑弹窗与表单 Craft 节点 ID 引用 */
export interface GridPlusFormDialogProperty {
  addDialogNodeId: string;
  addFormNodeId: string;
  updateDialogNodeId: string;
  updateFormNodeId: string;
}

/**
 * GridPlus 企业级数据表格组件
 *
 * @description
 * 展示和操作结构化表格数据，支持 BE 元数据查询、排序、筛选、分页、汇总、树形展开、卡片视图及行内编辑
 * （源码: `components/grid-plus/index.tsx`）。
 *
 * @usageGuidelines
 * 1. **必填与不变量**：
 *    - `alias` 必须是非空、页面唯一的字面量字符串（**禁止**使用 `JSExpression`）；
 *    - `isFinishGuide` 必须为 `true`（否则 IDE 中只渲染向导占位）；
 *    - 运行时必须有确定的 `metaData.beName`（为空时只渲染 `<Placeholder content="表格" />`）。
 * 2. **Page Context 能力**：
 *    - 非空 `alias` 会发布 `context[alias]`，包含 `data`、`summary`、`datasetId`、`dataset`、`sort`、`filterType`、`searchParams`、`chooseData`、`selectData`、`page`、`parentId`；
 *    - 可调用方法：`refreshGrid()`、`setQueryParams(...)`、`setGridSort(...)`、`setPageNo(...)`、`setPageLimit(...)`、`switchDatasets(...)`、`getChooseGridData()`、`setChooseGridData(...)`、`jumpToDetail(...)` 等。
 * 3. **事件格式区分（高频易错）**：
 *    - 列点击 `columns[].events` 和行内编辑 `inlineEditing.events` 是**数组**：`[{ trigger, code }]`；
 *    - 全局/行操作按钮 `event` 和 `customerProperty.events` 是**包装对象**：`{ id, events: [{ trigger, code }] }`；
 *    - 内置 `add`/`update`/`delete` 按钮如无自定义逻辑，直接省略 `event`。
 * 4. **编辑器托管字段**：`quickSettings`、`formProperty` 由编辑器初始化写入，Agent 不应主动构造。
 */
export interface GridPlusProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 页面唯一字面量别名（必填，用于发布 Page Context） */
  alias: string;
  /** 向导完成标记（AI 配置必须为 true） */
  isFinishGuide: true;
  /** 关联的新增/编辑 Dialog 与 Form 节点 ID（当前通常新增与编辑共用同一组 Dialog/Form） */
  formDialogProperty?: GridPlusFormDialogProperty;
  /** 业务实体与查询元数据 */
  metaData?: GridPlusMetaData;
  /** 表格数据列配置 */
  columns?: GridPlusColumn[];
  /** 多数据集列显隐映射 */
  columnsDataset?: GridPlusColumnDataset[];
  /** 可配置筛选字段列表 */
  filter?: ExpressionValue<GridPlusFilter[]>;
  /** 顶部全局操作按钮配置 */
  globalOperationConfig?: {
    quantity?: number;
    buttons?: GridPlusGlobalOperationButton[];
  };
  /** 行内操作列按钮配置 */
  rowOperationConfig?: {
    quantity?: number;
    buttons?: GridPlusRowOperationButton[];
    fix?: ExpressionValue<"left" | "right" | "none">;
    width?: ExpressionValue<string>;
  };
  /** 汇总行配置 */
  summary?: GridPlusSummary;
  /** 树形表格配置 */
  tree?: GridPlusTreeConfig;
  /** 行选择、行内搜索、行样式与扩展事件 */
  customerProperty?: GridPlusCustomerProperty;
  /** 分页配置 */
  pagination?: GridPlusPagination;
  /** 表格/卡片视图切换与卡片布局配置 */
  displayConfig?: GridPlusDisplayConfig;
  /** 表格尺寸、边框、斑马纹与滚动高度 */
  globalStyle?: GridPlusGlobalStyle;
  /** CSS 可见性，默认: true */
  visible?: ExpressionValue<boolean>;
  /** 条件隐藏并卸载，默认: false */
  hidden?: ExpressionValue<boolean>;
  /** 编辑器托管快捷设置，Agent 无需编写 */
  quickSettings?: string;
  /** 编辑器托管旧版表单引用，Agent 无需编写（请用 formDialogProperty） */
  formProperty?: {
    addFormNodeId: string;
    updateFormNodeId: string;
  };
}

/**
 * GridPlus 高频业务推荐预设 (Presets)
 */
export const gridPlusPresets = {
  /** 最小可用 BE 绑定表格（依赖 Schema/组件默认分页与样式） */
  minimalTable: (alias: string, beName: string, columns: GridPlusColumn[]): GridPlusProps => ({
    alias,
    isFinishGuide: true,
    metaData: {
      beName,
    },
    columns,
    pagination: {
      defaultPageSize: 20,
      isShowTotal: true,
      position: "bottomRight",
    },
  }),

  /** 标准 CRUD 数据表格（含多选、分页、全局新建/批量删除与行编辑/删除按钮） */
  standardCrudTable: (
    alias: string,
    beName: string,
    columns: GridPlusColumn[],
    formDialogProperty?: GridPlusFormDialogProperty
  ): GridPlusProps => ({
    alias,
    isFinishGuide: true,
    ...(formDialogProperty ? { formDialogProperty } : {}),
    metaData: {
      beName,
    },
    columns,
    globalOperationConfig: {
      quantity: 5,
      buttons: [
        {
          operationType: "add",
          buttonName: "新建",
          theme: "primary",
          variant: "solid",
          isOpen: true,
        },
        {
          operationType: "delete",
          buttonName: "批量删除",
          theme: "danger",
          variant: "outlined",
          deleteTip: "确定删除选中的数据吗？",
          isOpen: true,
        },
      ],
    },
    rowOperationConfig: {
      quantity: 2,
      fix: "right",
      width: "160",
      buttons: [
        {
          operationType: "update",
          buttonName: "编辑",
          theme: "primary",
          variant: "link",
          isOpen: true,
        },
        {
          operationType: "delete",
          buttonName: "删除",
          theme: "danger",
          variant: "link",
          deleteTip: "确定删除该条记录吗？",
          isOpen: true,
        },
      ],
    },
    customerProperty: {
      enableInlineGlobalFilter: true,
      isRowSelection: true,
      isCrossPageSelection: false,
      crossPageSelectionKey: "Id",
    },
    pagination: {
      defaultPageSize: 20,
      isShowTotal: true,
      position: "bottomRight",
    },
    globalStyle: {
      tableStyle: {
        border: true,
        size: "small",
        stripe: true,
      },
    },
  }),

  /** 树形结构表格预设 */
  treeTable: (
    alias: string,
    beName: string,
    columns: GridPlusColumn[],
    parentField: string = "ParentId",
    joinName: string = ""
  ): GridPlusProps => ({
    alias,
    isFinishGuide: true,
    metaData: {
      beName,
    },
    columns,
    tree: {
      enableTree: true,
      enableLazy: false,
      parentField,
      joinName,
    },
    pagination: {
      position: "none",
    },
  }),
};
