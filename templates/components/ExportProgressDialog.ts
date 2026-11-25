import type { ExpressionValue } from "./types.js";

/**
 * ExportProgressDialog 导出进度弹窗组件
 *
 * @description
 * 展示后台导出任务的轮询进度对话框，非空 `alias` 发布 `showExportProcessDialog(historyId, title?)`（源码: `component-schemas-v2/ExportProgressDialog/index.ts`）。
 */
export interface ExportProgressDialogProps {
  /** 页面上下文别名，暴露 `showExportProcessDialog(historyId, title?)` */
  alias?: string;
  title?: unknown;
  /** 轮询间隔（ms），默认: 3000 */
  interval?: ExpressionValue<number>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}

export const exportProgressDialogPresets = {
  /** 标准导出进度弹窗 */
  basic: (alias: string = "exportProgressDialog"): ExportProgressDialogProps => ({
    alias,
    interval: 3000,
  }),
};
