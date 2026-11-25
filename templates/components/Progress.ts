import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * Progress 进度条组件
 *
 * @description
 * 以线性（`line`）、环形（`ring`）或纯文本（`text`）形式展示单个数值进度或完成度（源码: `component-schemas-v2/Progress/index.ts`）。
 */
export interface ProgressProps {
  /** 进度值（渲染器限制在 0-100），默认: 50 */
  value?: ExpressionValue<number>;
  /** 展示形态，默认: "ring" */
  variant?: ExpressionValue<"ring" | "line" | "text">;
  color?: ExpressionValue<string>;
  trackColor?: ExpressionValue<string>;
  ariaLabel?: ExpressionValue<string>;
  size?: ExpressionValue<number>;
  strokeWidth?: ExpressionValue<number>;
  height?: ExpressionValue<number>;
  width?: ExpressionValue<string>;
  borderRadius?: ExpressionValue<number>;
  showValueLabel?: ExpressionValue<boolean>;
  labelPosition?: ExpressionValue<"top" | "right">;
  showPercentSign?: ExpressionValue<boolean>;
  valueFontSize?: ExpressionValue<number>;
  valueFontWeight?: ExpressionValue<"400" | "500" | "600" | "700" | "800">;
  valueColor?: ExpressionValue<string>;
  unitFontSize?: ExpressionValue<number>;
  unitFontWeight?: ExpressionValue<"400" | "500" | "600" | "700" | "800">;
  unitColor?: ExpressionValue<string>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const progressPresets = {
  /** 线性进度条（右侧显示百分比） */
  lineBar: (value: ExpressionValue<number> = 50, color: string = "#1677ff"): ProgressProps => ({
    variant: "line",
    value,
    color,
    height: 8,
    showValueLabel: true,
    labelPosition: "right",
    showPercentSign: true,
  }),
  /** 环形进度 */
  ring: (value: ExpressionValue<number> = 75, size: number = 44): ProgressProps => ({
    variant: "ring",
    value,
    size,
    strokeWidth: 4,
    showValueLabel: true,
    showPercentSign: true,
  }),
};
