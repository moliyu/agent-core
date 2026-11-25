import type { ExpressionValue, JSFunction, StyleProps, EventItem } from "./types.js";

/** Form 可用数据集选项 */
export interface FormDatasetOption {
  id: string;
  name: string;
}

/** 数据集字段显示状态项 */
export interface FormDatasetField {
  field: ExpressionValue<string>;
  display: "" | "hide" | "disabled" | "editable";
}

/** 按数据集维度的字段显隐/只读配置 */
export interface FormDatasetFields {
  dataset: ExpressionValue<string>;
  fields: FormDatasetField[];
}

/** 表单字段校验类型 */
export type FormValidateType =
  | "none"
  | "email"
  | "mobile"
  | "telephone"
  | "idCard"
  | "creditCode"
  | "url"
  | "chinese"
  | "nonChinese"
  | "regexp"
  | "custom";

/** 单条字段校验规则 */
export interface FormValidationRule {
  type: ExpressionValue<FormValidateType>;
  warningOnly?: ExpressionValue<boolean>;
  validateTrigger?: ExpressionValue<"onBlur" | "onChange" | "onSubmit">;
  message?: ExpressionValue<string>;
  pattern?: ExpressionValue<string>;
  /** 自定义校验回调: `(_rule, value) => Promise<void> | void`，未配置时为 `""` */
  validator?: JSFunction | "";
}

/** 字段级校验规则组 */
export interface FormFieldRule {
  fieldName: string;
  required?: ExpressionValue<boolean>;
  validates?: FormValidationRule[];
}

/** Form 支持的 5 类生命周期/变更事件 */
export type FormEventItem = EventItem<
  "beforeToGet" | "afterToGet" | "beforeToSubmit" | "afterToSubmit" | "changeFunction"
>;

/**
 * Form 表单容器组件
 *
 * @description
 * 用于收集、校验和提交结构化表单数据的 Canvas 容器组件（源码: `components/form/index.tsx`）。
 *
 * @usageGuidelines
 * 1. **Page Context 与子树 Context**：
 *    - 子树内所有后代（`FormItemContainer`、`Container`、字段控件）均可通过 `context.form` 访问当前表单实例（即使 `alias` 为空）；
 *    - 配置非空 `alias` 后，页面其他节点可通过 `context[alias]` 访问表单数据与方法（如 `setFormFields`、`getFormFields`、`validateForm`、`submitForm`、`resetForm`、`toGet` 等）；
 *    - 若 `Form` 处于 `IteratorContainer` 循环中，`alias` 应使用 `JSExpression` 为每个实例生成唯一 key。
 * 2. **BE 绑定 vs 未绑定原型表单**：
 *    - **BE 绑定表单**：仅在 BM/BE 已明确确认时配置 `beName`、`parentBeName`、`BEResultFields`、业务 `rules`，并保持页面根 BM 对齐；
 *    - **未绑定/函数驱动表单**：保留 `type: "be"` 默认值并将 `beName`、`parentBeName` 留空（当前没有 Agent 可配置的 `api` 表单路径）。
 *      **严禁**在未绑定表单中配置 `BEResultFields`、`id`、`parentId`、`dataset`，也不要调用内置 `toGet()` / `submitForm()`（会拼接空 BE URL）；数据读写应通过 `context.form.setFormFields` / `getFormFields` 或 `context[alias]` 完成。
 * 3. **字段区结构与布局**：
 *    - 简单 1~3 列等宽分栏：可使用模板内置的 `FormItemContainer` 承载字段控件；
 *    - **并非 `Form` 下只能放 `FormItemContainer`**：如果是复杂布局（如分组、多行不同列数、跨列、需要 `gap` 或自定义 Flex/Grid），**可以直接在 `Form` 下放 `Container`**（也可在 `FormItemContainer` 内放 `Container`），子树内的字段控件同样会正常继承 `Form` 的 `labelWidth`、校验与提交能力。
 */
