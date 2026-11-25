import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * RecursiveContainerTemplate 递归容器模板组件
 *
 * @description
 * `RecursiveContainer` 中按模板渲染层级记录的模板区域，后代可读取 `context.item`、`context.index` 与 `context.recursiveTemplateId`（源码: `component-schemas-v2/RecursiveContainerTemplate/index.ts`）。
 */
export interface RecursiveContainerTemplateProps {
  templateName?: ExpressionValue<string>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
