import type { EventItem, ExpressionValue, JSFunction, StyleProps } from "./types.js";

/**
 * TreeView 树形视图组件
 *
 * @description
 * 以可展开的卡片树形视图浏览层级数据（如组织架构/股权穿透树），通过 `alias` 暴露 `expandAll()` 与 `collapseAll()`（源码: `component-schemas-v2/TreeView/index.ts`）。
 */
export interface TreeViewProps {
  /** data 中用作节点唯一键的字段名 */
  itemKey?: ExpressionValue<string>;
  data?: ExpressionValue<Array<Record<string, unknown>>>;
  /** `(node) => boolean` */
  hasChildren?: JSFunction;
  /** 页面上下文别名，暴露 `expandAll()` 与 `collapseAll()` */
  alias?: ExpressionValue<string>;
  width?: ExpressionValue<number>;
  height?: ExpressionValue<number>;
  gapV?: ExpressionValue<number>;
  gapH?: ExpressionValue<number>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  events?: EventItem<"onClickNode" | "onLoadNode">[];
}

export const treeViewPresets = {
  /** 标准层级卡片树 */
  basic: (alias: string, itemKey: string = "id"): TreeViewProps => ({
    alias,
    itemKey,
    width: 224,
    height: 86,
    gapV: 64,
    gapH: 28,
  }),
};
