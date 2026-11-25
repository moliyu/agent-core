import type { EventItem, ExpressionValue } from "./types.js";

/**
 * BusinessConfigurator 业务表单配置器组件
 *
 * @description
 * 配置业务组件/表单设计器的画布、模板与设计器事件（源码: `component-schemas-v2/BusinessConfigurator/index.ts`）。
 */
export interface BusinessConfiguratorProps {
  studioHeaderConfig?: unknown;
  studioVersionHistoryConfig?: unknown;
  paletteLayout?: unknown;
  defaultCanvasJson?: unknown;
  contextTemplate?: unknown;
  studioEvents?: EventItem[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}
