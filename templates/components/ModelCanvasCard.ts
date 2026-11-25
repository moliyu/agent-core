import type { ExpressionValue } from "./types.js";

/**
 * ModelCanvasCard 模型画布卡片模板组件
 *
 * @description
 * 自动创建 `header` 和 `body` 两个 Craft 内容区域，用于承载模型卡片标题与正文（源码: `component-schemas-v2/ModelCanvasCard/index.ts`）。
 */
export interface ModelCanvasCardProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}
