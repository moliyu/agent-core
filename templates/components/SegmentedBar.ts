import type { ExpressionValue, StyleProps } from "./types.js";

/** SegmentedBar 分段项 */
export interface SegmentBarItem {
  id: string;
  value: number;
  color: string;
  label?: string;
  tooltip?: string;
  [key: string]: unknown;
}

/**
 * SegmentedBar 分段比例条组件
 *
 * @description
 * 展示多个分段值的组成及其比例（如商机阶段分布、配额占比等）（源码: `component-schemas-v2/SegmentedBar/index.ts`）。
 */
export interface SegmentedBarProps {
  items?: ExpressionValue<SegmentBarItem[]>;
  mode?: ExpressionValue<"proportional" | "equal">;
  fill?: ExpressionValue<boolean>;
  ariaLabel?: ExpressionValue<string>;
  height?: ExpressionValue<number>;
  gap?: ExpressionValue<number>;
  borderRadius?: ExpressionValue<number>;
  trackColor?: ExpressionValue<string>;
  showTooltip?: ExpressionValue<boolean>;
  hoverHighlight?: ExpressionValue<boolean>;
  hideZeroSegments?: ExpressionValue<boolean>;
  minSegmentPercent?: ExpressionValue<number>;
  emptyMode?: ExpressionValue<"equal" | "none">;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const segmentedBarPresets = {
  /** 按比例展示分段条 */
  proportional: (items: ExpressionValue<SegmentBarItem[]>, height: number = 10): SegmentedBarProps => ({
    items,
    mode: "proportional",
    height,
    gap: 2,
    borderRadius: 4,
    showTooltip: true,
    hoverHighlight: true,
    hideZeroSegments: true,
  }),
};
