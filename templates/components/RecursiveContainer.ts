import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * RecursiveContainer 递归容器组件
 *
 * @description
 * 按层级数据（`data`）与 `templates` 递归渲染嵌套内容；模板子树中可读取 `context.item`、`context.index` 与 `context.recursiveTemplateId`（源码: `component-schemas-v2/RecursiveContainer/index.ts`）。
 */
export interface RecursiveContainerProps {
  data?: Array<Record<string, unknown>>;
  alias?: string;
  itemKey?: string;
  childrenField?: string;
  selectTemplate?: unknown;
  templates?: Array<{ templateId?: string; templateName?: string }>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const recursiveContainerPresets = {
  /** 单模板递归容器 */
  basic: (alias: string, childrenField: string = "children"): RecursiveContainerProps => ({
    alias,
    itemKey: "id",
    childrenField,
    templates: [{ templateId: "template", templateName: "模板" }],
  }),
};
