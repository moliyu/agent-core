import type { MessageValue, ExpressionValue, StyleProps } from "./types.js";

/** StepPlus 单个步骤项配置 */
export interface StepPlusItem {
  /** 业务侧步骤标识（注意运行时槽位仍按数组索引对应 `linkedNodes`） */
  key?: string;
  /** 步骤标题 */
  title?: MessageValue<string>;
  /** 步骤描述 */
  description?: MessageValue<string>;
  /** 是否禁用点击该步骤，默认: false */
  disabled?: ExpressionValue<boolean>;
  /** 副标题 */
  subTitle?: MessageValue<string>;
  /** 图标库中的图标名称 */
  icon?: string;
}

/**
 * StepPlus 步骤条容器组件
 *
 * @description
 * 按顺序展示带状态或分步内容区域的流程步骤（源码: `component-schemas-v2/StepPlus/index.ts`）。
 *
 * @usageGuidelines
 * 1. **Page Context 能力**：配置非空 `alias` 后，可访问 `current` 以及 `previous()`、`next()`、`setPosition(index)`；
 * 2. **槽位结构**：每个 `stepItems` 项在画布中对应一个按索引关联的 `Container` Linked Node，步骤内部组件放在对应 Linked Node 下。
 */
export interface StepPlusProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** Page Context 别名（暴露 `current`、`previous()`、`next()`、`setPosition(index)`） */
  alias?: string;
  /** 步骤条风格，默认: "default" */
  type?: ExpressionValue<"default" | "panel">;
  /** 步骤项配置列表 */
  stepItems?: ExpressionValue<StepPlusItem[]>;
  /** 尺寸，默认: "default" */
  size?: ExpressionValue<"default" | "small">;
  /** 排列方向，默认: "horizontal" */
  direction?: ExpressionValue<"horizontal" | "vertical">;
  /** 标签位置，默认: "horizontal" */
  labelPlacement?: ExpressionValue<"horizontal" | "vertical">;
  /** 是否允许点击步骤头切换，默认: true */
  enableClick?: ExpressionValue<boolean>;
  /** 是否在编辑器中隐藏步骤内容区，默认: false */
  hiddenContent?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  contentClassName?: ExpressionValue<string>;
  contentStyle?: ExpressionValue<StyleProps>;
}

export const stepPlusPresets = {
  /** 标准三步横向流程 */
  threeSteps: (alias: string, titles: [string, string, string]): StepPlusProps => ({
    alias,
    type: "default",
    size: "small",
    direction: "horizontal",
    enableClick: true,
    stepItems: titles.map((title, idx) => ({
      key: `step_${idx + 1}`,
      title,
      disabled: false,
    })),
  }),
};
