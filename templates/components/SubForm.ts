import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * SubForm 子表单容器组件
 *
 * @description
 * 在表单中展示和管理重复的子记录集合（源码: `component-schemas-v2/SubForm/index.ts`）。
 *
 * @usageGuidelines
 * - 非空字面量 `alias` 向页面上下文发布 `loading`、`dataSource`、`addDataItem`、`removeDataItem`、`getSubFormData`、`validate`、`setSubFormData`、`getDeleteData` 等；
 * - 子树内可通过 `context.subForm` 访问运行时对象，每条运行时渲染的 `SubFormItem` 提供 `context.subFormItem.data` / `index` / `parentContext`。
 */
export interface SubFormProps {
  /** 页面上下文别名 */
  alias?: string;
  metaData?: {
    beName?: string;
    parentBeName?: string;
    parentId?: ExpressionValue<string>;
    dataset?: ExpressionValue<string>;
  };
  title?: {
    enable?: ExpressionValue<boolean>;
    text?: ExpressionValue<string>;
    fontSize?: ExpressionValue<string>;
    fontColor?: ExpressionValue<string>;
    fontWeight?: ExpressionValue<"normal" | "bold">;
  };
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  toolbarStyle?: ExpressionValue<StyleProps>;
}

export const subFormPresets = {
  /** 关联子表区域 */
  beSubForm: (alias: string, beName: string, titleText: string): SubFormProps => ({
    alias,
    metaData: { beName, parentId: "", dataset: "" },
    title: {
      enable: true,
      text: titleText,
      fontSize: "16px",
      fontColor: "#000000",
      fontWeight: "bold",
    },
  }),
};
