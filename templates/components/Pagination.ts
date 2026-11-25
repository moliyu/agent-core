import type { EventItem, ExpressionValue, MessageValue, StyleProps } from "./types.js";

/**
 * Pagination 分页导航组件
 *
 * @description
 * 分页导航组件，支持受控/非受控页码、每页条数、总数展示和分页事件（源码: `component-schemas-v2/Pagination/index.ts`）。
 *
 * @usageGuidelines
 * - `mode: "controlled"` 时读取 `current` 与 `pageSize`；`mode: "uncontrolled"` 时使用 `defaultCurrent` 与 `defaultPageSize`；
 * - 事件：`onChange` 入参 `(page, pageSize)`，`onShowSizeChange` 入参 `(current, pageSize)`。
 */
export interface PaginationProps {
  /** 受控/非受控模式，默认: "uncontrolled" */
  mode?: ExpressionValue<"controlled" | "uncontrolled">;
  current?: ExpressionValue<number>;
  defaultCurrent?: ExpressionValue<number>;
  total?: ExpressionValue<number>;
  pageSize?: ExpressionValue<number>;
  defaultPageSize?: ExpressionValue<number>;
  pageSizeOptions?: ExpressionValue<string[]>;
  simple?: ExpressionValue<boolean>;
  size?: ExpressionValue<"default" | "small">;
  align?: ExpressionValue<"start" | "center" | "end">;
  showSizeChanger?: ExpressionValue<boolean>;
  showQuickJumper?: ExpressionValue<boolean>;
  disabled?: ExpressionValue<boolean>;
  hideOnSinglePage?: ExpressionValue<boolean>;
  showTotal?: ExpressionValue<boolean>;
  showTotalTemplate?: MessageValue;
  customItemRender?: ExpressionValue<boolean>;
  prevText?: MessageValue;
  nextText?: MessageValue;
  events?: EventItem<"onChange" | "onShowSizeChange">[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const paginationPresets = {
  /** 受控标准分页（配合服务或 IteratorContainer 使用） */
  controlled: (totalExpr: ExpressionValue<number>, currentExpr: ExpressionValue<number>, pageSizeExpr: ExpressionValue<number>, onChangeCode: string): PaginationProps => ({
    mode: "controlled",
    total: totalExpr,
    current: currentExpr,
    pageSize: pageSizeExpr,
    align: "end",
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: true,
    events: [{ trigger: "onChange", code: onChangeCode }],
  }),
};
