import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * AssignmentBoardItemList 资源分配看板项目列表容器组件
 *
 * @description
 * `AssignmentBoard` 中承载 `AssignmentBoardItemTemplate` 与 `AssignmentBoardEmptyState` 的列表 Canvas 区域（源码: `component-schemas-v2/AssignmentBoardItemList/index.ts`）。
 */
export interface AssignmentBoardItemListProps {
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
