import type { EventItem, ExpressionValue, JSFunction, MessageValue, StyleProps } from "./types.js";

/**
 * MultipleUpload 多文件上传组件（兼容别名/业务绑定版）
 *
 * @description
 * 上传并管理多个文件，支持业务实体自动保存（`autoSave`、`fileBeName`）和数量限制；新页面多附件上传也可使用 `FileUpload`（源码: `component-schemas-v2/MultipleUpload/index.ts`）。
 */
export interface MultipleUploadProps {
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
  disabled?: ExpressionValue<boolean>;
  defaultValue?: ExpressionValue<string>;
  placeholder?: MessageValue;
  listType?: ExpressionValue<"text" | "picture" | "picture-card" | "picture-circle">;
  mode?: ExpressionValue<"single" | "multiple">;
  autoSave?: ExpressionValue<boolean>;
  parentId?: string;
  fileBeName?: string;
  fileIdFieldName?: string;
  parentBeIdFieldName?: string;
  ruleCode?: string;
  typeCode?: string;
  openFlg?: ExpressionValue<boolean>;
  customFileName?: string | JSFunction;
  maxCount?: ExpressionValue<number>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: ExpressionValue<StyleProps>;
  events?: EventItem<"handleBeforeUpload" | "handleAfterUpload" | "handleBeforeDelete" | "afterToSubmit" | "changeFunction">[];
}

export const multipleUploadPresets = {
  /** 标准多文件上传 */
  attachments: (fieldName: string, displayName: string, maxCount: number = 10): MultipleUploadProps => ({
    fieldName,
    displayName,
    mode: "multiple",
    listType: "text",
    maxCount,
    ruleCode: "TZComFileRule",
    typeCode: "TZComFileType",
    openFlg: true,
  }),
};
