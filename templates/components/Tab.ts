import type { MessageValue, ExpressionValue, StyleProps } from "./types.js";

/** Tab 单个标签页配置 */
export interface TabItemConfig {
  /** 标签页唯一标识（不能为空或重复） */
  key?: ExpressionValue<string>;
  /** 标签页标题 */
  label?: MessageValue<string>;
  /** 是否隐藏该标签页，默认: false */
  hidden?: ExpressionValue<boolean>;
  /** 是否禁用该标签页，默认: false */
  disabled?: ExpressionValue<boolean>;
  /** 标签页图标名称 */
  icon?: ExpressionValue<string>;
  className?: ExpressionValue<string>;
  tabHeadStyle?: StyleProps;
}

/**
 * Tab 标签页容器组件
 *
 * @description
 * 将多个内容区域组织为可切换的标签页（源码: `component-schemas-v2/Tab/index.ts`）。
 *
 * @usageGuidelines
 * 1. **Page Context 能力**：配置非空 `alias` 后，可通过 `context[alias].getCurrentActiveKey()` 读取当前激活 Tab；
 * 2. **槽位结构**：`tabItem` 中每个非空唯一项在画布中对应一个 `Container` Linked Node；向标签页内添加内容时，先读取 `linkedNodeIds` 再往对应 `Container` 插入子组件。
 */
export interface TabProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** Page Context 别名 */
  alias?: ExpressionValue<string>;
  /** 标签页定义列表 */
  tabItem?: TabItemConfig[];
  /** 默认激活的标签页 key */
  defaultTabActiveKey?: ExpressionValue<string>;
  /** 尺寸，默认: "middle" */
  size?: ExpressionValue<"large" | "middle" | "small">;
  /** 页签基本样式，默认: "card" */
  tabType?: ExpressionValue<"line" | "card">;
  /** 页签位置，默认: "top" */
  tabPosition?: ExpressionValue<"top" | "right" | "bottom" | "left">;
  /** 标签是否居中，默认: false */
  centered?: ExpressionValue<boolean>;
  /** 是否开启切换动画，默认: true */
  animated?: ExpressionValue<boolean>;
  /** 页签之间的间隙（px），默认: 0 */
  tabBarGutterWidth?: ExpressionValue<number>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  tabBarStyle?: StyleProps;
}

export const tabPresets = {
  /** 标准线条型双标签页 */
  lineTabs: (alias: string, tabs: Array<{ key: string; label: string }>): TabProps => ({
    alias,
    tabType: "line",
    size: "middle",
    defaultTabActiveKey: tabs[0]?.key || "",
    tabItem: tabs.map((t) => ({
      key: t.key,
      label: t.label,
      hidden: false,
      disabled: false,
      icon: "",
      className: "",
    })),
  }),
};
