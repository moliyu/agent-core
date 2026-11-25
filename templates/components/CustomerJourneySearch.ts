import type { JSFunction, StyleProps } from "./types.js";

/** 客户旅程检索项 */
export interface CustomerJourneySearchItem {
  eventAttrName?: string;
  eventAttrCode?: string;
  valType?: "TRANSFORM" | "PROMPT" | "TEXT" | "EVENT_INSVAL";
  transformCode?: string;
  promptName?: string;
  orderNum?: number;
}

/**
 * CustomerJourneySearch 客户旅程搜索组件
 *
 * @description
 * 搜索并选择客户旅程相关数据，支持自定义搜索/重置/关闭回调，非空 `alias` 发布 `getData()`（源码: `component-schemas-v2/CustomerJourneySearch/index.ts`）。
 */
export interface CustomerJourneySearchProps {
  alias?: string;
  searchItem?: CustomerJourneySearchItem[];
  eventInstancePromptName?: string;
  config?: string;
  initFunction?: JSFunction | "";
  /** `(fieldValue) => void` */
  searchFunction?: JSFunction | "";
  /** `() => void` */
  resetFunction?: JSFunction | "";
  /** `() => void` */
  closeFunction?: JSFunction | "";
  dialogStyle?: StyleProps;
  visible?: boolean;
  hidden?: boolean;
  className?: string;
  style?: StyleProps;
}
