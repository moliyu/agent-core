import type { ExpressionValue, JSFunction } from "./types.js";

/**
 * AndOrComponent 与/或条件表达式构建器
 *
 * @description
 * 构建和编辑与/或条件表达式，支持 `event` 与 `client` 模式，通过 `alias` 暴露 `getData()` 和 `valid()`（源码: `component-schemas-v2/AndOrComponent/index.ts`）。
 */
export interface AndOrComponentProps {
  /** 页面上下文别名，暴露 `getData()` 和 `valid()` */
  alias?: string;
  mode?: "event" | "client";
  /** `({ setData }) => void` */
  customFunction?: JSFunction | "";
  eventPromptName?: string;
  eventOperationCode?: string;
  eventPropertyPromptName?: string;
  eventPropertyOperationCode?: string;
  clientPromptName?: string;
  clientPropertyOperationTransformCode?: string;
  tagOperationTransformCode?: string;
  tagPromptName?: string;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}

export const andOrComponentPresets = {
  /** 客户端条件模式 */
  client: (alias: string): AndOrComponentProps => ({
    alias,
    mode: "client",
  }),
};
