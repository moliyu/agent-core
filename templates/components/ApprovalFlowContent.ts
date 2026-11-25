import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * ApprovalFlowContent 审批流内容区域组件
 *
 * @description
 * 审批流程中承载表单或自定义内容的 Canvas 区域（源码: `component-schemas-v2/ApprovalFlowContent/index.ts`）。
 */
export interface ApprovalFlowContentProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
