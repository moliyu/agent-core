import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/**
 * WorkFlow 工作流画布组件
 *
 * @description
 * 基于 LogicFlow 的可交互工作流画布，支持节点/连线点击、拖拽放置、缩放居中与历史撤销；非空 `alias` 发布运行时图控制 API 到 `context[alias]`（源码: `component-schemas-v2/WorkFlow/index.ts`）。
 */
export interface WorkFlowProps {
  alias?: ExpressionValue<string>;
  readOnly?: ExpressionValue<boolean>;
  gridEnabled?: ExpressionValue<boolean>;
  toolbarEnabled?: ExpressionValue<boolean>;
  selectionControlsEnabled?: ExpressionValue<boolean>;
  zoomControlsEnabled?: ExpressionValue<boolean>;
  resetZoomEnabled?: ExpressionValue<boolean>;
  fitViewEnabled?: ExpressionValue<boolean>;
  centerViewEnabled?: ExpressionValue<boolean>;
  historyControlsEnabled?: ExpressionValue<boolean>;
  clearEnabled?: ExpressionValue<boolean>;
  nodeContextMenuEnabled?: ExpressionValue<boolean>;
  edgeContextMenuEnabled?: ExpressionValue<boolean>;
  selectionContextMenuEnabled?: ExpressionValue<boolean>;
  events?: EventItem<
    | "onNodeClick"
    | "onNodeDoubleClick"
    | "onNodeDrop"
    | "onNodeMoveEnd"
    | "onEdgeClick"
    | "onEdgeDoubleClick"
    | "onSelectionChange"
    | "onBlankClick"
  >[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const workFlowPresets = {
  /** 可编辑工作流设计画布 */
  editable: (alias: string = "workflow"): WorkFlowProps => ({
    alias,
    readOnly: false,
    gridEnabled: true,
    toolbarEnabled: true,
    historyControlsEnabled: true,
    style: { width: "100%", height: "600px" },
  }),
};
