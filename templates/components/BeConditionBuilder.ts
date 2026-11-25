import type { EventItem, ExpressionValue, MessageValue, StyleProps } from "./types.js";

/** BeConditionBuilder 自定义表字段定义 */
export interface BeConditionTableField {
  value: string;
  label: string;
  desc?: string;
  name?: string;
  type?: "Number" | "Date" | "DateTime" | "Time" | "Long" | "Character" | "Varchar";
  controlType?: "string" | "number" | "date" | "datetime" | "time" | "prompt" | "transform";
  length?: number;
  precision?: number;
  numberLength?: number;
  transformCode?: string;
  promptName?: string;
  fieldProperties?: "SReference" | "MReference" | "Calculated" | "StaticCalculated" | "Standard" | "ForeignId";
  joinType?: "vertical" | "extend" | "general";
  systemField?: boolean;
  messageCode?: string;
}

/**
 * BeConditionBuilder 业务条件树编辑器
 *
 * @description
 * 可视化编辑条件树，支持 BE 字段（`displayType: "be"`）或自定义字段（`displayType: "table"` + `tableFields`）；通过 `alias` 暴露 `getCondition()`、`setCondition()`、`validate(cb)`、`getPreviewText()`、`setInitCondition()` 等（源码: `component-schemas-v2/BeConditionBuilder/index.ts`）。
 */
export interface BeConditionBuilderProps {
  alias?: string;
  maxLevel?: ExpressionValue<number>;
  displayType?: ExpressionValue<"be" | "table">;
  beName?: string;
  tableFields?: ExpressionValue<BeConditionTableField[]>;
  expressionMetas?: Array<Record<string, unknown>>;
  hiddenExpressionMetas?: ExpressionValue<boolean>;
  availableExpressionType?: Array<"constant" | "variable" | "computed-variable">;
  enablePreview?: ExpressionValue<boolean>;
  previewLabel?: unknown;
  displayName?: unknown;
  labelTooltipEnabled?: ExpressionValue<boolean>;
  labelTooltip?: MessageValue;
  labelWidth?: unknown;
  disabled?: ExpressionValue<boolean>;
  readOnly?: ExpressionValue<boolean>;
  defaultValue?: unknown;
  isNeedFormItem?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: ExpressionValue<StyleProps>;
  events?: EventItem<"onChange">[];
}

export const beConditionBuilderPresets = {
  /** 自定义字段条件树 */
  tableFields: (alias: string, tableFields: BeConditionTableField[]): BeConditionBuilderProps => ({
    alias,
    displayType: "table",
    tableFields,
    availableExpressionType: ["constant"],
    enablePreview: true,
    maxLevel: 3,
  }),
};
