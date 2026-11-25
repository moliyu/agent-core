import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/** 关系图节点 */
export interface RelationNode {
  id: string;
  text: string;
  type?: string;
  itemSize?: number;
  itemColor?: string;
  itemType?: "plain" | "fill";
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  [key: string]: unknown;
}

/** 关系图连线 */
export interface RelationEdge {
  source: string;
  target: string;
  text?: string;
  [key: string]: unknown;
}

/**
 * RelationGraph 关系图谱组件
 *
 * @description
 * 展示实体、节点及其关系连线组成的关系图谱，支持动态 `data` 绑定与 `onClickNode` 事件（源码: `component-schemas-v2/RelationGraph/index.ts`）。
 */
export interface RelationGraphProps {
  data?: ExpressionValue<{
    nodes: RelationNode[];
    edges: RelationEdge[];
    rootId?: string;
  }>;
  events?: EventItem<"onClickNode">[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: StyleProps;
}

export const relationGraphPresets = {
  /** 基础企业/人物关系图谱 */
  basic: (data: ExpressionValue<{ nodes: RelationNode[]; edges: RelationEdge[]; rootId?: string }>): RelationGraphProps => ({
    data,
    style: { width: "100%", height: "480px" },
  }),
};
