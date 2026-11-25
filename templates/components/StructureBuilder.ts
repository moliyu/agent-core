import type { EventItem, ExpressionValue, MessageValue, StyleProps } from "./types.js";

/**
 * StructureBuilder 结构化行数据编辑器组件
 *
 * @description
 * 展示并编辑可选择、可展开的结构化表格或树形行数据；非空 `alias` 发布 `getVisibleRowData()`、`getTreeData()`、`addRow()`、`addChildRow()`、`updateRow()`、`removeRow()`、`getSelectedRows()` 等（源码: `component-schemas-v2/StructureBuilder/index.ts`）。
 */
export interface StructureBuilderProps {
  alias?: string;
  mode?: ExpressionValue<"table" | "tree">;
  rowKey?: ExpressionValue<string>;
  selectable?: unknown;
  size?: ExpressionValue<"small" | "middle" | "large">;
  rowClassName?: unknown;
  headerStyle?: unknown;
  dataSource?: Array<Record<string, unknown>>;
  columns?: Array<Record<string, unknown>>;
  tree?: unknown;
  action?: {
    title?: MessageValue;
    width?: number;
    minWidth?: number;
    fixed?: "none" | "left" | "right";
    visibleActions?: number;
    rowActionButtons?: Array<{
      title?: MessageValue;
      show?: ExpressionValue<boolean>;
      disabled?: ExpressionValue<boolean>;
      tooltip?: MessageValue;
      theme?: "primary" | "success" | "info" | "warning" | "danger" | "default";
      variant?: "solid" | "filled" | "outlined" | "dashed" | "link" | "text";
      buttonSize?: "small" | "middle" | "large";
      iconName?: string;
      event?: { events: EventItem<"onClick">[] };
      children?: Array<{ title?: MessageValue; actionType?: string }>;
    }>;
  };
  events?: EventItem[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const structureBuilderPresets = {
  /** 树形结构编辑表格 */
  treeEditor: (alias: string): StructureBuilderProps => ({
    alias,
    mode: "tree",
    rowKey: "id",
    size: "middle",
  }),
};
