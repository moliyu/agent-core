import type { ExpressionValue } from "./types.js";

/**
 * ModelListItemCard 模型列表项卡片模板组件
 *
 * @description
 * 模型列表项的标题和正文卡片模板（自动创建 `header` 与 `body` 内容区域）（源码: `component-schemas-v2/ModelListItemCard/index.ts`）。
 */
export interface ModelListItemCardProps {
  header?: ExpressionValue<string>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}
