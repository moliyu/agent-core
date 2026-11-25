import type { EventItem, ExpressionValue, JSFunction, MessageValue, StyleProps } from "./types.js";

/** 树选择节点结构 */
export interface TreeSelectNode {
  value: string;
  label: string;
  disabled?: boolean;
  children?: TreeSelectNode[];
}

/**
 * TreeSelect 树选择器组件
 *
 * @description
 * 在表单中从树形层级数据里选择一个或多个节点（源码: `component-schemas-v2/TreeSelect/index.ts`）。
 */
export interface TreeSelectProps {
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
  /** 树选项数据 */
  treeData?: ExpressionValue<TreeSelectNode[]>;
  /** 默认展开层级，默认: "all" */
  expandedWay?: ExpressionValue<"all" | "none" | "first" | "second" | "third">;
  /** 是否仅允许选择叶子节点，默认: false */
  isOnlyLeafNode?: ExpressionValue<boolean>;
  /** 是否多选，默认: false */
  isMultiple?: ExpressionValue<boolean>;
  maxCount?: ExpressionValue<number>;
  maxTagCount?: ExpressionValue<number>;
  isValueConcatParent?: ExpressionValue<boolean>;
  valueSeparator?: ExpressionValue<string>;
  isLabelConcatParent?: ExpressionValue<boolean>;
  labelSeparator?: ExpressionValue<string>;
  treeLine?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: ExpressionValue<StyleProps>;
  events?: EventItem<"onClick" | "onChange" | "onBlur">[];
}

export const treeSelectPresets = {
  /** 单选树下拉 */
  single: (fieldName: string, displayName: string, treeData: ExpressionValue<TreeSelectNode[]> = []): TreeSelectProps => ({
    fieldName,
    displayName,
    treeData,
    expandedWay: "all",
    isMultiple: false,
    treeLine: true,
  }),
};
