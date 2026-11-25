import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * PipelineStageContainer 流程阶段列容器组件
 *
 * @description
 * 流程看板中单个阶段列的布局容器（源码: `component-schemas-v2/PipelineStageContainer/index.ts`）。
 */
export interface PipelineStageContainerProps {
  widthType?: ExpressionValue<"auto" | "fixed">;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  heightType?: ExpressionValue<"auto" | "fixed">;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
