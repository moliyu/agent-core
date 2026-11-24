import type { MessageValue, ExpressionValue, StyleProps, ClickEvent } from "./types.js";

/**
 * Button 交互按钮组件
 *
 * @description
 * 提供可点击的交互按钮，用于触发页面操作、模态框打开、页面跳转或带确认的动作。
 *
 * @usageGuidelines
 * - 纯叶子交互节点，不支持在按钮内部拖入子组件；
 * - 常用放置在顶部操作栏、卡片右上角、表格操作列或页面底部；
 * - 触发重要或不可逆操作（如删除、清空、重置）时，强烈建议开启 `confirmType: "popConfirm"` 提升用户体验；
 * - 点击事件写入 `events` 中（trigger 为 `"onClick"`，代码通过 300ms 防抖并异步等待执行）。
 */
export interface ButtonProps {
  /** 按钮文案，默认: "Button" */
  label?: MessageValue<string>;
  /** 加载反馈形式，默认: "none" */
  loadingMode?: "none" | "button" | "page";
  /** 颜色主题，默认: "primary" */
  theme?: ExpressionValue<
    "primary" | "green" | "cyan" | "volcano" | "danger" | "default"
  >;
  /** 视觉变体形态，默认: "solid" */
  variant?: ExpressionValue<
    "solid" | "filled" | "outlined" | "dashed" | "link" | "text"
  >;
  /** 按钮形状，默认: "default" */
  shape?: ExpressionValue<"default" | "circle" | "round">;
  /** 按钮尺寸，默认: "middle" */
  size?: ExpressionValue<"large" | "middle" | "small">;
  /** 按钮交互行为模式，默认: "button" */
  buttonBehavior?: ExpressionValue<"button" | "submit" | "reset">;
  /** 关联的表单 Context 别名，非表单场景保持空字符串 */
  formAlias?: ExpressionValue<string>;
  /** 图标名称，必须来自图标库名称 */
  iconName?: ExpressionValue<string>;
  /** 图标相对文字的位置，默认: "end" */
  iconPosition?: ExpressionValue<"start" | "end">;
  /** 跳转链接地址（variant 为 "link" 时可搭配使用） */
  href?: ExpressionValue<string>;
  /** 鼠标悬浮气泡提示文本 */
  title?: MessageValue<string>;
  /** 自定义背景色（可选，覆盖主题色） */
  backgroundColor?: ExpressionValue<string>;
  /** 点击前确认方式，默认: "none" */
  confirmType?: ExpressionValue<"none" | "modal" | "popConfirm">;
  /** 二次确认提示标题 */
  confirmTitle?: MessageValue<string>;
  /** 二次确认正文内容 */
  confirmContent?: MessageValue<string>;
  /** 气泡确认框弹出方向，默认: "bottomLeft" */
  confirmPlacement?: ExpressionValue<
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "leftTop"
    | "leftBottom"
    | "rightTop"
    | "rightBottom"
  >;
  /** CSS 可见性，默认: true */
  visible?: ExpressionValue<boolean>;
  /** 条件隐藏并卸载，默认: false */
  hidden?: ExpressionValue<boolean>;
  /** 是否禁用按钮，默认: false */
  disabled?: ExpressionValue<boolean>;
  /** CSS 类名 */
  className?: ExpressionValue<string>;
  /** 自定义外层样式 */
  style?: ExpressionValue<StyleProps>;
  /** 点击事件回调列表 */
  events?: ClickEvent[];
}

/**
 * Button 高频业务推荐预设 (Presets)
 */
export const buttonPresets = {
  /** 主操作按钮 (深蓝色实体背景，用于新建、保存、主行动) */
  primaryAction: (label: string = "新建", onClickCode?: string): ButtonProps => ({
    label,
    theme: "primary",
    variant: "solid",
    events: onClickCode ? [{ trigger: "onClick", code: onClickCode }] : undefined,
  }),

  /** 次要操作按钮 (线框描边，用于取消、导出、返回) */
  secondaryAction: (label: string = "取消", onClickCode?: string): ButtonProps => ({
    label,
    theme: "default",
    variant: "outlined",
    events: onClickCode ? [{ trigger: "onClick", code: onClickCode }] : undefined,
  }),

  /** 危险删除按钮 (带 PopConfirm 确认气泡，防止用户误触) */
  dangerDelete: (
    label: string = "删除",
    confirmMsg: string = "确定要删除该项吗？此操作不可恢复。",
    onClickCode?: string
  ): ButtonProps => ({
    label,
    theme: "danger",
    variant: "solid",
    confirmType: "popConfirm",
    confirmTitle: confirmMsg,
    confirmPlacement: "top",
    events: onClickCode ? [{ trigger: "onClick", code: onClickCode }] : undefined,
  }),

  /** 纯文本/链接型按钮 (用于行内操作、查看详情) */
  textLink: (label: string = "查看详情", onClickCode?: string): ButtonProps => ({
    label,
    theme: "primary",
    variant: "link",
    events: onClickCode ? [{ trigger: "onClick", code: onClickCode }] : undefined,
  }),

  /** 圆角胶囊操作按钮 */
  roundAction: (label: string, onClickCode?: string): ButtonProps => ({
    label,
    theme: "primary",
    shape: "round",
    events: onClickCode ? [{ trigger: "onClick", code: onClickCode }] : undefined,
  }),
};
