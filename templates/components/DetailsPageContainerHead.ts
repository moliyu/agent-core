import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * DetailsPageContainerHead 详情页头部容器组件
 *
 * @description
 * `DetailsPageContainer` 详情页头部的内容和导航区域（源码: `component-schemas-v2/DetailsPageContainerHead/index.ts`）。
 */
export interface DetailsPageContainerHeadProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
