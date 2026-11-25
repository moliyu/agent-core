import type { ExpressionValue } from "./types.js";

/**
 * DetailsPageContainer 详情页框架容器组件
 *
 * @description
 * 提供标准详情页的 `Head` / `Content` / `Footer` 三段式槽位容器，并支持上一条/下一条记录导航（源码: `component-schemas-v2/DetailsPageContainer/index.ts`）。
 *
 * @usageGuidelines
 * - 创建后运行时自动生成 `DetailsPageContainerHead`、`DetailsPageContainerContent`、`DetailsPageContainerFooter` 三个区域；
 * - 往各区域插入内容前，必须先通过 `inspect_ui_tree` 读取这三个区域的真实节点 ID；
 * - 开启 `enablePage: true` 后，子树可通过局部 `context.detailPage` 读取当前记录 `data`、`currentIndex`、`total` 与 `pre()` / `after()` 翻页方法。
 */
export interface DetailsPageContainerProps {
  /** 是否启用详情页记录翻页导航，默认: false */
  enablePage?: ExpressionValue<boolean>;
  /** 是否显示头部区域，默认: true */
  displayHead?: ExpressionValue<boolean>;
  /** 是否显示底部区域，默认: true */
  displayFoot?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}

export const detailsPageContainerPresets = {
  /** 标准三段式详情页容器（带头部与底部操作栏） */
  standard: (enablePage: boolean = false): DetailsPageContainerProps => ({
    enablePage,
    displayHead: true,
    displayFoot: true,
    visible: true,
  }),
};
