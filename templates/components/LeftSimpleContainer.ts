import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * LeftSimpleContainer 固定宽度左侧容器组件
 *
 * @description
 * 具有固定宽度配置的简单左侧容器，默认宽度 `120`（源码: `component-schemas-v2/LeftSimpleContainer/index.ts`）。
 */
export interface LeftSimpleContainerProps {
  width?: ExpressionValue<number>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
