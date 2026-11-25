import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * StateModel 状态模型组件
 *
 * @description
 * 展示业务记录的状态模型，并支持状态流转操作（源码: `component-schemas-v2/StateModel/index.ts`）。
 *
 * @usageGuidelines
 * - 绑定 `beName`（及可选 `parentBeName`）与记录主键 `id`（常用 `JSExpression` 绑定页面路由或上下文 ID）；
 * - 非空 `alias` 会向页面上下文发布 `transitionState()`、`close()` 与 `refresh()` 方法；
 * - 常见于详情页顶部操作区或状态栏，配合 `isAfterRefreshPage: true` 在状态流转后刷新页面数据。
 */
export interface StateModelProps {
  /** 非空 alias 发布 `transitionState()`, `close()`, `refresh()` 到页面上下文 */
  alias?: string;
  /** 业务实体名称（如 "TZConsumerLeads"） */
  beName?: string;
  /** 父业务实体名称 */
  parentBeName?: string;
  /** 状态展示方式，默认: "dropdown" */
  displayType?: ExpressionValue<"dropdown" | "buttonGroup">;
  /** 尺寸，默认: "middle" */
  size?: ExpressionValue<"large" | "middle" | "small">;
  /** 父记录 ID */
  parentId?: ExpressionValue<string>;
  /** 当前业务记录 ID（常用 JSExpression 读取上下文） */
  id?: ExpressionValue<string>;
  /** 数据集标识 */
  dataset?: ExpressionValue<string>;
  /** 状态流转后是否刷新页面，默认: false */
  isAfterRefreshPage?: ExpressionValue<boolean>;
  /** 弹窗宽度 */
  dialogWidth?: ExpressionValue<string>;
  /** 是否隐藏弹窗底部按钮，默认: false */
  hiddenComponentDialogFooter?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const stateModelPresets = {
  /** 详情页顶部状态流转下拉 */
  detailDropdown: (beName: string, alias: string = "stateModel"): StateModelProps => ({
    alias,
    beName,
    displayType: "dropdown",
    size: "small",
    isAfterRefreshPage: true,
  }),

  /** 按钮组形式状态流转 */
  buttonGroup: (beName: string, alias: string = "stateModel"): StateModelProps => ({
    alias,
    beName,
    displayType: "buttonGroup",
    size: "middle",
    isAfterRefreshPage: true,
  }),
};
