import type { EventItem, ExpressionValue } from "./types.js";

/**
 * BatchSaveButton 批量保存按钮组件
 *
 * @description
 * 触发批量保存操作，支持 `beforeToSubmit` 校验钩子（仅当 `data.valid === true` 时继续保存）（源码: `component-schemas-v2/BatchSaveButton/index.ts`）。
 */
export interface BatchSaveButtonProps {
  label?: ExpressionValue<string>;
  theme?: ExpressionValue<"primary" | "green" | "cyan" | "volcano" | "danger" | "default">;
  variant?: ExpressionValue<"solid" | "filled" | "outlined" | "dashed" | "link" | "text">;
  iconName?: ExpressionValue<string>;
  iconPosition?: ExpressionValue<"start" | "end">;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  disabled?: ExpressionValue<boolean>;
  events?: EventItem<"beforeToSubmit">[];
}

export const batchSaveButtonPresets = {
  /** 主色调批量保存按钮 */
  primary: (label: string = "批量保存"): BatchSaveButtonProps => ({
    label,
    theme: "primary",
    variant: "solid",
  }),
};
