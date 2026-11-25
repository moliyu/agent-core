import type { ExpressionValue } from "./types.js";

/**
 * TimelineItem 时间线节点模板组件
 *
 * @description
 * `Timeline` 时间线中单条记录的展示模板区域（源码: `component-schemas-v2/TimelineItem/index.ts`）。
 */
export interface TimelineItemProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}
