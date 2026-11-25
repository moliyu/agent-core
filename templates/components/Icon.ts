import type { ExpressionValue, StyleProps, EventItem } from "./types.js";

/**
 * Icon 图标组件
 *
 * @description
 * 展示语义图标或图标化操作入口（源码: `component-schemas-v2/Icon/index.ts`）。
 *
 * @usageGuidelines
 * - 纯叶子节点，不可包含子组件；
 * - PrimeIcons 使用 `"pi.pi-<name>"`（如 `"pi.pi-search"`），Ant Design Icons 使用 `"antd.<name>"`（如 `"antd.FileTextOutlined"`）。
 */
export interface IconProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 图标名称（如 `"pi.pi-search"` 或 `"antd.FileTextOutlined"`），默认: "pi.pi-search" */
  iconName?: ExpressionValue<string>;
  /** 图标颜色（CSS 颜色值） */
  iconColor?: ExpressionValue<string>;
  /** 图标尺寸（px，范围 0..500），默认: 16 */
  iconSize?: ExpressionValue<number>;
  /** CSS 可见性，默认: true */
  visible?: ExpressionValue<boolean>;
  /** 条件隐藏并卸载，默认: false */
  hidden?: ExpressionValue<boolean>;
  /** 自定义样式 */
  style?: ExpressionValue<StyleProps>;
  /** 点击事件列表（trigger: `"onClick"`） */
  events?: EventItem<"onClick">[];
}

export const iconPresets = {
  /** 常规 16px 图标 */
  standard: (iconName: string, iconColor?: string, iconSize: number = 16): IconProps => ({
    iconName,
    ...(iconColor ? { iconColor } : {}),
    iconSize,
  }),
};
