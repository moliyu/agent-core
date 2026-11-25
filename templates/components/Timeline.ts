import type { ExpressionValue, JSFunction, OperatorCode, StyleProps } from "./types.js";

/** Timeline 数据集引用 */
export interface TimelineDataset {
  id?: string;
  name?: string;
}

/** Timeline 默认查询参数 */
export interface TimelineQueryParam {
  fieldName?: ExpressionValue<string>;
  operation?: ExpressionValue<OperatorCode>;
  value?: ExpressionValue<string>;
  sort?: ExpressionValue<"none" | "asc" | "desc">;
}

/**
 * Timeline 时间线组件
 *
 * @description
 * 按时间顺序展示数据记录及其时间线条目（源码: `component-schemas-v2/Timeline/index.ts`）。
 *
 * @usageGuidelines
 * - `Timeline` 的直接子节点构成**单条记录的循环模板**（与 `IteratorContainer` 类似），而非逐条静态节点；
 * - 模板内部通过 `context.item.data` 访问当前记录对象，通过 `context.item.index` 访问 0 基索引；
 * - `dataSourceType: "be"` 时自动通过 `bmName` / `beName` / `dataset` 查询；`dataSourceType: "default"` 时通过 `onDataInitial` 脚本加载。
 */
export interface TimelineProps {
  /** 非空 alias 向页面上下文发布 `pageNo`, `data`, `setTimeLineData`, `setTimeLinePageNo`, `setHasMore` */
  alias?: string;
  /** 是否显示标签列，默认: false */
  labelShow?: ExpressionValue<boolean>;
  /** 数据加载模式，默认: "scrolling" */
  dataLoadType?: ExpressionValue<"pagination" | "scrolling">;
  /** 轴与内容排布模式，默认: "left" */
  mode?: ExpressionValue<"left" | "right" | "alternate">;
  /** 默认圆点颜色 */
  defaultColor?: ExpressionValue<string>;
  /** 数据源类型，默认: "default" */
  dataSourceType?: ExpressionValue<"default" | "be">;
  /** default 模式初始化回调: `({ pageNo, data, setData, setPageNo, setHasMore }) => void` */
  onDataInitial?: JSFunction | "";
  /** 业务模块名称 */
  bmName?: string;
  /** 业务实体名称 */
  beName?: string;
  /** 父业务实体名称 */
  parentBeName?: string;
  /** 父记录 ID */
  parentBeId?: string;
  /** 分页大小，默认: 20 */
  pageSize?: ExpressionValue<number>;
  /** 数据集配置 */
  dataset?: TimelineDataset;
  /** 默认查询条件 */
  defaultQueryParams?: ExpressionValue<TimelineQueryParam[]>;
  /** 返回字段白名单 */
  resultField?: ExpressionValue<string[]>;
  /** 滚动容器高度 */
  scrollableHeight?: ExpressionValue<string>;
  /** 滚动容器样式 */
  scrollableStyle?: ExpressionValue<StyleProps>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
}

export const timelinePresets = {
  /** 详情页变更日志 / 跟进记录时间线（自定义脚本加载） */
  activityLog: (jsCode: string, mode: "left" | "alternate" = "left"): TimelineProps => ({
    dataSourceType: "default",
    dataLoadType: "scrolling",
    mode,
    defaultColor: "var(--color-primary-border-hover)",
    onDataInitial: {
      _type: "JSFunction",
      value: jsCode,
    },
  }),

  /** 绑定 BE 实体的时间线 */
  beTimeline: (beName: string, alias: string = "timeline"): TimelineProps => ({
    alias,
    dataSourceType: "be",
    beName,
    dataLoadType: "scrolling",
    mode: "left",
    pageSize: 20,
  }),
};
