import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * RightSimpleContainer 右侧容器组件
 *
 * @description
 * 具有固定宽度配置的简单右侧容器（源码: `component-schemas-v2/RightSimpleContainer/index.ts`）。
 */
export interface RightSimpleContainerProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
