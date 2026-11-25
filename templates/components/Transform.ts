import type { MessageValue, ExpressionValue, JSFunction, StyleProps, EventItem } from "./types.js";
import type { FormValidationRule } from "./Form.js";

/**
 * Transform 转换值选择组件
 *
 * @description
 * 根据平台转换码（`transformCode`）自动加载字典可选项的下拉/多选控件
 * （源码: `component-schemas-v2/Transform/index.ts`）。
 *
 * @usageGuidelines
 * - BE 字段的 `controlType === "transform"` 时优先使用 `Transform` 并填入元数据中的 `transformCode`；
 * - `fieldName` 必须为字面量字符串；
 * - 若存在级联父转换，配置 `parentTransformValue` 指向父字段名或返回父值的 `JSExpression`；
 * - `disableOptions` 仅用于禁用已加载候选中的特定值。
 */
export interface TransformProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 表单项标签文案 */
  displayName?: MessageValue<string>;
  labelTooltipEnabled?: ExpressionValue<boolean>;
  labelTooltip?: MessageValue<string>;
  labelWidth?: ExpressionValue<string>;
  /** 绑定的表单字段名（字面量字符串） */
  fieldName?: string;
  required?: ExpressionValue<boolean>;
  rules?: FormValidationRule[];
  isNeedFormItem?: ExpressionValue<boolean>;
  displayOnly?: ExpressionValue<boolean>;
  displayOnlyType?: ExpressionValue<"text" | "formItem">;
  disabled?: ExpressionValue<boolean>;
  readOnly?: ExpressionValue<boolean>;
  defaultValue?: ExpressionValue<string>;
  placeholder?: MessageValue<string>;
  /** 业务元数据指定的转换码（如 `"APPLICATION_TYPE"`） */
  transformCode?: ExpressionValue<string>;
  /** 父转换字段名或返回父值的表达式 */
  parentTransformValue?: ExpressionValue<string>;
  /** 是否多选，默认: false */
  isMultiple?: ExpressionValue<boolean>;
  /** 多选最大数量，默认: 100 */
  maxCount?: ExpressionValue<number>;
  /** 是否允许清空，默认: true */
  allowClear?: ExpressionValue<boolean>;
  /** 需要禁用的候选项 value 列表 */
  disableOptions?: ExpressionValue<string[]>;
  /** 变更回调: `(value, option, options) => void` */
  handleChange?: JSFunction | "";
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: StyleProps;
  /** 交互事件（onChange 的 params 为 [value, option, options]） */
  events?: EventItem<"onClick" | "onChange" | "onBlur">[];
}

export const transformPresets = {
  /** 标准单选转换值下拉 */
  single: (
    fieldName: string,
    displayName: string,
    transformCode: string,
    required: boolean = false
  ): TransformProps => ({
    fieldName,
    displayName,
    transformCode,
    required,
    allowClear: true,
    placeholder: `请选择${displayName}`,
  }),
};
