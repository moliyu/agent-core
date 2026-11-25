import type { EventItem, ExpressionValue, JSFunction, MessageValue, StyleProps } from "./types.js";

/**
 * SliderInput 滑块输入组件
 *
 * @description
 * 通过滑块输入单值或数值范围，支持刻度（`marks`）、提示和快捷数字输入（源码: `component-schemas-v2/SliderInput/index.ts`）。
 */
export interface SliderInputProps {
  /** 是否区间双滑块，默认: false */
  range?: ExpressionValue<boolean>;
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
  readOnly?: ExpressionValue<boolean>;
  defaultValue?: ExpressionValue<number>;
  defaultRangeStart?: ExpressionValue<number>;
  defaultRangeEnd?: ExpressionValue<number>;
  min?: ExpressionValue<number>;
  max?: ExpressionValue<number>;
  step?: ExpressionValue<number>;
  draggableTrack?: ExpressionValue<boolean>;
  marks?: ExpressionValue<Array<{ value?: ExpressionValue<number>; label?: ExpressionValue<string> }>>;
  vertical?: ExpressionValue<boolean>;
  width?: ExpressionValue<number>;
  height?: ExpressionValue<number>;
  keyboard?: ExpressionValue<boolean>;
  showValue?: ExpressionValue<boolean>;
  quickInput?: ExpressionValue<boolean>;
  showTooltip?: ExpressionValue<boolean>;
  tooltipPlacement?: ExpressionValue<"top" | "bottom" | "left" | "right">;
  prefix?: ExpressionValue<string>;
  suffix?: ExpressionValue<string>;
  color?: ExpressionValue<string>;
  trackThickness?: ExpressionValue<number>;
  handleSize?: ExpressionValue<number>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: ExpressionValue<StyleProps>;
  events?: EventItem<"onChange" | "onBlur">[];
}

export const sliderInputPresets = {
  /** 百分比单值滑块（带快捷输入框） */
  percent: (fieldName: string, displayName: string): SliderInputProps => ({
    fieldName,
    displayName,
    min: 0,
    max: 100,
    step: 1,
    quickInput: true,
    showValue: true,
    suffix: "%",
  }),
};
