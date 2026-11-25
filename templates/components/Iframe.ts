import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/** Iframe 权限项 */
export interface IframePermission {
  token?: string;
  enabled?: boolean;
}

/**
 * Iframe 内嵌网页组件
 *
 * @description
 * 在页面中嵌入外部网页或资源，提供域名白名单、Sandbox 权限控制、加载提示、刷新与全屏工具栏（源码: `component-schemas-v2/Iframe/index.ts`）。
 */
export interface IframeProps {
  src?: ExpressionValue<string>;
  title?: ExpressionValue<string>;
  heightType?: ExpressionValue<"auto" | "fixed">;
  height?: ExpressionValue<string>;
  minHeight?: ExpressionValue<string>;
  maxHeight?: ExpressionValue<string>;
  widthType?: ExpressionValue<"auto" | "fixed">;
  width?: ExpressionValue<string>;
  minWidth?: ExpressionValue<string>;
  maxWidth?: ExpressionValue<string>;
  border?: ExpressionValue<boolean>;
  borderRadius?: ExpressionValue<number>;
  toolbarPosition?: ExpressionValue<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
  toolbarVisibility?: ExpressionValue<"hover" | "always">;
  allowedDomains?: ExpressionValue<string[]>;
  sandbox?: ExpressionValue<IframePermission[]>;
  allow?: ExpressionValue<IframePermission[]>;
  referrerPolicy?: ExpressionValue<
    "no-referrer" | "origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"
  >;
  loading?: ExpressionValue<"lazy" | "eager">;
  showLoading?: ExpressionValue<boolean>;
  timeout?: ExpressionValue<number>;
  showRefresh?: ExpressionValue<boolean>;
  showOpenInNewTab?: ExpressionValue<boolean>;
  showFullscreen?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  events?: EventItem<"onLoad" | "onTimeout">[];
}

export const iframePresets = {
  /** 全宽自适应高度内嵌页 */
  embeddedPage: (src: ExpressionValue<string>, height: string = "600px"): IframeProps => ({
    src,
    widthType: "fixed",
    width: "100%",
    heightType: "fixed",
    height,
    border: true,
    showLoading: true,
    showRefresh: true,
    showFullscreen: true,
  }),
};
