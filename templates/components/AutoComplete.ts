import type { EventItem, ExpressionValue, JSFunction, MessageValue, OperatorCode, StyleProps } from "./types.js";

/**
 * AutoComplete 自动完成输入框组件
 *
 * @description
 * 支持静态列表、自定义异步函数（`customFunction`）与 BE 实体的自动补全输入控件（源码: `component-schemas-v2/AutoComplete/index.ts`）。
 *
 * @usageGuidelines
 * - `dataSourceType` 可选 `"static"`、`"custom"`、`"be"`；
 * - `"custom"` 模式下 `customFunction` 签名为 `({ keyword, setOptions }) => void`（开启分页时含 `pageNo`, `pageSize`）；
 * - 若开启 `useCustomOptionTemplate: true`，需先读取 `AutoCompleteOptionSlot` 的真实节点 ID 再放入模板（内部通过 `context.item.data` 取值）。
 */
export interface AutoCompleteProps {
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
  allowClear?: ExpressionValue<boolean>;
  showDefaultOptions?: ExpressionValue<boolean>;
  useCustomOptionTemplate?: ExpressionValue<boolean>;
  searchTriggerMode?: ExpressionValue<"onInput" | "onEnter">;
  searchDebounceMs?: ExpressionValue<number>;
  minSearchLength?: ExpressionValue<number>;
  dataSourceType?: ExpressionValue<"static" | "custom" | "be">;
  staticData?: Array<string | { itemValue: unknown; [key: string]: unknown }>;
  customFunction?: JSFunction | "";
  enablePagination?: ExpressionValue<boolean>;
  pageSize?: ExpressionValue<number>;
  bmName?: string;
  beName?: string;
  parentBeName?: string;
  parentBeId?: string;
  dataset?: Record<string, unknown>;
  defaultQueryParams?: ExpressionValue<Array<{
    fieldName?: ExpressionValue<string>;
    operation?: ExpressionValue<OperatorCode>;
    value?: ExpressionValue<string>;
    sort?: ExpressionValue<"none" | "asc" | "desc">;
  }>>;
  resultField?: ExpressionValue<string[]>;
  valueField?: string;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: ExpressionValue<StyleProps>;
  events?: EventItem<"onChange">[];
}

export const autoCompletePresets = {
  /** 自定义异步检索自动完成 */
  asyncSearch: (fieldName: string, displayName: string, customFnCode: string): AutoCompleteProps => ({
    fieldName,
    displayName,
    dataSourceType: "custom",
    searchTriggerMode: "onInput",
    searchDebounceMs: 300,
    allowClear: true,
    customFunction: {
      _type: "JSFunction",
      value: customFnCode,
    },
  }),
};
