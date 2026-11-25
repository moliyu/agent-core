import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * ChartPlus 多维图表组件
 *
 * @description
 * 展示可配置的多维图表（柱状、折线、饼图等）及其数据、工具栏、维度/指标配置和配色（源码: `component-schemas-v2/ChartPlus/index.ts`）。
 */
export interface ChartPlusProps {
  titleConfig?: unknown;
  supportExport?: ExpressionValue<boolean>;
  metaData?: unknown;
  enableColorConfig?: ExpressionValue<boolean>;
  colorConfig?: string[];
  toolbars?: Array<Record<string, unknown>>;
  dimensions?: Array<Record<string, unknown>>;
  statistics?: Array<Record<string, unknown>>;
  chartRenders?: Array<Record<string, unknown>>;
  chartConfigSetting?: unknown;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const chartPlusPresets = {
  /** 基础可导出多维图表 */
  basic: (height: string = "360px"): ChartPlusProps => ({
    supportExport: true,
    enableColorConfig: false,
    style: { width: "100%", height },
  }),
};
