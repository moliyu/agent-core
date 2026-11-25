import type { ExpressionValue } from "./types.js";

/**
 * EntityTooltipTemplate 实体提示模板组件
 *
 * @description
 * `SchedulingWorkbench` 中实体 Tooltip 的自定义内容模板区域，会自动创建 `content` Canvas Container（源码: `component-schemas-v2/EntityTooltipTemplate/index.ts`）。
 */
export interface EntityTooltipTemplateProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}
