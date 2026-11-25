import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/**
 * PipelineContainer 流程看板容器组件
 *
 * @description
 * 流程看板的整体容器和布局区域（源码: `component-schemas-v2/PipelineContainer/index.ts`）。
 */
export interface PipelineContainerProps {
  heightType?: ExpressionValue<"auto" | "fixed">;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  wrapperClassName?: string;
  events?: EventItem[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
