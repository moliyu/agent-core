import type { ExpressionValue } from "./types.js";

/**
 * MiniMonthPanelTemplate 迷你月历面板模板组件
 *
 * @description
 * `EventCalendar` 中迷你月历面板的自定义内容模板区域，会自动创建 `content` Canvas Container（源码: `component-schemas-v2/MiniMonthPanelTemplate/index.ts`）。
 */
export interface MiniMonthPanelTemplateProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}
