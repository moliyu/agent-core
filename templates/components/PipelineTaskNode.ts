import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * PipelineTaskNode 流程任务卡片容器组件
 *
 * @description
 * `PipelineV2` 阶段任务模板中的 Canvas 容器（源码: `component-schemas-v2/PipelineTaskNode/index.ts`）。
 */
export interface PipelineTaskNodeProps {
  backgroundColor?: ExpressionValue<string>;
  borderColor?: ExpressionValue<string>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
