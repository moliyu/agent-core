import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/** 仪表盘布局项 */
export interface DashboardLayoutItem {
  i?: string;
  x?: ExpressionValue<number>;
  y?: ExpressionValue<number>;
  w?: ExpressionValue<number>;
  h?: ExpressionValue<number>;
  lock?: ExpressionValue<boolean>;
}

/**
 * DashboardDesign 仪表盘设计画布组件
 *
 * @description
 * 提供可拖拽配置的仪表盘网格布局与面板设计画布，非空 `alias` 发布 `getLayouts()`（源码: `component-schemas-v2/DashboardDesign/index.ts`）。
 */
export interface DashboardDesignProps {
  alias?: string;
  mode?: ExpressionValue<string>;
  layouts?: DashboardLayoutItem[];
  availableTemplates?: Array<{ name?: string; content?: unknown }>;
  events?: EventItem[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const dashboardDesignPresets = {
  /** 可编辑仪表盘画布 */
  editable: (alias: string): DashboardDesignProps => ({
    alias,
    mode: "edit",
    layouts: [],
    availableTemplates: [],
  }),
};
