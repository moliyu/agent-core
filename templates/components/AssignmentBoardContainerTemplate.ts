import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/**
 * AssignmentBoardContainerTemplate 资源分配看板容器模板组件
 *
 * @description
 * `AssignmentBoard` 中单个容器卡片的模板区域，模板子树可读取 `context.item`（当前 Container 记录）与 `context.index`（零基索引）（源码: `component-schemas-v2/AssignmentBoardContainerTemplate/index.ts`）。
 */
export interface AssignmentBoardContainerTemplateProps {
  heightType?: ExpressionValue<"auto" | "fixed">;
  height?: ExpressionValue<string>;
  minHeight?: ExpressionValue<string>;
  maxHeight?: ExpressionValue<string>;
  widthType?: ExpressionValue<"auto" | "fixed">;
  width?: ExpressionValue<string>;
  minWidth?: ExpressionValue<string>;
  maxWidth?: ExpressionValue<string>;
  events?: EventItem<"onContainerClick">[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
