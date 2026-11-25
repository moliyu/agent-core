import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/**
 * PipelineV2 商机/阶段看板 V2 组件
 *
 * @description
 * 以阶段与任务模板展示可分页、虚拟滚动的业务流程看板（如商机推进看板）；非空 `alias` 发布折叠控制方法（源码: `component-schemas-v2/PipelineV2/index.ts`）。
 */
export interface PipelineV2Props {
  alias?: string;
  stages?: Array<Record<string, unknown>>;
  stageKey?: string;
  taskKey?: string;
  emptyText?: string;
  columnWidth?: ExpressionValue<number>;
  height?: string;
  showEmptyIcon?: ExpressionValue<boolean>;
  enablePagination?: ExpressionValue<boolean>;
  hasMore?: unknown;
  enableVirtualScroll?: ExpressionValue<boolean>;
  virtualItemHeight?: ExpressionValue<number>;
  virtualGap?: ExpressionValue<number>;
  virtualOverscan?: ExpressionValue<number>;
  events?: EventItem[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const pipelineV2Presets = {
  /** 商机阶段看板 */
  opportunityBoard: (alias: string = "pipeline"): PipelineV2Props => ({
    alias,
    stageKey: "id",
    taskKey: "id",
    columnWidth: 272,
    height: "600px",
    enableVirtualScroll: true,
  }),
};
