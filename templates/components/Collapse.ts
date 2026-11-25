import type { ExpressionValue, MessageValue, StyleProps } from "./types.js";

/** Collapse 折叠面板项 */
export interface CollapseItem {
  /** 面板唯一标识，重复或空 key 会在运行时被过滤 */
  key: ExpressionValue<string>;
  /** 面板标题 */
  label: MessageValue;
}

/** Collapse 事件配置 */
export interface CollapseEvent {
  trigger: "onChange";
  /** 参数: `[{ key: string | string[], setData(data): void }]` */
  code: string;
}

/**
 * Collapse 折叠面板容器组件
 *
 * @description
 * 将相关内容组织为可展开和收起的面板（源码: `component-schemas-v2/Collapse/index.ts`）。
 *
 * @usageGuidelines
 * - 每个保留的 `collapseItem` 在运行时对应一个 `Container` Linked Node（slot 名为数组索引 `"0"`, `"1"...`）；
 * - 面板内容必须放入对应 Linked Node 物理节点 ID 下，不要写进 `collapseItem` JSON；
 * - 常见于详情页多区块表单分组（如“基本信息”、“跟进人信息”）。
 */
export interface CollapseProps {
  /** 非空 alias 会向页面上下文发布 `expand()` 与 `collapse()` 方法 */
  alias?: ExpressionValue<string>;
  /** 折叠面板项列表 */
  collapseItem?: ExpressionValue<CollapseItem[]>;
  /** 默认展开的面板 key 列表 */
  defaultActiveKey?: ExpressionValue<string[]>;
  /** 尺寸，默认: "middle" */
  size?: ExpressionValue<"large" | "middle" | "small">;
  /** 是否手风琴模式（每次仅展开一项），默认: false */
  accordion?: ExpressionValue<boolean>;
  /** 是否带边框，默认: true */
  bordered?: ExpressionValue<boolean>;
  /** 是否透明无背景，默认: false */
  ghost?: ExpressionValue<boolean>;
  /** 自定义展开图标名 */
  expandIconName?: ExpressionValue<string>;
  /** 展开图标位置，默认: "end" */
  expandIconPosition?: ExpressionValue<"start" | "end">;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  headerStyle?: ExpressionValue<StyleProps>;
  bodyStyle?: ExpressionValue<StyleProps>;
  events?: CollapseEvent[];
}

export const collapsePresets = {
  /** 详情页多区块默认全部展开折叠面板 */
  detailSections: (
    items: Array<{ key: string; label: string }>,
    alias: string = ""
  ): CollapseProps => ({
    alias,
    collapseItem: items,
    defaultActiveKey: items.map((item) => item.key),
    size: "middle",
    bordered: true,
    accordion: false,
    expandIconPosition: "end",
  }),

  /** 手风琴模式折叠面板 */
  accordion: (
    items: Array<{ key: string; label: string }>,
    defaultKey?: string
  ): CollapseProps => ({
    collapseItem: items,
    defaultActiveKey: defaultKey ? [defaultKey] : items[0] ? [items[0].key] : [],
    accordion: true,
    bordered: true,
  }),
};
