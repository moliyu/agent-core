import type { EventItem, ExpressionValue, JSFunction, MessageValue, StyleProps } from "./types.js";

/**
 * IconSelector 图标选择器组件
 *
 * @description
 * 在表单中从图标集合中选择一个图标值（格式：`antd.<name>`、`pi.<name>` 或 `svg.<source>`）（源码: `component-schemas-v2/IconSelector/index.ts`）。
 */
export interface IconSelectorProps {
  displayName?: MessageValue;
  labelTooltipEnabled?: ExpressionValue<boolean>;
  labelTooltip?: MessageValue;
  labelWidth?: ExpressionValue<string>;
  fieldName?: string;
  required?: ExpressionValue<boolean>;
  rules?: Array<{
    type?: ExpressionValue<string>;
    warningOnly?: ExpressionValue<boolean>;
    validateTrigger?: ExpressionValue<"onBlur" | "onChange" | "onSubmit">;
    message?: ExpressionValue<string>;
    pattern?: ExpressionValue<string>;
    validator?: JSFunction | "";
  }>;
  isNeedFormItem?: ExpressionValue<boolean>;
  displayOnly?: ExpressionValue<boolean>;
  displayOnlyType?: ExpressionValue<"text" | "formItem">;
  disabled?: ExpressionValue<boolean>;
  defaultValue?: ExpressionValue<string>;
  allowClear?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: ExpressionValue<StyleProps>;
  events?: EventItem<"onChange">[];
}

export const iconSelectorPresets = {
  /** 表单图标选择 */
  basic: (fieldName: string, displayName: string): IconSelectorProps => ({
    fieldName,
    displayName,
    allowClear: true,
  }),
};
