import type { ExpressionValue, StyleProps } from "./types.js";

/** SchemaBinding JSON Schema 节点描述 */
export interface BindingSchemaData {
  $schema?: "https://json-schema.org/draft/2020-12/schema";
  type: "string" | "number" | "integer" | "boolean" | "object" | "array" | "null";
  title?: string;
  description?: string;
  properties?: Record<string, BindingSchemaData>;
  required?: string[];
  items?: BindingSchemaData;
  enum?: unknown[];
  default?: unknown;
  additionalProperties?: boolean;
  format?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  minItems?: number;
  maxItems?: number;
}

/**
 * SchemaBinding 数据映射绑定编辑器组件
 *
 * @description
 * 根据目标 `schema` 与源 `contextShape` 可视化编辑字段映射规则（支持 `expression` 与 `path` 模式）；通过 `alias` 暴露 `setData(mapping)` 与 `getData()`（源码: `component-schemas-v2/SchemaBinding/index.ts`）。
 */
export interface SchemaBindingProps {
  alias?: string;
  mode?: ExpressionValue<"expression" | "path">;
  schema?: ExpressionValue<BindingSchemaData | null>;
  contextShape?: ExpressionValue<BindingSchemaData | null>;
  defaultValue?: ExpressionValue<Record<string, unknown> | null>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const schemaBindingPresets = {
  /** 表达式模式映射编辑器 */
  expressionEditor: (alias: string, schema: BindingSchemaData, contextShape: BindingSchemaData): SchemaBindingProps => ({
    alias,
    mode: "expression",
    schema,
    contextShape,
    defaultValue: {},
  }),
};
