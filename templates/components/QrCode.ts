import type { EventItem, ExpressionValue } from "./types.js";

/**
 * QrCode 二维码组件
 *
 * @description
 * 将指定文本或链接渲染为可配置的二维码，支持中心图标、状态遮罩与通过 `alias` 暴露 `download(filename?)`（源码: `component-schemas-v2/QrCode/index.ts`）。
 */
export interface QrCodeProps {
  /** 非空 alias 暴露运行时 `download(filename?)` 方法到页面上下文 */
  alias?: string;
  /** 二维码内容 */
  value?: ExpressionValue<string>;
  size?: ExpressionValue<number>;
  color?: ExpressionValue<string>;
  bgColor?: ExpressionValue<string>;
  bordered?: ExpressionValue<boolean>;
  errorLevel?: ExpressionValue<"L" | "M" | "Q" | "H">;
  status?: ExpressionValue<"active" | "expired" | "loading" | "scanned">;
  icon?: ExpressionValue<string>;
  iconSize?: ExpressionValue<number>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  events?: EventItem<"onRefresh">[];
}

export const qrCodePresets = {
  /** 标准链接二维码 */
  link: (value: ExpressionValue<string>, size: number = 160, alias: string = ""): QrCodeProps => ({
    alias,
    value,
    size,
    bordered: true,
    errorLevel: "M",
    status: "active",
  }),
};
