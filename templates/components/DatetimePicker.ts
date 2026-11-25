import type { MessageValue, ExpressionValue, JSFunction, StyleProps, EventItem } from "./types.js";
import type { FormValidationRule } from "./Form.js";

/**
 * DatetimePicker 日期时间选择组件
 *
 * @description
 * 选择日期、时间、年月季度或日期范围（源码: `component-schemas-v2/DatetimePicker/index.ts`）。
 *
 * @usageGuidelines
 * - 普通单值模式 `fieldName` 为单个字面量字符串；
 * - 范围模式（`isRange: true`）支持 `fieldName` 为 `[startField, endField]` 双字段元组，此时控件直接写入两个表单字段；
 * - `onChange` 的 `params[0]` 为格式化字符串（单值）、字符串数组（范围）或 `null`（清空），不传 Dayjs 对象。
 */
export interface DatetimePickerProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 控件粒度，默认: "datetime" */
  type?: ExpressionValue<"time" | "date" | "datetime" | "week" | "month" | "quarter" | "year">;
  /** 表单项标签文案 */
  displayName?: MessageValue<string>;
  labelTooltipEnabled?: ExpressionValue<boolean>;
  labelTooltip?: MessageValue<string>;
  labelWidth?: ExpressionValue<string>;
  /** 绑定字段名（普通模式传 string；范围模式 isRange=true 时可传 [startField, endField]） */
  fieldName?: ExpressionValue<string | [string, string]>;
  required?: ExpressionValue<boolean>;
  rules?: ExpressionValue<FormValidationRule[]>;
  isNeedFormItem?: ExpressionValue<boolean>;
  displayOnly?: ExpressionValue<boolean>;
  displayOnlyType?: ExpressionValue<"text" | "formItem">;
  disabled?: ExpressionValue<boolean>;
  readOnly?: ExpressionValue<boolean>;
  defaultValue?: ExpressionValue<string>;
  placeholder?: MessageValue<string>;
  /** 是否开启范围选择，默认: false */
  isRange?: ExpressionValue<boolean>;
  /** 展示与持久化格式，默认: "YYYY-MM-DD HH:mm:ss" */
  format?: ExpressionValue<string>;
  /** 最小可选日期字符串 */
  minDate?: ExpressionValue<string>;
  /** 最大可选日期字符串 */
  maxDate?: ExpressionValue<string>;
  /** 禁用日期回调: `(current: Dayjs, info) => boolean` */
  disabledDate?: JSFunction;
  /** 禁用时间回调: `(current: Dayjs, range?: "start" | "end", info?: { from?: Dayjs }) => DisabledTimes` */
  disabledTime?: JSFunction;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: ExpressionValue<StyleProps>;
  events?: EventItem<"onClick" | "onChange" | "onBlur">[];
}

export const datetimePickerPresets = {
  /** 标准日期选择（YYYY-MM-DD） */
  date: (fieldName: string, displayName: string, required: boolean = false): DatetimePickerProps => ({
    type: "date",
    fieldName,
    displayName,
    required,
    format: "YYYY-MM-DD",
    placeholder: `请选择${displayName}`,
  }),

  /** 日期范围选择（绑定双字段） */
  dateRange: (
    fieldNames: [string, string],
    displayName: string,
    required: boolean = false
  ): DatetimePickerProps => ({
    type: "date",
    isRange: true,
    fieldName: fieldNames,
    displayName,
    required,
    format: "YYYY-MM-DD",
  }),
};
