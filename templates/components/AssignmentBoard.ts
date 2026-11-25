import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/** 分配关联关系 */
export interface AssignmentRelation {
  containerId: ExpressionValue<string>;
  itemId: ExpressionValue<string>;
  orderNo?: ExpressionValue<number | null>;
}

/**
 * AssignmentBoard 资源分配看板组件
 *
 * @description
 * 以看板形式展示和管理容器（`containers`）、项目（`items`）及其关联关系（`relations`），支持一对一/一对多拖拽分配（源码: `component-schemas-v2/AssignmentBoard/index.ts`）。
 */
export interface AssignmentBoardProps {
  id?: string;
  alias?: string;
  mode?: ExpressionValue<"one-to-one" | "one-to-many">;
  containerIdField?: string;
  itemIdField?: string;
  containers?: ExpressionValue<Array<Record<string, unknown>>>;
  items?: ExpressionValue<Array<Record<string, unknown>>>;
  relations?: ExpressionValue<AssignmentRelation[]>;
  occupiedTarget?: ExpressionValue<"reject" | "swap" | "replace" | "confirm">;
  confirmTitle?: ExpressionValue<string>;
  confirmDescription?: ExpressionValue<string>;
  heightType?: ExpressionValue<"auto" | "fixed">;
  height?: ExpressionValue<string>;
  minHeight?: ExpressionValue<string>;
  maxHeight?: ExpressionValue<string>;
  widthType?: ExpressionValue<"auto" | "fixed">;
  width?: ExpressionValue<string>;
  minWidth?: ExpressionValue<string>;
  maxWidth?: ExpressionValue<string>;
  events?: EventItem<"onRelationChange">[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const assignmentBoardPresets = {
  /** 一对多分配看板 */
  oneToMany: (alias: string = "assignmentBoard"): AssignmentBoardProps => ({
    alias,
    mode: "one-to-many",
    occupiedTarget: "replace",
  }),
};
