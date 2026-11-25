import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/** 雷达图维度指标 */
export interface RadarIndicator {
  key: ExpressionValue<string>;
  name: ExpressionValue<string>;
  max: ExpressionValue<number>;
  min?: ExpressionValue<number>;
}

/** 雷达图数据系列 */
export interface RadarSeries {
  key: ExpressionValue<string>;
  name: ExpressionValue<string>;
  values: ExpressionValue<number[]>;
  color?: ExpressionValue<string>;
}

/**
 * RadarChart 雷达图组件
 *
 * @description
 * 以雷达图比较多组指标在多个维度上的数值，支持系列/数据点点击事件（源码: `component-schemas-v2/RadarChart/index.ts`）。
 */
export interface RadarChartProps {
  indicators?: ExpressionValue<RadarIndicator[]>;
  series?: ExpressionValue<RadarSeries[]>;
  heightType?: ExpressionValue<"auto" | "fixed">;
  height?: ExpressionValue<string>;
  minHeight?: ExpressionValue<string>;
  maxHeight?: ExpressionValue<string>;
  widthType?: ExpressionValue<"auto" | "fixed">;
  width?: ExpressionValue<string>;
  minWidth?: ExpressionValue<string>;
  maxWidth?: ExpressionValue<string>;
  titleText?: ExpressionValue<string>;
  titleSubtext?: ExpressionValue<string>;
  titleLeft?: ExpressionValue<"left" | "center" | "right">;
  titleTop?: ExpressionValue<number>;
  legendShow?: ExpressionValue<boolean>;
  legendOrient?: ExpressionValue<"horizontal" | "vertical">;
  legendLeft?: ExpressionValue<"left" | "center" | "right">;
  legendTop?: ExpressionValue<"top" | "middle" | "bottom">;
  radarShape?: ExpressionValue<"polygon" | "circle">;
  radarRadius?: ExpressionValue<number>;
  radarCenterX?: ExpressionValue<number>;
  radarCenterY?: ExpressionValue<number>;
  radarAxisNameShow?: ExpressionValue<boolean>;
  radarSplitAreaShow?: ExpressionValue<boolean>;
  radarSplitAreaColor0?: ExpressionValue<string>;
  radarSplitAreaColor1?: ExpressionValue<string>;
  radarSplitNumber?: ExpressionValue<number>;
  radarAxisNameGap?: ExpressionValue<number>;
  radarSplitLineShow?: ExpressionValue<boolean>;
  seriesShowArea?: ExpressionValue<boolean>;
  seriesAreaOpacity?: ExpressionValue<number>;
  seriesLineWidth?: ExpressionValue<number>;
  seriesLineType?: ExpressionValue<"solid" | "dashed" | "dotted">;
  seriesSymbol?: ExpressionValue<"none" | "circle" | "rect" | "diamond">;
  seriesSymbolSize?: ExpressionValue<number>;
  seriesShowValueLabel?: ExpressionValue<boolean>;
  seriesValueLabelFontSize?: ExpressionValue<number>;
  seriesValueLabelColor?: ExpressionValue<string>;
  tooltipShow?: ExpressionValue<boolean>;
  tooltipTriggerOn?: ExpressionValue<"mousemove" | "click">;
  events?: EventItem<"onSeriesClick" | "onPointClick">[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const radarChartPresets = {
  /** 标准五维能力雷达图 */
  basic: (titleText: string, indicators: RadarIndicator[], series: RadarSeries[]): RadarChartProps => ({
    titleText,
    indicators,
    series,
    heightType: "fixed",
    height: "360px",
    width: "100%",
    radarShape: "polygon",
    seriesShowArea: true,
    legendShow: true,
  }),
};
