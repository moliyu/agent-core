import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/**
 * PipelineKanban 拖拽阶段看板组件
 *
 * @description
 * 以看板形式展示阶段及其任务并支持跨阶段拖拽移动；阶段与任务模板通过实时树节点配置（源码: `component-schemas-v2/PipelineKanban/index.ts`）。
 */
export interface PipelineKanbanProps {
  stages?: Array<Record<string, unknown>>;
  iteratorVariableName?: string;
  indexVariableName?: string;
  tasksFieldName?: string;
  direction?: ExpressionValue<"horizontal" | "vertical">;
  widthType?: ExpressionValue<"auto" | "fixed">;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  heightType?: ExpressionValue<"auto" | "fixed">;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  enableDrag?: ExpressionValue<boolean>;
  events?: EventItem[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const pipelineKanbanPresets = {
  /** 水平可拖拽看板 */
  horizontal: (): PipelineKanbanProps => ({
    direction: "horizontal",
    width: "100%",
    enableDrag: true,
  }),
};
