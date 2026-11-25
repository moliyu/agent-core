import type { ExpressionValue, JSFunction, MessageValue, StyleProps } from "./types.js";

/** 工作流节点连接规则 */
export interface WorkflowNodeRule {
  ruleType?: "no-self-loop" | "no-duplicate-edge" | "max-incoming" | "max-outgoing" | "max-instances" | "custom";
  message?: MessageValue<ExpressionValue<string>>;
  maxConnections?: ExpressionValue<number>;
  maxInstances?: ExpressionValue<number>;
  direction?: "source" | "target";
  /** `(params) => boolean` */
  validate?: JSFunction;
}

/**
 * WorkflowBuiltinNode 工作流内置图标节点定义组件
 *
 * @description
 * 定义可拖入 `WorkFlow` 画布的内置图标节点及其连接规则（源码: `component-schemas-v2/WorkflowBuiltinNode/index.ts`）。
 */
export interface WorkflowBuiltinNodeProps {
  definitionKey?: ExpressionValue<string>;
  panelLabel?: ExpressionValue<string>;
  type?: ExpressionValue<"icon" | "custom">;
  maskType?: ExpressionValue<"circle" | "rect" | "diamond">;
  iconName?: ExpressionValue<string>;
  text?: ExpressionValue<string>;
  stroke?: ExpressionValue<string>;
  fill?: ExpressionValue<string>;
  size?: ExpressionValue<number>;
  data?: ExpressionValue<Record<string, unknown>>;
  rules?: WorkflowNodeRule[];
  enabled?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
