import type { MessageValue, ExpressionValue, EventItem } from "./types.js";
import type { FormValidationRule } from "./Form.js";

/**
 * Switch 切换开关组件
 *
 * @description
 * 提供布尔或双值切换开关，支持自定义选中/未选中实际持久化值、文案和图标
 * （源码: `component-schemas-v2/Switch/index.ts`）。
 *
 * @usageGuidelines
 * - `checkValue` 与 `noCheckValue` 为实际写回 Form/BE 的值（如 `"Y"` / `"N"` 或 `"1"` / `"0"`），并非固定 boolean；
 * - 注意：Switch 属性系统未声明 `className`、`style`、`formItemStyle`，请勿传入这些样式字段。
 */
export interface SwitchProps {
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
  /** 选中时写回表单/BE 的值（如 `"Y"`） */
  checkValue?: ExpressionValue<string>;
  /** 未选中时写回表单/BE 的值（如 `"N"`） */
  noCheckValue?: ExpressionValue<string>;
  /** 尺寸，默认: "default" */
  size?: ExpressionValue<"default" | "small">;
  /** 选中主题色，默认: "primary" */
  checkTheme?: ExpressionValue<"primary" | "success" | "info" | "warning" | "danger">;
  /** 未选中主题色，默认: "default" */
  noCheckTheme?: ExpressionValue<"primary" | "success" | "info" | "warning" | "danger" | "default">;
  /** 是否在开关内显示文字或图标，默认: false */
  isNeedWordOrIcon?: ExpressionValue<boolean>;
  checkedChildrenType?: ExpressionValue<"word" | "icon">;
  wordCheckedChildren?: MessageValue<string>;
  wordNoCheckedChildren?: MessageValue<string>;
  iconCheckedChildren?: ExpressionValue<string>;
  iconNoCheckChildren?: ExpressionValue<string>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  /** 交互事件（onChange 的 params[0] 为配置的 checkValue 或 noCheckValue） */
  events?: EventItem<"onClick" | "onChange" | "onBlur">[];
}

export const switchPresets = {
  /** Y/N 状态切换开关 */
  yesNo: (fieldName: string, displayName: string): SwitchProps => ({
    fieldName,
    displayName,
    checkValue: "Y",
    noCheckValue: "N",
    isNeedWordOrIcon: true,
    checkedChildrenType: "word",
    wordCheckedChildren: "是",
    wordNoCheckedChildren: "否",
  }),
};
