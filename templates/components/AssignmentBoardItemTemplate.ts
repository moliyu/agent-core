import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/**
 * AssignmentBoardItemTemplate 资源分配看板项目模板组件
 *
 * @description
 * `AssignmentBoardItemList` 中单个关联项目的模板区域，模板子树可读取 `context.item` 与 `context.index`（源码: `component-schemas-v2/AssignmentBoardItemTemplate/index.ts`）。
 */
export interface AssignmentBoardItemTemplateProps {
  heightType?: ExpressionValue<"auto" | "fixed">;
  height?: ExpressionValue<string>;
  minHeight?: ExpressionValue<string>;
  maxHeight?: ExpressionValue<string>;
  widthType?: ExpressionValue<"auto" | "fixed">;
  width?: ExpressionValue<string>;
  minWidth?: ExpressionValue<string>;
  maxWidth?: ExpressionValue<string>;
  events?: EventItem<"onItemClick">[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
