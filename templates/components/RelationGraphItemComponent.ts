import type { ExpressionValue } from "./types.js";

/**
 * RelationGraphItemComponent 关系图节点模板组件
 *
 * @description
 * `RelationGraph` 内部单个节点的展示模板配置（源码: `component-schemas-v2/RelationGraphItemComponent/index.ts`）。
 */
export interface RelationGraphItemComponentProps {
  itemLabel?: unknown;
  itemColor?: ExpressionValue<string>;
  itemType?: ExpressionValue<string>;
  iconName?: ExpressionValue<string>;
  iconColor?: ExpressionValue<string>;
  itemSize?: ExpressionValue<number>;
  iconSize?: ExpressionValue<number>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}
