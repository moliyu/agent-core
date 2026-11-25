import type { ExpressionValue, StyleProps } from "./types.js";
import type { WorkflowNodeRule } from "./WorkflowBuiltinNode.js";

/**
 * WorkflowReactNode 工作流自定义节点定义组件
 *
 * @description
 * 定义使用 Craft 模板内容渲染的可拖入 `WorkFlow` 自定义节点（源码: `component-schemas-v2/WorkflowReactNode/index.ts`）。
 */
export interface WorkflowReactNodeProps {
  definitionKey?: ExpressionValue<string>;
  panelLabel?: ExpressionValue<string>;
  width?: ExpressionValue<number>;
  height?: ExpressionValue<number>;
  data?: ExpressionValue<Record<string, unknown>>;
  rules?: WorkflowNodeRule[];
  enabled?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
