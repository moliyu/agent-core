import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * RecursiveContainerSlot 递归容器插槽组件
 *
 * @description
 * `RecursiveContainerTemplate` 中承载自定义内容的槽位区域（源码: `component-schemas-v2/RecursiveContainerSlot/index.ts`）。
 */
export interface RecursiveContainerSlotProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
