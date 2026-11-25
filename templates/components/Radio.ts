import type { MessageValue, ExpressionValue, StyleProps, EventItem } from "./types.js";
import type { FormValidationRule } from "./Form.js";

/** Radio 选项定义 */
export interface RadioOptionItem {
  label: MessageValue<string>;
  value: ExpressionValue<string>;
  disabled?: ExpressionValue<boolean>;
}

/**
 * Radio 单选框组组件
 *
 * @description
 * 从互斥选项中选择单个值，支持普通圆点样式与按钮组样式
 * （源码: `component-schemas-v2/Radio/index.ts`）。
 */
export interface RadioProps {
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
  defaultValue?: ExpressionValue<string>;
  /** 展示形态：普通单选 (`"default"`) 或按钮组 (`"button"`), 默认: `"default"` */
  optionType?: ExpressionValue<"default" | "button">;
  /** 按钮样式（optionType="button" 时生效），默认: `"outline"` */
  buttonStyle?: ExpressionValue<"outline" | "solid">;
  /** 尺寸，默认: "small" */
  size?: ExpressionValue<"large" | "middle" | "small">;
  /** 选项列表 */
  options?: ExpressionValue<RadioOptionItem[]>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: StyleProps;
  /** 交互事件（onChange 的 params[0] 为选中的 value | null） */
  events?: EventItem<"onClick" | "onChange" | "onBlur">[];
}

export const radioPresets = {
  /** 按钮样式分段单选 */
  buttonGroup: (
    fieldName: string,
    displayName: string,
    options: RadioOptionItem[]
  ): RadioProps => ({
    fieldName,
    displayName,
    optionType: "button",
    buttonStyle: "solid",
    size: "middle",
    options,
  }),
};
