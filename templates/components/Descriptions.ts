import type { ExpressionValue, StyleProps } from "./types.js";

/** Descriptions 单条描述项 */
export interface DescriptionItem {
  /** 标签文本 */
  label: string;
  /** 展示值文本 */
  value: string;
}

/**
 * Descriptions 描述列表组件
 *
 * @description
 * 以标签和值成组展示对象摘要或只读详情（源码: `component-schemas-v2/Descriptions/index.ts`）。
 *
 * @usageGuidelines
 * - 适合详情页顶部或概览卡片中的只读信息块；
 * - 支持 `JSExpression` 动态生成 `descriptionsItem` 数组（每项 `{ label, value }`）。
 */
export interface DescriptionsProps {
  /** 列表标题 */
  title?: string;
  /** 尺寸，默认: "default" */
  size?: ExpressionValue<"default" | "middle" | "small">;
  /** 排列方向，默认: "horizontal" */
  layout?: ExpressionValue<"horizontal" | "vertical">;
  /** 是否带边框，默认: true */
  bordered?: ExpressionValue<boolean>;
  /** 是否显示冒号，默认: true */
  colon?: ExpressionValue<boolean>;
  /** 每行展示的列数，默认: 3 */
  column?: ExpressionValue<number>;
  /** 描述项列表 */
  descriptionsItem?: ExpressionValue<DescriptionItem[]>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  labelStyle?: ExpressionValue<StyleProps>;
}

export const descriptionsPresets = {
  /** 带边框的 3 列详情摘要 */
  borderedSummary: (
    title: string,
    items: DescriptionItem[],
    column: number = 3
  ): DescriptionsProps => ({
    title,
    size: "middle",
    layout: "horizontal",
    bordered: true,
    colon: true,
    column,
    descriptionsItem: items,
  }),
};
