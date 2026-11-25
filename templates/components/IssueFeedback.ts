import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * IssueFeedback 问题反馈卡片组件
 *
 * @description
 * 展示带优先级（`P0` / `P1` / `P2`）、分类、描述、提报人与附件的问题反馈卡片（源码: `component-schemas-v2/IssueFeedback/index.ts`）。
 */
export interface IssueFeedbackProps {
  priority?: ExpressionValue<"P0" | "P1" | "P2">;
  size?: ExpressionValue<number>;
  priorityLabel?: ExpressionValue<string>;
  category?: ExpressionValue<string>;
  title?: ExpressionValue<string>;
  description?: ExpressionValue<string>;
  reporter?: ExpressionValue<string>;
  reportedAt?: ExpressionValue<string>;
  attachments?: Array<{ url?: ExpressionValue<string> }>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const issueFeedbackPresets = {
  /** P1 问题反馈卡片 */
  basic: (title: string, description: string, priority: "P0" | "P1" | "P2" = "P1"): IssueFeedbackProps => ({
    priority,
    title,
    description,
    size: 24,
  }),
};
