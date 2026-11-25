import type { MessageValue, ExpressionValue, JSFunction, StyleProps, EventItem } from "./types.js";
import type { FormValidationRule } from "./Form.js";

/**
 * Prompt 业务提示选择组件
 *
 * @description
 * 从平台业务提示资源（PT）中选择单个或多个选项，支持弹窗选择、下拉搜索与动态级联查询
 * （源码: `component-schemas-v2/Prompt/index.ts`）。
 *
 * @usageGuidelines
 * - `promptName` 为确定的业务 PT 资源名称（默认: `"csrEmpPrompt"`）；
 * - 支持非空 `alias` 发布 `onOpenDialog()`、`onHideDialog()`、`setDisabledOptions(options)` 到 Page Context；
 * - 动态级联时：`config` 与 `remoteForm` 均使用 `JSExpression` 绑定对应级联键。
 */
export interface PromptProps {
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
  placeholder?: MessageValue<string>;
  /** Page Context 别名 */
  alias?: ExpressionValue<string>;
  /** 交互形态：弹窗选择 (`"default"`) 或下拉选择 (`"select"`), 默认: `"default"` */
  type?: ExpressionValue<"default" | "select">;
  /** 是否多选，默认: false */
  isMultiple?: ExpressionValue<boolean>;
  /** 多选最大数量，默认: 100 */
  maxCount?: ExpressionValue<number>;
  /** 最多展示标签数，默认: 5 */
  maxTagCount?: ExpressionValue<number>;
  /** 指定资源所属 BE（为空时使用页面默认 BE） */
  beName?: ExpressionValue<string>;
  /** 指定资源所属父 BE */
  parentBeName?: ExpressionValue<string>;
  /** 业务 PT 资源名称，默认: "csrEmpPrompt" */
  promptName?: ExpressionValue<string>;
  /** 业务查询配置字符串（级联时用 JSExpression 返回 `{ dynamicCascade: { PTfield: "CustomKey" } }`） */
  config?: ExpressionValue<string>;
  /** 级联远程表单值字符串（级联时用 JSExpression 返回 `{ CustomKey: value }`） */
  remoteForm?: ExpressionValue<string>;
  /** 传给选择回调的附加参数字符串 */
  paramObj?: ExpressionValue<string>;
  /** 禁用的选项 ID 列表 */
  disabledOptions?: ExpressionValue<string[]>;
  /** 选中后是否自动清空，默认: false */
  clearAfterSelect?: ExpressionValue<boolean>;
  /** 选择变更回调: `(value, option, data, options) => void` */
  handleChange?: JSFunction | "";
  /** 确认选择前回调: `(record, isSuccess, paramObj?) => void`（调用 `isSuccess(false)` 可阻止关闭与赋值） */
  handleCallback?: JSFunction | "";
  /** 刷新回调: `(value, option, data, options) => void` */
  handleRefresh?: JSFunction | "";
  /** 初始化加载完成回调: `(value, option, data, options) => void` */
  handleInit?: JSFunction | "";
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: StyleProps;
  /** 交互事件（onChange 的 params 为 [value, option, data, options]） */
  events?: EventItem<"onClick" | "onChange" | "onBlur">[];
}

export const promptPresets = {
  /** 标准下拉搜索 Prompt */
  selectPrompt: (
    fieldName: string,
    displayName: string,
    promptName: string,
    required: boolean = false
  ): PromptProps => ({
    type: "select",
    fieldName,
    displayName,
    promptName,
    required,
    placeholder: `请选择${displayName}`,
  }),
};
