import type { MessageValue, ExpressionValue, StyleProps, ClickEvent } from "./types.js";

/**
 * Text 文本展示组件
 *
 * @description
 * 展示静态文本或基于表达式的动态文本。
 *
 * @usageGuidelines
 * - 用于页面标题、卡片副标题、描述段落、数据项旁的小字提示等；
 * - 纯叶子展示节点，不支持嵌套任何子组件；
 * - 纯文本内容，不解析 HTML 标签（如需渲染富文本或 HTML 请勿使用 Text）；
 * - 字号、颜色、对齐等视觉属性请直接在 `style` 字典中配置（如 `{ color: "#1677ff", fontSize: "16px", fontWeight: "bold" }`）。
 */
export interface TextProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 纯文本内容，支持纯字符串、表达式或国际化资源，默认: "text" */
  text?: MessageValue<string>;
  /** CSS 可见性，默认: true */
  visible?: ExpressionValue<boolean>;
  /** 条件隐藏并从 DOM 中卸载，默认: false */
  hidden?: ExpressionValue<boolean>;
  /** 内层文本 span 类名 */
  className?: ExpressionValue<string>;
  /** 外层容器类名 */
  outerClassName?: ExpressionValue<string>;
  /** CSS 样式配置（字号、颜色、字重、对齐、外边距等均在此设置） */
  style?: ExpressionValue<StyleProps>;
  /** 点击事件回调列表 */
  events?: ClickEvent[];
}

/**
 * Text 高频业务推荐预设 (Presets)
 */
export const textPresets = {
  /** 页面一级主标题 (20px, 加粗, 深色) */
  pageTitle: (title: string): TextProps => ({
    text: title,
    style: {
      fontSize: "20px",
      fontWeight: 600,
      color: "#1f2328",
      lineHeight: "28px",
    },
  }),

  /** 模块/卡片二级标题 (16px, 中等字重) */
  sectionTitle: (title: string): TextProps => ({
    text: title,
    style: {
      fontSize: "16px",
      fontWeight: 500,
      color: "#1f2328",
      lineHeight: "24px",
    },
  }),

  /** 正文常规文本 (14px, 常规灰黑色) */
  body: (text: string): TextProps => ({
    text,
    style: {
      fontSize: "14px",
      color: "#333333",
      lineHeight: "22px",
    },
  }),

  /** 弱化说明/副标题提示文本 (12px, 浅灰色) */
  secondary: (text: string): TextProps => ({
    text,
    style: {
      fontSize: "12px",
      color: "#8c8c8c",
      lineHeight: "20px",
    },
  }),

  /** 错误/警告突出文本 (红色) */
  danger: (text: string): TextProps => ({
    text,
    style: {
      fontSize: "14px",
      color: "#ff4d4f",
      lineHeight: "22px",
    },
  }),
};
