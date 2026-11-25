import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * Grid 经典数据表格组件（旧版表格，存量项目中广泛使用）
 *
 * @description
 * 存量项目（如早期 CRM 列表与详情子表）中使用的经典数据表格组件。
 * 注意：新建页面或新配置表格推荐优先使用 `GridPlus`；维护或读取既有页面时常会遇到 `Grid`。
 *
 * @usageGuidelines
 * - `dataConfig` 存放 `alias`、`businessEntity`、`parentBusinessEntity`、`parentBusinessEntityId`、`datasets`；
 * - `gridColumns` 对应列定义数组（区别于 `GridPlus` 的 `columns`）；
 * - `formDialogProperty` 与 `formProperty` 用于关联新增/修改弹窗和表单节点 ID；
 * - `tableGlobalStyle` 控制 `border`、`stripe`、`size`、`defaultPageSize`、`isShowTotal` 等全局外观与分页默认大小。
 */
export interface GridDataConfig {
  alias?: string;
  businessEntity?: string;
  parentBusinessEntity?: string;
  parentBusinessEntityId?: ExpressionValue<string>;
  datasets?: Array<Record<string, unknown>>;
}

export interface GridProps {
  /** 关联表单节点（无弹窗内嵌场景） */
  formProperty?: {
    addFormNodeId?: string;
    updateFormNodeId?: string;
  };
  /** 关联新增/修改弹窗及内部表单节点 ID */
  formDialogProperty?: {
    addDialogNodeId?: string;
    addFormNodeId?: string;
    updateDialogNodeId?: string;
    updateFormNodeId?: string;
  };
  /** 数据源与实体配置 */
  dataConfig?: GridDataConfig;
  /** 是否开启行内编辑 */
  enableInlineEditing?: boolean;
  /** 汇总配置 */
  summaryConfig?: Array<Record<string, unknown>>;
  /** 列定义数组 */
  gridColumns?: Array<Record<string, unknown>>;
  /** 勾选、行样式等扩展配置 */
  customerProperty?: {
    isRowSelection?: boolean;
    columnWidth?: string | number;
    isCrossPageSelection?: boolean;
    rowStyleConfig?: Record<string, unknown>;
  };
  /** 全局操作栏按钮配置 */
  globalOperationConfig?: {
    quantity?: number;
    buttons?: Array<Record<string, unknown>>;
  };
  /** 行内操作列按钮配置 */
  rowOperationConfig?: {
    quantity?: number;
    isFixed?: boolean;
    operationLabel?: string;
    width?: string | number;
    buttons?: Array<Record<string, unknown>>;
  };
  /** 表格全局样式与默认分页大小 */
  tableGlobalStyle?: {
    border?: boolean;
    stripe?: boolean;
    size?: "large" | "middle" | "small";
    defaultPageSize?: number;
    isShowTotal?: boolean;
  };
  /** 表头样式 */
  tableHeadGlobalStyle?: StyleProps;
  /** 分页器位置与每页条数选项 */
  paginationConfig?: {
    position?: string;
    pageSizeOptions?: number[];
  };
  /** 导出配置 */
  exportConfig?: {
    isAllowExport?: boolean;
  };
}

export const gridPresets = {
  /** 经典列表只读骨架（实际新配置推荐使用 GridPlus） */
  basicReadonly: (businessEntity: string, alias: string): GridProps => ({
    dataConfig: {
      alias,
      businessEntity,
    },
    enableInlineEditing: false,
    gridColumns: [],
    tableGlobalStyle: {
      size: "middle",
      defaultPageSize: 20,
      isShowTotal: true,
    },
  }),
};
