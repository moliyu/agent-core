import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/**
 * ApprovalFlow 审批流容器组件
 *
 * @description
 * 展示并处理审批流程及其审批状态和相关操作；新增后会自动生成 `ApprovalFlowContent` Canvas 子节点承载审批表单内容，需先读取实时树获取真实 ID 后再放入内容（源码: `component-schemas-v2/ApprovalFlow/index.ts`）。
 */
export interface ApprovalFlowProps {
  /** 页面上下文别名，默认空时使用 `"approvalFlow"` */
  alias?: string;
  approvalFlowId?: string;
  dataInstanceId?: string;
  flowInstanceId?: string;
  stepInstanceId?: string;
  events?: EventItem[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const approvalFlowPresets = {
  /** 标准审批流外壳 */
  basic: (alias: string = "approvalFlow"): ApprovalFlowProps => ({
    alias,
  }),
};
