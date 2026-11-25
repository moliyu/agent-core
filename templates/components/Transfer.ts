import type { ExpressionValue, JSFunction, MessageValue } from "./types.js";

/** Transfer 面板列定义 */
export interface TransferColumn {
  /** 字段名 */
  name: string;
  /** 列标题 */
  label: MessageValue;
  /** 平台转换码，默认 "none" */
  transformCode?: string;
}

/**
 * Transfer 穿梭框组件
 *
 * @description
 * 在左右两个数据面板之间选择、搜索和移动数据项（源码: `component-schemas-v2/Transfer/index.ts`）。
 *
 * @usageGuidelines
 * - 左右两侧分别配置 `leftResource`/`leftKey`/`leftColumn` 与 `rightResource`/`rightKey`/`rightColumn`；
 * - 移动数据项时通过 `addRightDataSource` 与 `removeRightDataSource` 异步回调处理持久化，签名均为 `(selectedDataSource, currentRightDataSource) => Promise<void>`。
 */
export interface TransferProps {
  /** 表格最大高度，默认: 200 */
  transferTableMaxHeight?: ExpressionValue<number>;
  /** 左侧面板标题，默认: "选项" */
  transferLeftPanelTitle?: MessageValue;
  leftResource?: string;
  leftResult?: string[];
  leftKey?: string;
  leftColumn?: TransferColumn[];
  leftFilterName?: string;
  leftFilterResource?: string;
  leftQuery?: string;
  /** 右侧面板标题，默认: "结果" */
  transferRightPanelTitle?: MessageValue;
  rightResource?: string;
  rightResult?: string[];
  rightKey?: string;
  rightColumn?: TransferColumn[];
  rightFilterName?: string;
  rightFilterResource?: string;
  rightQuery?: string;
  /** 移入右侧回调: `(selectedDataSource, currentRightDataSource) => Promise<void>` */
  addRightDataSource?: JSFunction;
  /** 移出右侧回调: `(selectedDataSource, currentRightDataSource) => Promise<void>` */
  removeRightDataSource?: JSFunction;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}

export const transferPresets = {
  /** 左右双栏基础骨架 */
  basic: (leftTitle: string = "待选", rightTitle: string = "已选"): TransferProps => ({
    transferTableMaxHeight: 280,
    transferLeftPanelTitle: leftTitle,
    transferRightPanelTitle: rightTitle,
    leftColumn: [],
    rightColumn: [],
  }),
};
