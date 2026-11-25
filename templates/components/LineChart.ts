import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * LineChart 折线图组件
 *
 * @description
 * 以折线图/面积堆叠图展示按类别或时间变化的数据趋势，通过 `legendConfig.items[].key` 索引 `data[key]`（源码: `component-schemas-v2/LineChart/index.ts`）。
 */
export interface LineChartProps {
  /** 系列数据，按 `legendConfig.items[].key` 索引 */
  data?: ExpressionValue<Record<string, number[]>>;
  stack?: ExpressionValue<boolean>;
  titleConfig?: ExpressionValue<{ title?: ExpressionValue<string> }>;
  legendConfig?: ExpressionValue<{
    items?: Array<{ key?: string; legend?: string; color?: string }>;
  }>;
  xAxisConfig?: ExpressionValue<{
    name?: ExpressionValue<string>;
    xAxis?: ExpressionValue<string[]>;
    nameStyle?: ExpressionValue<Record<string, unknown>>;
    nameLocation?: ExpressionValue<"start" | "middle" | "end">;
    nameGap?: ExpressionValue<number>;
    boundaryGap?: ExpressionValue<boolean>;
  }>;
  yAxisConfig?: ExpressionValue<{
    name?: ExpressionValue<string>;
    nameStyle?: ExpressionValue<Record<string, unknown>>;
    nameLocation?: ExpressionValue<"start" | "middle" | "end">;
    nameGap?: ExpressionValue<number>;
  }>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  wrapperStyles?: ExpressionValue<StyleProps>;
}

export const lineChartPresets = {
  /** 标准多系列折线图 */
  basic: (title: string, xAxis: string[], seriesItems: Array<{ key: string; legend: string; color?: string }>, data: ExpressionValue<Record<string, number[]>>): LineChartProps => ({
    titleConfig: { title },
    legendConfig: { items: seriesItems },
    xAxisConfig: { name: "", xAxis, boundaryGap: false },
    data,
    wrapperStyles: { width: "100%", height: "320px" },
  }),
};
