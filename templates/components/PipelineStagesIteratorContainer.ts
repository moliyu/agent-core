import type { ExpressionValue } from "./types.js";

/**
 * PipelineStagesIteratorContainer 流程阶段迭代容器组件
 *
 * @description
 * 按阶段数据迭代渲染 `PipelineIteratorItem` 阶段模板的容器（源码: `component-schemas-v2/PipelineStagesIteratorContainer/index.ts`）。
 */
export interface PipelineStagesIteratorContainerProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}
