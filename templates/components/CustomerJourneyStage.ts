import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * CustomerJourneyStage 客户旅程阶段组件
 *
 * @description
 * 展示客户旅程的阶段列表及其左右关联内容（源码: `component-schemas-v2/CustomerJourneyStage/index.ts`）。
 */
export interface CustomerJourneyStageProps {
  left?: ExpressionValue<string>;
  right?: ExpressionValue<string>;
  stages?: ExpressionValue<string[]>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
