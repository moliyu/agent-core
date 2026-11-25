import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * DetailsPageContainerContent 详情页主体内容容器组件
 *
 * @description
 * `DetailsPageContainer` 详情页的主体内容区域（源码: `component-schemas-v2/DetailsPageContainerContent/index.ts`）。
 */
export interface DetailsPageContainerContentProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
