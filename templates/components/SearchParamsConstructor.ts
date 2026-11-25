import type { ExpressionValue, JSFunction } from "./types.js";

/** 查询条件字段值类型 */
export type SearchFieldValue = string | number | string[] | number[] | null;

/**
 * SearchParamsConstructor 查询条件构造器组件
 *
 * @description
 * 配置并生成业务查询条件（支持按钮弹窗或平铺模式），通过 `alias` 暴露 `onGetSearchParams()` 与 `getPreviewText()`（源码: `component-schemas-v2/SearchParamsConstructor/index.ts`）。
 */
export interface SearchParamsConstructorProps {
  /** 页面上下文别名，暴露 `onGetSearchParams()` 和 `getPreviewText()` */
  alias?: string;
  displayMode?: "button" | "tile";
  buttonName?: string;
  dialogHeadTitle?: string;
  dialogBtnName?: string;
  buttonType?: "primary" | "dashed" | "link" | "text" | "default";
  condition?: ExpressionValue<Record<string, SearchFieldValue>>;
  beName?: string;
  filterName?: string;
  /** `(result, filterName, fieldsValue) => void` */
  onCallback?: JSFunction | "";
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}

export const searchParamsConstructorPresets = {
  /** 按钮弹窗模式查询构造器 */
  dialogButton: (alias: string, beName: string, buttonName: string = "设置条件"): SearchParamsConstructorProps => ({
    alias,
    beName,
    displayMode: "button",
    buttonName,
    buttonType: "primary",
  }),
};
