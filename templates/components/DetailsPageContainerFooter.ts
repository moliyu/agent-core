import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * DetailsPageContainerFooter 详情页底部容器组件
 *
 * @description
 * `DetailsPageContainer` 详情页底部的内容和操作区域（源码: `component-schemas-v2/DetailsPageContainerFooter/index.ts`）。
 */
export interface DetailsPageContainerFooterProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
