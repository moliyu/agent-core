import type { EventItem, ExpressionValue, JSFunction, MessageValue, StyleProps } from "./types.js";

/**
 * VariableSelector 变量选择器组件
 *
 * @description
 * 从层级变量数据（`dataMetas`）中选择一个或多个变量（源码: `component-schemas-v2/VariableSelector/index.ts`）。
 */
export interface VariableSelectorProps {
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
  /** 变量元数据树，节点需含 `value` / `label` */
  dataMetas?: ExpressionValue<Array<Record<string, unknown>>>;
  expandedWay?: ExpressionValue<"all" | "none" | "first" | "second" | "third">;
  isOnlyLeafNode?: ExpressionValue<boolean>;
  isMultiple?: ExpressionValue<boolean>;
  maxCount?: ExpressionValue<number>;
  maxTagCount?: ExpressionValue<number>;
  treeLine?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: ExpressionValue<StyleProps>;
  events?: EventItem<"onClick" | "onChange" | "onBlur">[];
}

export const variableSelectorPresets = {
  /** 单选变量下拉 */
  single: (fieldName: string, displayName: string): VariableSelectorProps => ({
    fieldName,
    displayName,
    expandedWay: "all",
    isMultiple: false,
    isOnlyLeafNode: true,
  }),
};
