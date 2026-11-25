import type { MessageValue, ExpressionValue, StyleProps, EventItem } from "./types.js";
import type { FormValidationRule } from "./Form.js";

/** CheckBox 选项定义 */
export interface CheckBoxOptionItem {
  label: MessageValue<string>;
  value: ExpressionValue<string>;
  disabled?: ExpressionValue<boolean>;
}

/**
 * CheckBox 复选框组件
 *
 * @description
 * 提供单选或多选复选框输入，支持选项组和表单绑定（源码: `component-schemas-v2/CheckBox/index.ts`）。
 *
 * @usageGuidelines
 * - `type: "group"`（默认）为多选复选框组，`onChange` 的 `params[0]` 为选中值数组；
 * - `type: "default"` 为单个复选框，`onChange` 的 `params[0]` 为 `boolean`。
 */
export interface CheckBoxProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 表单项标签文案 */
  displayName?: MessageValue<string>;
  labelTooltipEnabled?: ExpressionValue<boolean>;
  labelTooltip?: MessageValue<string>;
  labelWidth?: ExpressionValue<string>;
  /** 绑定的表单字段名 */
  fieldName?: string;
  required?: ExpressionValue<boolean>;
  rules?: FormValidationRule[];
  isNeedFormItem?: ExpressionValue<boolean>;
  displayOnly?: ExpressionValue<boolean>;
  displayOnlyType?: ExpressionValue<"text" | "formItem">;
  disabled?: ExpressionValue<boolean>;
  readOnly?: ExpressionValue<boolean>;
  /** 持久化默认值字符串（运行时按 group/default 模式转换） */
  defaultValue?: ExpressionValue<string>;
  /** 复选框模式，默认: "group" */
  type?: ExpressionValue<"group" | "default">;
  /** 选项列表 */
  options?: ExpressionValue<CheckBoxOptionItem[]>;
  /** 半选状态，默认: false */
  indeterminate?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: StyleProps;
  events?: EventItem<"onClick" | "onChange" | "onBlur">[];
}

export const checkBoxPresets = {
  /** 常用 Y/N 单项开关型复选框组 */
  yesNoGroup: (fieldName: string, displayName: string, label: string = "是"): CheckBoxProps => ({
    type: "group",
    fieldName,
    displayName,
    options: [{ label, value: "Y", disabled: false }],
  }),
};
