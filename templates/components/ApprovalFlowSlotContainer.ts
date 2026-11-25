import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * ApprovalFlowSlotContainer 审批流槽位容器组件
 *
 * @description
 * 审批流程中承载指定槽位或字段内容的容器（源码: `component-schemas-v2/ApprovalFlowSlotContainer/index.ts`）。
 */
export interface ApprovalFlowSlotContainerProps {
  slotConfig?: ExpressionValue<string>;
  areaCode?: ExpressionValue<string>;
  fieldName?: ExpressionValue<string>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
