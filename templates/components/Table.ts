import type { EventItem, ExpressionValue, JSFunction, StyleProps } from "./types.js";

/** Table 列定义 */
export interface TableHeadColumn {
  displayName?: string;
  key?: string;
  isSummary?: boolean;
  width?: number;
  minWidth?: number;
  controlType?: "number" | "button" | "none";
  min?: number;
  max?: number;
  precision?: number;
  step?: number;
  label?: string;
  buttonType?: "primary" | "dashed" | "link" | "text" | "default";
  disabled?: boolean;
  isFix?: boolean;
  fixPosition?: "left" | "right" | "none";
  customFunction?: {
    id?: string;
    events?: EventItem<"onChange" | "onBlur" | "onClick">[];
  };
}

/**
 * Table 基础表格组件
 *
 * @description
 * 展示基础静态/动态表格数据，支持可编辑数值列、操作按钮列与汇总行；企业级 BE 列表查询场景推荐优先使用 `GridPlus`（源码: `component-schemas-v2/Table/index.ts`）。
 */
export interface TableProps {
  /** 页面上下文别名，暴露运行时 `data` 与汇总 `summary` */
  alias?: string;
  dataSource?: Array<Record<string, unknown>>;
  rowKey?: string;
  tableHead?: TableHeadColumn[];
  isSummary?: boolean;
  enableSummaryFirstCell?: boolean;
  summaryHeadPosition?: string;
  summaryHeadTitle?: string;
  border?: boolean;
  size?: "large" | "middle" | "small";
  height?: string;
  /** `({ data }) => void` */
  changeFunction?: JSFunction | "";
  /** `({ key, value, row, summary, setRecord }) => void` */
  blurFunction?: JSFunction | "";
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: string;
  style?: StyleProps;
}

export const tablePresets = {
  /** 基础静态展示表格 */
  basic: (alias: string, rowKey: string, tableHead: TableHeadColumn[]): TableProps => ({
    alias,
    rowKey,
    tableHead,
    dataSource: [],
    border: true,
    size: "small",
  }),
};
