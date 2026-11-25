import type { ExpressionValue } from "./types.js";

/**
 * StreamContentRender 流式内容渲染组件
 *
 * @description
 * 渲染 AI/SSE 流式文本内容，支持自动识别 Markdown、代码块行号、JSON 格式化折叠与一键复制（源码: `component-schemas-v2/StreamContentRender/index.ts`）。
 */
export interface StreamContentRenderProps {
  /** 页面上下文键名，运行时从中读取当前流式字符串 */
  alias?: string;
  mode?: ExpressionValue<"auto" | "markdown" | "text">;
  fallback?: ExpressionValue<"markdown" | "text" | "raw">;
  copy?: ExpressionValue<boolean>;
  linenumber?: ExpressionValue<boolean>;
  identifyCodeBlock?: ExpressionValue<boolean>;
  identifyJsonBlock?: ExpressionValue<boolean>;
  jsonFormat?: ExpressionValue<boolean>;
  jsonCollapse?: ExpressionValue<boolean>;
  autoScroll?: ExpressionValue<boolean>;
  printEffect?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}

export const streamContentRenderPresets = {
  /** AI 流式 Markdown 输出区 */
  aiOutput: (alias: string): StreamContentRenderProps => ({
    alias,
    mode: "auto",
    copy: true,
    identifyCodeBlock: true,
    identifyJsonBlock: true,
    autoScroll: true,
    printEffect: true,
  }),
};
