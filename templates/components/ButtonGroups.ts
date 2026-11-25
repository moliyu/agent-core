import type { EventItem, ExpressionValue } from "./types.js";

/** ButtonGroups 单项配置 */
export interface ButtonGroupItem {
  label?: ExpressionValue<string>;
  shape?: ExpressionValue<"circle" | "round" | "default">;
  theme?: ExpressionValue<"primary" | "green" | "cyan" | "volcano" | "danger" | "default">;
  variant?: ExpressionValue<"solid" | "filled" | "outlined" | "dashed" | "link" | "text">;
  buttonBehavior?: ExpressionValue<"submit" | "reset" | "button">;
  formAlias?: ExpressionValue<string>;
  iconName?: ExpressionValue<string>;
  iconPosition?: ExpressionValue<"start" | "end">;
  disabled?: ExpressionValue<boolean>;
  href?: ExpressionValue<string>;
  events?: EventItem<"onClick">[];
}

/**
 * ButtonGroups 按钮组组件
 *
 * @description
 * 以水平或垂直组形式排列多个按钮，统一控制方向和尺寸；按钮项通过 `buttonGroups` 数组配置（非独立 Craft 节点）（源码: `component-schemas-v2/ButtonGroups/index.ts`）。
 */
export interface ButtonGroupsProps {
  buttonGroups?: ExpressionValue<ButtonGroupItem[]>;
  direction?: ExpressionValue<"vertical" | "horizontal">;
  size?: ExpressionValue<"large" | "middle" | "small">;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}

export const buttonGroupsPresets = {
  /** 表单提交+重置按钮组 */
  formActions: (formAlias: string): ButtonGroupsProps => ({
    direction: "horizontal",
    size: "middle",
    buttonGroups: [
      { label: "查询", theme: "primary", variant: "solid", buttonBehavior: "submit", formAlias },
      { label: "重置", theme: "default", variant: "outlined", buttonBehavior: "reset", formAlias },
    ],
  }),
};
