import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * PipelineTasksIteratorContainer 流程任务迭代容器组件
 *
 * @description
 * 按当前阶段任务数据迭代渲染任务模板的容器，默认上下文路径为 `context.iterator.item` 与 `context.iterator.index`（源码: `component-schemas-v2/PipelineTasksIteratorContainer/index.ts`）。
 */
export interface PipelineTasksIteratorContainerProps {
  iteratorVariableName?: string;
  indexVariableName?: string;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