export interface FormProps {
  /** 编辑器向导完成标记，默认: true */
  isFinishGuide?: boolean;
  /**
   * 表单 Page Context 别名（字面量或返回唯一 key 的 JSExpression）。
   * 设为非空后可通过 `context[alias]` 在表单外部读写表单状态。
   */
  alias?: ExpressionValue<string>;
  /** 表单数据模式，默认: "be"（未绑定原型表单也保持 "be" 且将 beName 留空） */
  type?: "be" | "api";
  /** 父业务实体名称（仅绑定子 BE 时配置） */
  parentBeName?: string;
  /** 业务实体名称（仅确认绑定 BE 后配置） */
  beName?: string;
  /** 可用数据集列表 */
  availableDatasets?: FormDatasetOption[];
  /** 数据集字段显隐/禁用配置 */
  datasetFields?: FormDatasetFields[];
  /** 自定义查询 URL（保留字段） */
  searchUrl?: string;
  /** 自定义提交 URL（保留字段） */
  submitUrl?: string;
  /** 查询前回调: `(defaultQueryParams) => Promise<{ data?, error? }>` */
  beforeToGet?: JSFunction | "";
  /** 查询后回调: `(data) => Promise<{ data?, error? }>` */
  afterToGet?: JSFunction | "";
  /** 提交前回调: `(body) => Promise<{ data?, error? }>` */
  beforeToSubmit?: JSFunction | "";
  /** 提交后回调: `(data) => void` */
  afterToSubmit?: JSFunction | "";
  /** 表单字段变更回调（仅页面操作触发，setFormFields 不触发）: `(changeValues, allValues) => void` */
  changeFunction?: JSFunction | "";
  /** 字段校验规则集合 */
  rules?: FormFieldRule[];
  /** 当前编辑的业务记录 ID（需要动态绑定时使用 JSExpression，勿写死记录 ID） */
  id?: ExpressionValue<string>;
  /** 所属父业务记录 ID（嵌套业务关系时通过 JSExpression 绑定） */
  parentId?: ExpressionValue<string>;
  /** 当前使用的数据集标识 */
  dataset?: ExpressionValue<string>;
  /** 提交成功后是否自动重新查询，默认: true */
  isToGetAfterSubmit?: ExpressionValue<boolean>;
  /** 初始化时是否重置表单（无 id 时生效），默认: true */
  isInitResetForm?: ExpressionValue<boolean>;
  /** 标签字段名 */
  tagField?: string;
  /** 主键字段名，默认: "Id" */
  idFieldName?: string;
  /** 修改版本号字段名，默认: "ModificationNumber" */
  modifyNumberFieldName?: string;
  /** BE 返回字段白名单（仅绑定 BE 时配置，未绑定表单禁止配置） */
  BEResultFields?: string[];
  /** 表单分栏数，默认: "1"（配合 FormItemContainer 自动均分 1/2/3 列） */
  columns?: ExpressionValue<"1" | "2" | "3">;
  /** 标签宽度，默认: "6span"（也可传 px 数值如 "120px"） */
  labelWidth?: ExpressionValue<string>;
  /** 表单布局方向，默认: "horizontal" */
  layout?: ExpressionValue<"horizontal" | "vertical" | "inline">;
  /** 标签文本对齐方式，默认: "right" */
  labelAlign?: ExpressionValue<"left" | "right">;
  /** 控件尺寸，默认: "middle" */
  size?: ExpressionValue<"small" | "middle" | "large">;
  /** 是否显示标签后的冒号，默认: false */
  colon?: ExpressionValue<boolean>;
  /** 是否全局禁用表单内所有控件，默认: false */
  disabled?: ExpressionValue<boolean>;
  /** CSS 可见性，默认: true */
  visible?: ExpressionValue<boolean>;
  /** 条件隐藏并卸载，默认: false */
  hidden?: ExpressionValue<boolean>;
  /** 自定义外层样式 */
  style?: ExpressionValue<StyleProps>;
  /** 表单事件回调列表（code 为纯事件函数体，非 JSFunction 包装） */
  events?: FormEventItem[];
  /** 编辑器 QuickSettings 托管字段，Agent 无需主动编写 */
  quickSettings?: unknown[];
}

/**
 * Form 高频业务推荐预设 (Presets)
 */
export const formPresets = {
  /** 未绑定 BE 的函数/原型表单（单列水平布局） */
  unboundForm: (alias: string): FormProps => ({
    isFinishGuide: true,
    alias,
    type: "be",
    beName: "",
    parentBeName: "",
    columns: "1",
    layout: "horizontal",
    labelWidth: "6span",
    labelAlign: "right",
    size: "middle",
    colon: false,
  }),

  /** 两列等宽编辑表单（需在 FormItemContainer 下直接放置字段控件） */
  twoColumnForm: (alias: string, beName: string = ""): FormProps => ({
    isFinishGuide: true,
    alias,
    type: "be",
    beName,
    columns: "2",
    layout: "horizontal",
    labelWidth: "6span",
    labelAlign: "right",
    size: "middle",
    colon: false,
    isToGetAfterSubmit: true,
    isInitResetForm: true,
  }),

  /** 垂直标签紧凑表单（适合弹窗或侧边抽屉） */
  verticalDrawerForm: (alias: string, beName: string = ""): FormProps => ({
    isFinishGuide: true,
    alias,
    type: "be",
    beName,
    columns: "1",
    layout: "vertical",
    labelAlign: "left",
    size: "middle",
    colon: false,
  }),
};
