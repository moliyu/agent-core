import type { ExpressionValue, StyleProps, EventItem } from "./types.js";

/**
 * Card 卡片容器组件
 *
 * @description
 * 承载具有卡片边界的独立内容或操作区域，支持折叠与懒加载
 * （源码: `component-schemas-v2/Card/index.ts`）。
 *
 * @usageGuidelines
 * 1. **自动生成子树**：插入 `Card` 后会自动生成「标题」「描述」「操作」「内容」「底部」5 个区域容器及默认子节点；修改它们时请先 `inspect_ui_tree` 获取真实子节点 ID 后再更新；
 * 2. **上下文发布**：`data` 发布为 `context[alias].cardData` 与局部 `context.cardData`；
 * 3. **折叠事件**：`onCollapse` 的 `params` 为 `[cardData, done]`，回调内**必须调用** `done(false)`（展开）或 `done(true)`（保持折叠）。
 */
export interface CardProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 绑定到卡片的上下文数据对象 */
  data?: ExpressionValue<Record<string, unknown>>;
  /** Page Context 别名（暴露 `{ cardData, cardExpanded }`） */
  alias?: ExpressionValue<string>;
  /** 是否显示标题区域，默认: true */
  displayTitle?: ExpressionValue<boolean>;
  /** 是否显示底部区域，默认: true */
  displayFooter?: ExpressionValue<boolean>;
  /** 鼠标移过时是否可浮起，默认: false */
  hoverable?: ExpressionValue<boolean>;
  /** 是否支持折叠展开，默认: false */
  collapsible?: ExpressionValue<boolean>;
  /** 默认是否折叠，默认: false */
  defaultCollapsed?: ExpressionValue<boolean>;
  /** 是否显示折叠图标，默认: true */
  displayCollapseIcon?: ExpressionValue<boolean>;
  /** 折叠时是否仍显示底部区域，默认: false */
  showFooterWhenCollapsed?: ExpressionValue<boolean>;
  /** 展开时是否启用懒加载状态，默认: false */
  lazyLoad?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  /** 折叠展开事件（trigger: `"onCollapse"`） */
  events?: EventItem<"onCollapse">[];
}

export const cardPresets = {
  /** 标准悬浮信息卡片 */
  standard: (alias: string = "", hoverable: boolean = false): CardProps => ({
    alias,
    displayTitle: true,
    displayFooter: false,
    hoverable,
    collapsible: false,
  }),
};
