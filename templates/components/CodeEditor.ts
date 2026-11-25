import type { EventItem, ExpressionValue, JSFunction, MessageValue } from "./types.js";

/**
 * CodeEditor 代码编辑器组件
 *
 * @description
 * 基于 Monaco 的代码输入与只读展示组件，支持 `javascript` 与 `sql`（源码: `component-schemas-v2/CodeEditor/index.ts`）。
 *
 * @usageGuidelines
 * - 可放入 `FormItemContainer` 作为表单字段（`isNeedFormItem: true`），也可单独用于代码/配置展示（`readOnly: true`、`isNeedFormItem: false`）；
 * - 宽高未配置时默认分别为 `"100%"` 与 `"200px"`。
 */
export interface CodeEditorProps {
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
  /** 是否包裹 Form.Item，默认: true */
  isNeedFormItem?: ExpressionValue<boolean>;
  displayOnly?: ExpressionValue<boolean>;
  displayOnlyType?: ExpressionValue<"text" | "formItem">;
  disabled?: ExpressionValue<boolean>;
  /** 只读模式，默认: false */
  readOnly?: ExpressionValue<boolean>;
  /** 默认代码字符串 */
  defaultValue?: ExpressionValue<string>;
  /** 语法高亮语言，默认: "javascript" */
  language?: ExpressionValue<"javascript" | "sql">;
  /** 编辑器主题，默认: "vs-dark" */
  theme?: ExpressionValue<"vs-dark" | "light">;
  /** 宽度（默认 "100%"） */
  width?: ExpressionValue<string>;
  /** 高度（默认 "200px"） */
  height?: ExpressionValue<string>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  events?: EventItem<"onChange">[];
}

export const codeEditorPresets = {
  /** 只读代码预览（无需表单包裹） */
  readonlyPreview: (
    defaultValue: ExpressionValue<string>,
    language: "javascript" | "sql" = "javascript",
    height: string = "240px"
  ): CodeEditorProps => ({
    isNeedFormItem: false,
    readOnly: true,
    language,
    theme: "vs-dark",
    height,
    defaultValue,
  }),
};
