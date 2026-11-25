import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/**
 * SchedulingWorkbench 资源排班工作台组件
 *
 * @description
 * 展示资源在时间轴或热力图上的排班、占用与可编辑时段，默认 `alias: "schedulingWorkbench"` 暴露 `refreshView()`（源码: `component-schemas-v2/SchedulingWorkbench/index.ts`）。
 */
export interface SchedulingWorkbenchProps {
  alias?: string;
  mode?: ExpressionValue<"timeline" | "heatmap">;
  loading?: ExpressionValue<boolean>;
  resources?: Array<Record<string, unknown>>;
  entities?: Array<Record<string, unknown>>;
  headerLabel?: string;
  titleTemplate?: string;
  iconName?: string;
  enableFilter?: ExpressionValue<boolean>;
  leftPanelWidth?: ExpressionValue<number>;
  heightType?: ExpressionValue<"auto" | "fixed">;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  viewportHeight?: ExpressionValue<number>;
  rowHeight?: ExpressionValue<number>;
  showNowLine?: ExpressionValue<boolean>;
  snapStepMinutes?: ExpressionValue<number>;
  defaultCreateDurationMinutes?: ExpressionValue<number>;
  highlightToday?: ExpressionValue<boolean>;
  todayColor?: string;
  headerColor?: string;
  readOnly?: ExpressionValue<boolean>;
  enableTooltip?: ExpressionValue<boolean>;
  enableCreate?: ExpressionValue<boolean>;
  createTrigger?: ExpressionValue<"click" | "doubleClick">;
  enableDrag?: ExpressionValue<boolean>;
  enableResize?: ExpressionValue<boolean>;
  commitMode?: ExpressionValue<"immediate" | "confirm">;
  blockCommitOnConflict?: ExpressionValue<boolean>;
  lockPastSlots?: ExpressionValue<boolean>;
  lockPastEvents?: ExpressionValue<boolean>;
  pastAnchor?: ExpressionValue<"now" | "dayStart">;
  heatmapHeaderHeight?: ExpressionValue<number>;
  maxRangeDays?: ExpressionValue<number>;
  showOccupancy?: ExpressionValue<boolean>;
  workMinutesPerDay?: ExpressionValue<number>;
  heatmapColorLow?: string;
  heatmapColorMedium?: string;
  heatmapColorHigh?: string;
  events?: EventItem[];
  timelineEvents?: EventItem[];
  heatmapEvents?: EventItem[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const schedulingWorkbenchPresets = {
  /** 时间轴排班模式 */
  timeline: (alias: string = "schedulingWorkbench"): SchedulingWorkbenchProps => ({
    alias,
    mode: "timeline",
    viewportHeight: 560,
    enableCreate: true,
    enableDrag: true,
    enableResize: true,
  }),
};
