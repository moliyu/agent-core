import type { EventItem, ExpressionValue, OperatorCode, StyleProps } from "./types.js";

/** Tree 元数据配置 */
export interface TreeMetaData {
  beName?: string;
  parentBeName?: string;
  datasets?: Array<{ id?: string; name?: string }>;
  filterName?: string;
  defaultQueryParams?: Array<{
    fieldName?: string;
    operation?: OperatorCode;
    value?: string;
    sort?: "none" | "asc" | "desc";
  }>;
  parentId?: ExpressionValue<string>;
}

/**
 * Tree 树形控件组件
 *
 * @description
 * 展示具有父子层级关系的树形数据，支持搜索、多选、懒加载、拖拽及节点操作图标（源码: `component-schemas-v2/Tree/index.ts`）。
 *
 * @usageGuidelines
 * - 非空字面量 `alias` 会向页面上下文发布 `data`、`datasetId`、`datasets`、`switchDataset(id)` 及选中/勾选/展开状态；
 * - `metaData.beName` 绑定 BE 实体时，通过 `treeFieldNames`（默认 `title: "Name", key: "Id", treeParentId: "ParentId"`）映射父子层级；
 * - 也可直接配置 `staticData` 渲染静态树数据。
 */
export interface TreeProps {
  /** 非空字面量 alias 发布树状态与数据集切换 API 到页面上下文 */
  alias?: string;
  /** 静态树节点数据 */
  staticData?: Array<Record<string, unknown>>;
  /** BE 数据源配置 */
  metaData?: TreeMetaData;
  /** 是否懒加载子节点，默认: false */
  isLazyLoad?: boolean;
  treeNodes?: Array<{ fieldName: string }>;
  /** 字段映射 */
  treeFieldNames?: {
    title?: string;
    key?: string;
    joinName?: string;
    treeParentId?: string;
  };
  /** 树交互与展示配置 */
  treeConfig?: {
    enableSearch?: boolean;
    disabled?: boolean;
    checked?: boolean;
    selected?: boolean;
    multiple?: boolean;
    enableDrag?: boolean;
    nodeDraggingAcrossLevels?: boolean;
    defaultSelectedKeys?: string[];
    defaultCheckedKeys?: string[];
    defaultExpandKeys?: string[];
    defaultExpandAll?: boolean;
    virtual?: boolean;
    height?: number;
  };
  /** 节点行内操作按钮 */
  treeOperations?: Array<{
    type?: "add" | "update" | "delete" | "customer";
    icon?: string;
    tooltip?: string;
    events?: EventItem<"onClick">[];
  }>;
  events?: EventItem<"onTreeNodeRender" | "onDrop" | "onSelect">[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  wrapperStyle?: StyleProps;
  rootStyle?: StyleProps;
}

export const treePresets = {
  /** 带搜索的 BE 层级树（常用于左树右表布局左侧） */
  searchableBeTree: (alias: string, beName: string): TreeProps => ({
    alias,
    metaData: { beName },
    treeConfig: {
      enableSearch: true,
      selected: true,
      checked: false,
      defaultExpandAll: false,
    },
  }),
};
