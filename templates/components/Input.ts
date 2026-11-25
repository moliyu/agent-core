import type { MessageValue, ExpressionValue, JSFunction, StyleProps, EventItem } from "./types.js";
import type { FormValidationRule } from "./Form.js";

/**
 * Input 通用表单输入组件（文本 / 密码 / 多行文本 / 数字）
 *
 * @description
 * 提供基础文本、密码、多行文本或数字输入，并支持校验、前后缀与格式化
 * （源码: `component-schemas-v2/Input/index.ts`）。
 *
 * @usageGuidelines
 * - 必须放置在 `Form` 子树内的 `FormItemContainer` 或 `Container` 中，并通过 `fieldName` 绑定表单字段；
 * - `fieldName` 必须为稳定的字面量字符串（**不支持** `JSExpression`）；
 * - `unitPickerAlias` 仅用于 Form `UnitParty` 参与方标识字段，普通输入框保持空字符串即可。
 */
export interface InputProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 输入控件类型，默认: "Input" */
  type?: ExpressionValue<"Input" | "Password" | "TextArea" | "InputNumber">;
  /** 表单项标签文案 */
  displayName?: MessageValue<string>;
  /** 是否开启标签提示气泡，默认: false */
  labelTooltipEnabled?: ExpressionValue<boolean>;
  /** 标签提示文案 */
  labelTooltip?: MessageValue<string>;
  /** 标签宽度覆盖（为空时继承所属 Form 的 `labelWidth`） */
  labelWidth?: ExpressionValue<string>;
  /** 绑定的表单字段名（字面量字符串） */
  fieldName?: string;
  /** 是否必填，默认: false */
  required?: ExpressionValue<boolean>;
  /** 字段级校验规则 */
  rules?: FormValidationRule[];
  /** 是否包裹 Form.Item，默认: true */
  isNeedFormItem?: ExpressionValue<boolean>;
  /** 是否仅展示态，默认: false */
  displayOnly?: ExpressionValue<boolean>;
  /** 展示态渲染方式，默认: "formItem" */
  displayOnlyType?: ExpressionValue<"text" | "formItem">;
  /** 是否禁用，默认: false */
  disabled?: ExpressionValue<boolean>;
  /** 是否只读，默认: false */
  readOnly?: ExpressionValue<boolean>;
  /** 默认值（无默认值时请直接省略或传 `""`，严禁传 `null`，否则属性面板会报“该值不能为 null”） */
  defaultValue?: ExpressionValue<string | number>;
  /** 占位提示文本 */
  placeholder?: MessageValue<string>;
  /** 数字区间模式，默认: false */
  isRange?: ExpressionValue<boolean>;
  /** InputNumber 是否显示增减按钮，默认: true */
  controls?: ExpressionValue<boolean>;
  /** InputNumber 最小值，默认: 0 */
  min?: ExpressionValue<number>;
  /** InputNumber 最大值，默认: 99999999 */
  max?: ExpressionValue<number>;
  /** InputNumber 精度，默认: 0 */
  precision?: ExpressionValue<number>;
  /** InputNumber 步长，默认: 1 */
  step?: ExpressionValue<number>;
  /** Password 是否支持显隐切换，默认: false */
  visibilityToggle?: ExpressionValue<boolean>;
  /** 是否展示字数统计，默认: false */
  showCount?: ExpressionValue<boolean>;
  /** 最大字符长度，默认: 255 */
  maxLength?: ExpressionValue<number>;
  /** 前置标签 */
  addonBefore?: ExpressionValue<string>;
  /** 后置标签 */
  addonAfter?: ExpressionValue<string>;
  /** 关联 UnitPicker 别名（仅 UnitParty 标识字段使用，普通文本留空 `""`） */
  unitPickerAlias?: string;
  /** 格式化函数: `(value) => string` */
  formatter?: JSFunction | "";
  /** 解析函数（InputNumber 使用）: `(displayValue) => number | string` */
  parser?: JSFunction | "";
  /** CSS 可见性，默认: true */
  visible?: ExpressionValue<boolean>;
  /** 条件隐藏并卸载，默认: false */
  hidden?: ExpressionValue<boolean>;
  /** 控件 CSS 类名 */
  className?: ExpressionValue<string>;
  /** 控件自定义样式 */
  style?: ExpressionValue<StyleProps>;
  /** Form.Item 容器类名 */
  formItemClassName?: ExpressionValue<string>;
  /** Form.Item 容器样式 */
  formItemStyle?: StyleProps;
  /** 交互事件（onChange 的 params[0] 为归一化后的 string | number | null） */
  events?: EventItem<"onClick" | "onChange" | "onBlur">[];
}

export const inputPresets = {
  /** 单行文本输入 */
  text: (fieldName: string, displayName: string, required: boolean = false): InputProps => ({
    type: "Input",
    fieldName,
    displayName,
    required,
    placeholder: `请输入${displayName}`,
  }),

  /** 多行文本输入 */
  textarea: (fieldName: string, displayName: string, maxLength: number = 500): InputProps => ({
    type: "TextArea",
    fieldName,
    displayName,
    maxLength,
    showCount: true,
    placeholder: `请输入${displayName}`,
  }),

  /** 数字输入 */
  number: (fieldName: string, displayName: string, precision: number = 0): InputProps => ({
    type: "InputNumber",
    fieldName,
    displayName,
    precision,
    controls: true,
    placeholder: `请输入${displayName}`,
  }),
};
