import type { ExpressionValue } from "./types.js";

/**
 * EventTooltipTemplate 日历事件提示模板组件
 *
 * @description
 * `EventCalendar` 中日历事件 Tooltip 的自定义内容模板区域，会自动创建 `content` Canvas Container（源码: `component-schemas-v2/EventTooltipTemplate/index.ts`）。
 */
export interface EventTooltipTemplateProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}
