import type { ExpressionValue, JSFunction, MessageValue, StyleProps } from "./types.js";

/**
 * FileUpload 多文件上传组件
 *
 * @description
 * 在表单中选择并管理多文件上传，支持文件列表样式、数量限制与上传/删除回调（源码: `component-schemas-v2/FileUpload/index.ts`）。
 * 注意区分：`SingleUpload` 适用于单文件/ID 模型，`FileUpload` 是存量项目中常用的多文件数组模型控件。
 */
export interface FileUploadProps {
  displayName?: MessageValue;
  labelTooltipEnabled?: ExpressionValue<boolean>;
  labelTooltip?: MessageValue;
  labelWidth?: ExpressionValue<string>;
  fieldName?: string;
  required?: ExpressionValue<boolean>;
  rules?: Array<{
    type?: ExpressionValue<string>;
    warningOnly?: ExpressionValue<boolean>;
    validateTrigger?: ExpressionValue<"onBlur" | "onChange" | "onSubmit">;
    message?: ExpressionValue<string>;
    pattern?: ExpressionValue<string>;
    validator?: JSFunction | "";
  }>;
  isNeedFormItem?: ExpressionValue<boolean>;
  displayOnlyType?: ExpressionValue<"text" | "formItem">;
  disabled?: ExpressionValue<boolean>;
  defaultValue?: ExpressionValue<string>;
  placeholder?: MessageValue;
  /** 文件列表展示样式，默认: "text" */
  listType?: ExpressionValue<"text" | "picture" | "picture-card" | "picture-circle">;
  /** 上传规则编码 */
  ruleCode?: ExpressionValue<string>;
  /** 上传类型编码 */
  typeCode?: ExpressionValue<string>;
  openFlg?: ExpressionValue<boolean>;
  /** 最大上传数量（1~20） */
  maxCount?: ExpressionValue<number>;
  /** 挂载初始化回调: `({ setData }) => void` */
  initData?: JSFunction;
  /** 上传成功回调: `(data, removeData) => void` */
  uploadCallback?: JSFunction;
  /** 删除文件回调: `({ fileId, fileName, suffix }) => void` */
  removeCallback?: JSFunction;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: ExpressionValue<StyleProps>;
}

export const fileUploadPresets = {
  /** 标准附件列表上传 */
  attachmentList: (fieldName: string, displayName: string, maxCount: number = 5): FileUploadProps => ({
    fieldName,
    displayName,
    listType: "text",
    maxCount,
  }),

  /** 图片墙上传 */
  pictureCard: (fieldName: string, displayName: string, maxCount: number = 5): FileUploadProps => ({
    fieldName,
    displayName,
    listType: "picture-card",
    maxCount,
  }),
};
