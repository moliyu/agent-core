import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * AssignmentBoardEmptyState 资源分配看板空状态模板组件
 *
 * @description
 * `AssignmentBoardItemList` 中无关联项目时显示的空状态 Canvas 区域（源码: `component-schemas-v2/AssignmentBoardEmptyState/index.ts`）。
 */
export interface AssignmentBoardEmptyStateProps {
  heightType?: ExpressionValue<"auto" | "fixed">;
  height?: ExpressionValue<string>;
  minHeight?: ExpressionValue<string>;
  maxHeight?: ExpressionValue<string>;
  widthType?: ExpressionValue<"auto" | "fixed">;
  width?: ExpressionValue<string>;
  minWidth?: ExpressionValue<string>;
  maxWidth?: ExpressionValue<string>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
