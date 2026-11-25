import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * LeftFillContainer 左侧填充容器组件
 *
 * @description
 * 填充布局左侧可用空间的容器（源码: `component-schemas-v2/LeftFillContainer/index.ts`）。
 */
export interface LeftFillContainerProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
