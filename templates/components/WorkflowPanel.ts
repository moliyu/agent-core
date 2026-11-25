import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * WorkflowPanel 工作流侧栏容器组件
 *
 * @description
 * `WorkFlow` 的侧栏 Canvas 子容器，内部通过真实 Craft 子节点配置侧栏内容（源码: `component-schemas-v2/WorkflowPanel/index.ts`）。
 */
export interface WorkflowPanelProps {
  width?: ExpressionValue<number>;
  minHeight?: ExpressionValue<number>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const workflowPanelPresets = {
  /** 默认左侧边栏 */
  leftSidebar: (width: number = 180): WorkflowPanelProps => ({
    width,
    minHeight: 240,
    style: { position: "absolute", left: 0, top: 0 },
  }),
};
