import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * PipelineItem 流程阶段模板组件
 *
 * @description
 * `PipelineV2` 生成的阶段模板节点，承载折叠头部 Canvas 与展开状态下的 `PipelineTaskNode` 任务模板（源码: `component-schemas-v2/PipelineItem/index.ts`）。
 */
export interface PipelineItemProps {
  themeColor?: ExpressionValue<string>;
  collapsedTitle?: unknown;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
