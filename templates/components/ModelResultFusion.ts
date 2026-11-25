import type { EventItem, ExpressionValue } from "./types.js";

/**
 * ModelResultFusion 多模型结果融合组件
 *
 * @description
 * 融合多个模型结果并展示模型卡片与融合计算区域；非空 `alias` 发布 `getModelList()`、`getNodeList()` 与 `updateNodeById(id, item)`（源码: `component-schemas-v2/ModelResultFusion/index.ts`）。
 */
export interface ModelResultFusionProps {
  alias?: string;
  itemKey?: string;
  modelList?: Array<Record<string, unknown>>;
  nodeList?: Array<Record<string, unknown>>;
  events?: EventItem[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}
