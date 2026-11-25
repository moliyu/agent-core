import type { MessageValue, ExpressionValue, StyleProps, EventItem } from "./types.js";
import type { FormValidationRule } from "./Form.js";

/** Select 静态下拉选项 */
export interface SelectOptionItem {
  label: MessageValue<string>;
  value: ExpressionValue<string>;
}

/**
 * Select 下拉选择组件
 *
 * @description
 * 从静态配置的 `options` 列表中选择一个或多个值，支持多选、禁用项及自定义创建标签
 * （源码: `component-schemas-v2/Select/index.ts`）。
 *
 * @usageGuidelines
 * - 需要从固定枚举值选择时使用 `Select`；若选项来自平台转换码字典请使用 `Transform`；
 * - `fieldName` 必须为字面量字符串。
 */
export interface SelectProps {
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
  /** 静态选项列表 */
  options?: ExpressionValue<SelectOptionItem[]>;
  /** 是否多选，默认: false */
  isMultiple?: ExpressionValue<boolean>;
  /** 需要禁用的 option value 列表 */
  disableOptions?: ExpressionValue<string[]>;
  /** 是否允许用户输入创建新选项（开启后运行时为 tags 多值模式），默认: false */
  isAllowCreateItem?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: StyleProps;
  /** 交互事件（onChange 的 params 为 [value, option, options]） */
  events?: EventItem<"onClick" | "onChange" | "onBlur">[];
}

export const selectPresets = {
  /** 标准单选下拉 */
  single: (
    fieldName: string,
    displayName: string,
    options: SelectOptionItem[],
    required: boolean = false
  ): SelectProps => ({
    fieldName,
    displayName,
    options,
    required,
    placeholder: `请选择${displayName}`,
  }),
};
