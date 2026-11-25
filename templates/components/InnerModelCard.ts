import type { ExpressionValue } from "./types.js";

/**
 * InnerModelCard 内部模型卡片容器组件
 *
 * @description
 * 模型结果区域中的内部卡片容器（源码: `component-schemas-v2/InnerModelCard/index.ts`）。
 */
export interface InnerModelCardProps {
  width?: ExpressionValue<string>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}
