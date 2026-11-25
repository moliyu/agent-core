import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/** GraphPath 节点 */
export interface GraphPathNode {
  id: string;
  label: string;
  time?: string | number;
  probability?: number;
  stage?: string;
  score?: number;
  amount?: number;
  color?: string;
  iconKey?: string;
  isBranchPoint?: boolean;
}

/** GraphPath 连线 */
export interface GraphPathEdge {
  id?: string;
  source: string;
  target: string;
  probability?: number;
  weight?: number;
  type: "main" | "branch" | "churn";
  label?: string;
}

/**
 * GraphPath 转化路径图组件
 *
 * @description
 * 展示带时间/数值坐标轴的节点转化路径、分支与流失关系图（源码: `component-schemas-v2/GraphPath/index.ts`）。
 */
export interface GraphPathProps {
  data?: ExpressionValue<{ nodes: GraphPathNode[]; edges: GraphPathEdge[] }>;
  height?: ExpressionValue<string>;
  showGrid?: ExpressionValue<boolean>;
  showNodeIcon?: ExpressionValue<boolean>;
  branchCollapsible?: ExpressionValue<boolean>;
  edgeGradient?: ExpressionValue<boolean>;
  autoResolveOverlap?: ExpressionValue<boolean>;
  showCardConnectors?: ExpressionValue<boolean>;
  animate?: ExpressionValue<boolean>;
  showNodeTypes?: ExpressionValue<boolean>;
  showEdgeTypes?: ExpressionValue<boolean>;
  showNodeTooltip?: ExpressionValue<boolean>;
  nodeTooltip?: ExpressionValue<Array<{ key?: string; label?: string }>>;
  showEdgeTooltip?: ExpressionValue<boolean>;
  edgeTooltip?: ExpressionValue<Array<{ key?: string; label?: string }>>;
  xType?: ExpressionValue<"time" | "linear" | "ordinal">;
  xField?: ExpressionValue<string>;
  xTitle?: ExpressionValue<string>;
  xTimeMode?: ExpressionValue<"date" | "hour">;
  xTimeFormat?: ExpressionValue<string>;
  xDateDomainStart?: ExpressionValue<string>;
  xDateDomainEnd?: ExpressionValue<string>;
  xHourDomainStart?: ExpressionValue<string>;
  xHourDomainEnd?: ExpressionValue<string>;
  xLinearDomainMin?: ExpressionValue<number>;
  xLinearDomainMax?: ExpressionValue<number>;
  xUnit?: ExpressionValue<string>;
  xTickCount?: ExpressionValue<number>;
  yType?: ExpressionValue<"percent" | "linear">;
  yField?: ExpressionValue<string>;
  yTitle?: ExpressionValue<string>;
  yDomainMin?: ExpressionValue<number>;
  yDomainMax?: ExpressionValue<number>;
  yUnit?: ExpressionValue<string>;
  yTickStep?: ExpressionValue<number>;
  yTickCount?: ExpressionValue<number>;
  cardAnchorGap?: ExpressionValue<number>;
  fontSize?: ExpressionValue<number>;
  cardFontSize?: ExpressionValue<number>;
  nodeIconSize?: ExpressionValue<number>;
  nodeWidth?: ExpressionValue<number>;
  nodeHeight?: ExpressionValue<number>;
  backgroundColor?: ExpressionValue<string>;
  gridColor?: ExpressionValue<string>;
  axisColor?: ExpressionValue<string>;
  axisLabelColor?: ExpressionValue<string>;
  axisTickColor?: ExpressionValue<string>;
  fontFamily?: ExpressionValue<string>;
  arrowLength?: ExpressionValue<number>;
  arrowWidth?: ExpressionValue<number>;
  events?: EventItem<"onNodeClick">[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const graphPathPresets = {
  /** 标准转化路径图 */
  conversion: (data: ExpressionValue<{ nodes: GraphPathNode[]; edges: GraphPathEdge[] }>, height: string = "520"): GraphPathProps => ({
    data,
    height,
    showGrid: true,
    branchCollapsible: true,
    edgeGradient: true,
    animate: true,
  }),
};
