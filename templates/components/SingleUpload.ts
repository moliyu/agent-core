import type { MessageValue, ExpressionValue, JSFunction, StyleProps, EventItem } from "./types.js";
import type { FormValidationRule } from "./Form.js";

/**
 * SingleUpload 文件上传组件
 *
 * @description
 * 上传并管理单个或多个文件，支持业务字段绑定与自动保存
 * （源码: `component-schemas-v2/SingleUpload/index.ts`）。
 *
 * @usageGuidelines
 * - `mode: "single"`（默认）为单文件模式（表单值为文件 ID 或 `null`）；`mode: "multiple"` 为多文件模式；
 * - 事件 `handleAfterUpload` 的 `params[0]` 为 `{ file, fileId, fileName, suffix }`；
 * - `handleBeforeUpload` / `handleBeforeDelete` 需返回 `boolean`（仅 `true` 才继续）。
 */
export interface SingleUploadProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 表单项标签文案 */
  displayName?: MessageValue<string>;
  labelTooltipEnabled?: ExpressionValue<boolean>;
  labelTooltip?: MessageValue<string>;
  labelWidth?: ExpressionValue<string>;
  /** 绑定的表单字段名 */
  fieldName?: string;
  required?: ExpressionValue<boolean>;
  rules?: FormValidationRule[];
  isNeedFormItem?: ExpressionValue<boolean>;
  disabled?: ExpressionValue<boolean>;
  defaultValue?: ExpressionValue<string>;
  placeholder?: MessageValue<string>;
  /** 列表展示形态，默认: "text" */
  listType?: ExpressionValue<"text" | "picture" | "picture-card" | "picture-circle">;
  /** 上传模式，默认: "single" */
  mode?: ExpressionValue<"single" | "multiple">;
  /** 是否自动保存关联业务，默认: false */
  autoSave?: ExpressionValue<boolean>;
  /** 多文件自动保存父记录 ID */
  parentId?: string;
  /** 文件业务实体名称 */
  fileBeName?: string;
  /** 文件 ID 字段名 */
  fileIdFieldName?: string;
  /** 父记录 ID 字段名 */
  parentBeIdFieldName?: string;
  /** 文件规则编码，默认: "TZComFileRule" */
  ruleCode?: string;
  /** 文件类型编码，默认: "TZComFileType" */
  typeCode?: string;
  /** 是否允许打开/预览，默认: true */
  openFlg?: ExpressionValue<boolean>;
  /** 自定义文件名或回调 `({ file, fileName, suffix, index }) => Promise<string>` */
  customFileName?: string | JSFunction;
  /** 最大上传数量（1..999999999），默认: 100 */
  maxCount?: ExpressionValue<number>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  formItemClassName?: ExpressionValue<string>;
  formItemStyle?: StyleProps;
  events?: EventItem<
    | "handleBeforeUpload"
    | "handleAfterUpload"
    | "handleBeforeDelete"
    | "afterToSubmit"
    | "changeFunction"
  >[];
}

export const singleUploadPresets = {
  /** 标准单文件上传控件 */
  singleFile: (fieldName: string, displayName: string, required: boolean = false): SingleUploadProps => ({
    mode: "single",
    listType: "text",
    fieldName,
    displayName,
    required,
    placeholder: `请上传${displayName}`,
  }),
};
