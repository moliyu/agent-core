import type { EventItem, ExpressionValue, JSFunction, MessageValue, StyleProps } from "./types.js";

/**
 * Tinymce 富文本编辑器组件
 *
 * @description
 * 提供富文本编辑器输入和 HTML 内容编辑，表单值为 HTML 字符串（源码: `component-schemas-v2/Tinymce/index.ts`）。
 */
export interface TinymceProps {
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
  defaultValue?: ExpressionValue<string>;
  placeholder?: MessageValue;
  minHeight?: ExpressionValue<number>;
  width?: ExpressionValue<string>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: ExpressionValue<StyleProps>;
  events?: EventItem<"onChange">[];
}

export const tinymcePresets = {
  /** 标准富文本编辑字段 */
  richText: (fieldName: string, displayName: string, minHeight: number = 360): TinymceProps => ({
    fieldName,
    displayName,
    minHeight,
    width: "100%",
  }),
};
