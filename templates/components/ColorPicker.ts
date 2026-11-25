import type { EventItem, ExpressionValue, JSFunction, MessageValue, StyleProps } from "./types.js";

/**
 * ColorPicker 颜色选择器组件
 *
 * @description
 * 用于在表单中选择颜色并持久化为字符串（如 hex/rgb/hsb），常用于标签色、主题色、旅程阶段色等配置（源码: `component-schemas-v2/ColorPicker/index.ts`）。
 */
export interface ColorPickerProps {
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
  /** 默认颜色字符串（如 "#1677ff"） */
  defaultValue?: ExpressionValue<string>;
  size?: ExpressionValue<"small" | "middle" | "large">;
  allowClear?: ExpressionValue<boolean>;
  selectMode?: ExpressionValue<"single" | "gradient">;
  /** 颜色格式，默认: "hex" */
  format?: ExpressionValue<"rgb" | "hex" | "hsb">;
  showColorText?: ExpressionValue<boolean>;
  disabledAlpha?: ExpressionValue<boolean>;
  placement?: ExpressionValue<
    | "top" | "left" | "right" | "bottom"
    | "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
    | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"
  >;
  trigger?: ExpressionValue<"hover" | "click">;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  textStyle?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: ExpressionValue<StyleProps>;
  events?: EventItem<"onClick" | "onChange" | "onBlur">[];
}

export const colorPickerPresets = {
  /** 表单中的 Hex 颜色选择字段 */
  hexField: (fieldName: string, displayName: string, defaultValue: string = "#1677ff"): ColorPickerProps => ({
    fieldName,
    displayName,
    defaultValue,
    format: "hex",
    selectMode: "single",
    showColorText: true,
    allowClear: true,
  }),
};
