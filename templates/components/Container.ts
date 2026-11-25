import type { ExpressionValue, StyleProps, ClickEvent } from "./types.js";

/**
 * Container 独立背景图配置对象
 */
export interface ContainerBackgroundImage {
  /** 图片来源类型：fileId 需通过平台下载；url 直接使用外链地址，默认: "fileId" */
  sourceType: ExpressionValue<"fileId" | "url">;
  /** 文件 ID 或图片绝对 URL */
  value: ExpressionValue<string>;
  /** 背景尺寸缩放模式，默认: "cover" */
  size?: ExpressionValue<"cover" | "contain" | "auto" | "custom">;
  /** 当 size="custom" 时生效的 CSS background-size (如 "100% auto") */
  customSize?: ExpressionValue<string>;
  /** 背景定位，默认: "center center" */
  position?: ExpressionValue<
    | "left top"
    | "center top"
    | "right top"
    | "left center"
    | "center center"
    | "right center"
    | "left bottom"
    | "center bottom"
    | "right bottom"
    | "custom"
  >;
  /** 当 position="custom" 时生效的 CSS background-position */
  customPosition?: ExpressionValue<string>;
  /** 平铺模式，默认: "no-repeat" */
  repeat?: ExpressionValue<"no-repeat" | "repeat" | "repeat-x" | "repeat-y">;
}

/**
 * Container 基础布局容器组件
 *
 * @description
 * 组织页面骨架与子组件排版的 Canvas 容器组件，支持 Flexbox 排版、间距 (gap)、背景色及背景图片。
 *
 * @usageGuidelines
 * - 核心容器节点（Canvas），可以作为根节点或嵌套在其他 Container 中；
 * - 内部支持嵌套 Text、Button、Tag 及其他 Container；
 * - 常用作：水平工具栏 (flex row + space-between)、垂直卡片列表 (flex column)、居中内容块等；
 * - 子节点的增删改查应通过画布的 `edit_ui_tree` 工具完成，而不是写入 props 中。
 */
export interface ContainerProps {
  /** 渲染到 DOM 元素的 HTML id */
  htmlId?: ExpressionValue<string>;
  /** 编辑器持久化节点内部标识，原样保留 */
  id?: string;
  /** 布局模式，默认: "block"。常用设为 "flex" */
  display?: ExpressionValue<"block" | "inline" | "inline-block" | "flex">;
  /** Flex 主轴方向，默认: "row" */
  flexDirection?: ExpressionValue<"row" | "row-reverse" | "column" | "column-reverse">;
  /** Flex 主轴对齐方式，默认: "center" */
  flexJustifyContent?: ExpressionValue<
    "flex-start" | "center" | "flex-end" | "space-between" | "space-around"
  >;
  /** Flex 交叉轴对齐方式，默认: "center" */
  flexAlignItems?: ExpressionValue<
    "flex-start" | "center" | "flex-end" | "baseline"
  >;
  /** Flex 是否换行，默认: "nowrap" */
  flexWrap?: ExpressionValue<"nowrap" | "wrap" | "wrap-reverse">;
  /** 高度模式，默认: "auto" */
  heightType?: ExpressionValue<"auto" | "fixed">;
  /** 高度值（带单位，如 "300px" 或 "100%"） */
  height?: ExpressionValue<string>;
  /** 最小高度 */
  minHeight?: ExpressionValue<string>;
  /** 最大高度 */
  maxHeight?: ExpressionValue<string>;
  /** 宽度模式，默认: "auto" */
  widthType?: ExpressionValue<"auto" | "fixed">;
  /** 宽度值，默认: "100%" */
  width?: ExpressionValue<string>;
  /** 最小宽度 */
  minWidth?: ExpressionValue<string>;
  /** 最大宽度 */
  maxWidth?: ExpressionValue<string>;
  /** 背景颜色（如 "#ffffff" 或 "rgba(0,0,0,0.05)"） */
  backgroundColor?: ExpressionValue<string>;
  /** 独立背景图配置 */
  backgroundImage?: ExpressionValue<ContainerBackgroundImage>;
  /** Flex 放大缩小比例，默认: 1 */
  flexRatio?: ExpressionValue<number>;
  /** Flex 子元素间距，默认: "0"（例如: "8px", "16px"） */
  gap?: ExpressionValue<string>;
  /** CSS 可见性，默认: true */
  visible?: ExpressionValue<boolean>;
  /** 条件隐藏并卸载，默认: false */
  hidden?: ExpressionValue<boolean>;
  /** CSS 类名 */
  className?: ExpressionValue<string>;
  /** 额外 CSS 样式（内边距 padding、圆角 borderRadius、投影 boxShadow 等） */
  style?: ExpressionValue<StyleProps>;
  /** 点击事件回调列表 */
  events?: ClickEvent[];
}

/**
 * Container 高频布局推荐预设 (Presets)
 */
export const containerPresets = {
  /** 顶部水平工具栏 (两端对齐：左侧标题，右侧操作按钮) */
  headerToolbar: (): ContainerProps => ({
    display: "flex",
    flexDirection: "row",
    flexJustifyContent: "space-between",
    flexAlignItems: "center",
    width: "100%",
    gap: "12px",
    style: {
      padding: "16px 24px",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #f0f0f0",
    },
  }),

  /** 水平居左按钮/操作组 (间距 8px，不参与父级伸缩) */
  actionGroup: (gap: string = "8px"): ContainerProps => ({
    display: "flex",
    flexDirection: "row",
    flexJustifyContent: "flex-start",
    flexAlignItems: "center",
    flexRatio: 0,
    widthType: "auto",
    gap,
  }),

  /** 纵向内容列表/表单布局 (垂直排列，子组件默认撑满 100% 宽度，间距 16px) */
  verticalStack: (gap: string = "16px"): ContainerProps => ({
    display: "flex",
    flexDirection: "column",
    flexJustifyContent: "flex-start",
    flexAlignItems: "flex-start",
    width: "100%",
    gap,
    style: {
      alignItems: "stretch",
    },
  }),

  /** 居中展示卡片外壳 (白色背景、圆角、阴影) */
  cardBox: (padding: string = "20px"): ContainerProps => ({
    display: "flex",
    flexDirection: "column",
    flexJustifyContent: "flex-start",
    flexAlignItems: "flex-start",
    width: "100%",
    backgroundColor: "#ffffff",
    style: {
      padding,
      borderRadius: "8px",
      border: "1px solid #f0f0f0",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
      alignItems: "stretch",
    },
  }),

  /** 全居中空状态/内容展示容器 */
  centerBox: (): ContainerProps => ({
    display: "flex",
    flexDirection: "column",
    flexJustifyContent: "center",
    flexAlignItems: "center",
    width: "100%",
    gap: "12px",
    style: {
      padding: "32px",
    },
  }),
};
