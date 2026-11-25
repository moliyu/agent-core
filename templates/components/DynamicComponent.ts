import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * DynamicComponent 动态远程组件
 *
 * @description
 * 根据 `componentName` 动态加载并展开远程序列化组件及其子树；修改内部动态节点前需先读取实时页面树获取真实 `node_id`（源码: `component-schemas-v2/DynamicComponent/index.ts`）。
 */
export interface DynamicComponentProps {
  /** 远程组件名称 */
  componentName?: string;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  style?: ExpressionValue<StyleProps>;
}

export const dynamicComponentPresets = {
  /** 引用指定远程组件 */
  byName: (componentName: string): DynamicComponentProps => ({
    componentName,
  }),
};
