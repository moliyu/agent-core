import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * IteratorContainer 循环渲染容器组件
 *
 * @description
 * 使用一份模板子树展示字段结构相同的数据项集合（源码: `component-schemas-v2/IteratorContainer/index.ts`）。
 *
 * @usageGuidelines
 * 1. **模板子树规则**：
 *    - `IteratorContainer` 是 Canvas 容器；只需在它下面放**一份**模板子树，运行时会按 `iteratorData` 数组逐条克隆渲染；
 * 2. **模板内读取当前项**：
 *    - 当前记录位于 `context.iterator[iteratorVariableName]`（默认 `context.iterator.item`）；
 *    - 当前 0 基索引位于 `context.iterator[indexVariableName]`（默认 `context.iterator.index`）；
 * 3. **稳定 Key**：建议将 `iteratorKey` 设为记录中的唯一字段名（如 `"Id"`）。
 */
export interface IteratorContainerProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 可选别名 */
  alias?: string;
  /** 循环数据源数组（通常通过 JSExpression 从父级 Context 读取，如 `return context?.list || []`） */
  iteratorData?: ExpressionValue<Array<Record<string, unknown>>>;
  /** 模板中当前项变量名，默认: "item"（对应 `context.iterator.item`） */
  iteratorVariableName?: string;
  /** 模板中当前索引变量名，默认: "index"（对应 `context.iterator.index`） */
  indexVariableName?: string;
  /** 记录唯一键字段路径（如 `"Id"`） */
  iteratorKey?: string;
  /** 是否开启分批加载，默认: false */
  enableBatchLoading?: boolean;
  /** 分批加载每批条数（1..20），默认: 5 */
  batchLoadSize?: number;
  visible?: boolean;
  hidden?: boolean;
  className?: string;
  style?: StyleProps;
}

export const iteratorContainerPresets = {
  /** 垂直列表循环容器 */
  verticalList: (
    dataExpr: string,
    iteratorKey: string = "Id",
    gap: string = "8px"
  ): IteratorContainerProps => ({
    iteratorData: {
      _type: "JSExpression",
      value: dataExpr,
      defaultValue: [],
    },
    iteratorVariableName: "item",
    indexVariableName: "index",
    iteratorKey,
    style: {
      display: "flex",
      flexDirection: "column",
      gap,
    },
  }),
};
