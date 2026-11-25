import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * SankeyChart 桑基图组件
 *
 * @description
 * 以桑基图展示节点之间带数值的流向关系（源码: `component-schemas-v2/SankeyChart/index.ts`）。
 */
export interface SankeyChartProps {
  left?: ExpressionValue<string>;
  right?: ExpressionValue<string>;
  data?: ExpressionValue<Array<Record<string, number>>>;
  nodesConfig?: ExpressionValue<Array<{
    nodes?: Array<{ name?: string; label?: string; color?: string }>;
    title?: string;
  }>>;
  linksConfig?: ExpressionValue<Array<{
    links?: Array<{ key?: string; source?: string; target?: string; color?: string }>;
  }>>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const sankeyChartPresets = {
  /** 单组流向桑基图 */
  basic: (nodes: Array<{ name: string; label?: string }>, links: Array<{ key: string; source: string; target: string }>, values: Record<string, number>): SankeyChartProps => ({
    nodesConfig: [{ nodes }],
    linksConfig: [{ links }],
    data: [values],
    style: { width: "100%", height: "360px" },
  }),
};
