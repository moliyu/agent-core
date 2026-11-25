import type { ExpressionValue } from "./types.js";

/**
 * FusionPage 融合页面容器组件
 *
 * @description
 * 融合页面的模型卡片和底部自定义内容区域容器（源码: `component-schemas-v2/FusionPage/index.ts`）。
 */
export interface FusionPageProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}
