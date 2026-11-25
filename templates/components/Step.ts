import type { ExpressionValue, MessageValue, StyleProps } from "./types.js";

/** Step 单个步骤配置 */
export interface StepItem {
  /** 稳定标识，运行时用于去重 */
  key?: string;
  /** 步骤标题 */
  title?: MessageValue;
  /** 副标题 */
  subTitle?: MessageValue;
  /** 图标名称 */
  icon?: string;
  /** 描述信息 */
  description?: MessageValue;
  /** 是否禁用 */
  disabled?: ExpressionValue<boolean>;
}

/**
 * Step 阶段进度条组件（纯展示/导航，无槽位容器）
 *
 * @description
 * 按顺序展示业务流程中的阶段和当前步骤（源码: `component-schemas-v2/Step/index.ts`）。
 * 注意与 `StepPlus` 区分：`Step` 是纯阶段进度条（常配合 `ServiceData` 动态绑定 `stepItems`）；
 * 若需要每个步骤下挂载独立内容面板，应使用 `StepPlus`。
 *
 * @usageGuidelines
 * - 非空 `alias` 会向页面上下文暴露 `current`、`previous()`、`next()`、`setPosition(index)` 操作；
 * - 详情页顶部阶段条常设置 `labelPlacement: "vertical"` 与 `isPercent: true`。
 */
export interface StepProps {
  /** 非空 alias 发布步骤控制 API 到页面上下文 */
  alias?: string;
  /** 步骤项列表（支持静态数组或 JSExpression 动态绑定上下文阶段列表） */
  stepItems?: ExpressionValue<StepItem[]>;
  /** 尺寸，默认: "default" */
  size?: ExpressionValue<"default" | "small">;
  /** 排列方向，默认: "horizontal" */
  direction?: ExpressionValue<"horizontal" | "vertical">;
  /** 标签放置位置，默认: "horizontal" */
  labelPlacement?: ExpressionValue<"horizontal" | "vertical">;
  /** 是否显示进度百分比环，默认: false */
  isPercent?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const stepPresets = {
  /** 详情页顶部阶段进度条 */
  stageProgress: (
    stepItems: StepItem[],
    alias: string = "stageStep"
  ): StepProps => ({
    alias,
    stepItems,
    size: "default",
    direction: "horizontal",
    labelPlacement: "vertical",
    isPercent: true,
  }),
};
