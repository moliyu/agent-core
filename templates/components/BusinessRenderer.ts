import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/**
 * BusinessRenderer 业务表单渲染器组件
 *
 * @description
 * 渲染 `BusinessConfigurator` 产出的业务设计结果，支持 `edit` / `preview` / `readOnly` 模式及分步表单与保存提交事件（源码: `component-schemas-v2/BusinessRenderer/index.ts`）。
 */
export interface BusinessRendererProps {
  viewMode?: ExpressionValue<"edit" | "preview" | "readOnly">;
  defaultCanvasJson?: unknown;
  contextValues?: unknown;
  paginationStepMode?: ExpressionValue<boolean>;
  paginatedFormInstanceState?: unknown;
  saveFormValues?: unknown;
  currentPage?: ExpressionValue<string>;
  paginationStepSavePageStudioEvents?: EventItem[];
  paginationStepSubmitPageStudioEvents?: EventItem[];
  saveEnabled?: ExpressionValue<boolean>;
  saveStudioEvents?: EventItem[];
  formValues?: unknown;
  studioEvents?: EventItem[];
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const businessRendererPresets = {
  /** 只读详情渲染模式 */
  readOnly: (): BusinessRendererProps => ({
    viewMode: "readOnly",
    saveEnabled: false,
  }),
};
