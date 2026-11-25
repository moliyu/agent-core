import type { EventItem, StyleProps } from "./types.js";

/**
 * EventCalendar 日程日历组件
 *
 * @description
 * 按月/周/日/列表或迷你月视图展示、筛选并拖拽操作日程事件；默认 `alias: "eventCalendar"` 暴露 `refreshView()`（源码: `component-schemas-v2/EventCalendar/index.ts`）。
 */
export interface EventCalendarProps {
  alias?: string;
  displayMode?: "calendar" | "miniMonth";
  eventSources?: string;
  loading?: boolean;
  calendarEvents?: Array<Record<string, unknown>>;
  showToolbar?: boolean;
  showToday?: boolean;
  viewSwitcher?: string;
  showSearch?: boolean;
  showRefresh?: boolean;
  filterEnabled?: boolean;
  filterLabel?: string;
  defaultTypes?: string;
  filterAllowSelectAll?: boolean;
  showBorder?: boolean;
  borderColor?: string;
  borderRadius?: number;
  viewBorderRadius?: number;
  heightType?: "auto" | "fixed";
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  monthCellHeight?: number;
  dayMaxEvents?: number;
  showTime?: boolean;
  showIcon?: boolean;
  tooltipEnabled?: boolean;
  firstDay?: string;
  slotMinTime?: string;
  slotMaxTime?: string;
  miniMonthPanelLayout?: "horizontal" | "vertical";
  miniMonthMaxDots?: number;
  miniMonthCalendarWidth?: number;
  readonly?: boolean;
  eventClickable?: boolean;
  dateClickable?: boolean;
  dateClickTrigger?: "single" | "double";
  draggable?: boolean;
  calendarOperatorEvents?: EventItem[];
  miniMonthOperatorEvents?: EventItem[];
  visible?: boolean;
  hidden?: boolean;
  className?: string;
  style?: StyleProps;
}

export const eventCalendarPresets = {
  /** 标准全功能日程视图 */
  fullCalendar: (alias: string = "eventCalendar"): EventCalendarProps => ({
    alias,
    displayMode: "calendar",
    showToolbar: true,
    viewSwitcher: "month,week,day,list",
    draggable: true,
  }),
};
