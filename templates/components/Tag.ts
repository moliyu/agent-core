import type { MessageValue, ExpressionValue, StyleProps, ClickEvent } from "./types.js";

/**
 * Tag 标签状态组件
 *
 * @description
 * 用于展示简短的状态标记、分类徽章或属性标签。
 *
 * @usageGuidelines
 * - 用于表格状态列、卡片右上角状态标识、用户角色标签等；
 * - 纯叶子节点，不支持子组件；
 * - 标签内容 `content` 支持受信任的 HTML 字符串；
 * - `tagColor` 支持 Ant Design 语义色（如 "success", "processing", "error", "warning", "default"）或自定义 Hex 色值（如 "#108ee9"）。
 */
export interface TagProps {
  /** 标签文本或 HTML 内容，默认: "Tag Content" */
  content?: MessageValue<string>;
  /** 标签颜色，可选语义名或 16 进制颜色。空字符串表示默认主题灰 */
  tagColor?: ExpressionValue<
    | "success"
    | "processing"
    | "error"
    | "warning"
    | "default"
    | (string & {})
  >;
  /** 是否显示外边框，默认: false */
  isBorder?: ExpressionValue<boolean>;
  /** 是否显示关闭小图标，默认: false */
  isCloseIcon?: ExpressionValue<boolean>;
  /** 关闭图标点击回调代码（当 isCloseIcon 为 true 时生效） */
  onClose?: ExpressionValue<string | false>;
  /** CSS 可见性，默认: true */
  visible?: ExpressionValue<boolean>;
  /** 条件隐藏并卸载，默认: false */
  hidden?: ExpressionValue<boolean>;
  /** 类名 */
  className?: ExpressionValue<string>;
  /** 自定义样式 */
  style?: ExpressionValue<StyleProps>;
  /** 点击事件回调列表 */
  events?: ClickEvent[];
}

/**
 * Tag 高频业务状态推荐预设 (Presets)
 */
export const tagPresets = {
  /** 成功/已完成状态标签 (绿色) */
  success: (label: string = "已完成"): TagProps => ({
    content: label,
    tagColor: "success",
    isBorder: true,
  }),

  /** 进行中/处理中状态标签 (蓝色) */
  processing: (label: string = "进行中"): TagProps => ({
    content: label,
    tagColor: "processing",
    isBorder: true,
  }),

  /** 警告/待审核状态标签 (橙黄色) */
  warning: (label: string = "待审核"): TagProps => ({
    content: label,
    tagColor: "warning",
    isBorder: true,
  }),

  /** 失败/异常/已驳回状态标签 (红色) */
  error: (label: string = "已失败"): TagProps => ({
    content: label,
    tagColor: "error",
    isBorder: true,
  }),

  /** 普通未激活/已归档中性标签 (灰色) */
  neutral: (label: string = "未开始"): TagProps => ({
    content: label,
    tagColor: "default",
    isBorder: true,
  }),

  /** 可手动关闭的筛选条件/分类胶囊标签 */
  closable: (label: string, onCloseCode?: string): TagProps => ({
    content: label,
    tagColor: "default",
    isBorder: true,
    isCloseIcon: true,
    onClose: onCloseCode || false,
  }),
};
