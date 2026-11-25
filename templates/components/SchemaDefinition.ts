import type { ExpressionValue, StyleProps } from "./types.js";

/** SchemaDefinition 递归字段节点 */
export interface SchemaDefinitionNode {
  type: "string" | "number" | "boolean" | "object" | "array";
  title?: string;
  description?: string;
  default?: string | number | boolean;
  enum?: Array<string | number | boolean>;
  format?: "date-time" | "date" | "time" | "email" | "uri";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minimum?: number;
  maximum?: number;
  minItems?: number;
  maxItems?: number;
  properties?: Record<string, SchemaDefinitionNode>;
  required?: string[];
  items?: SchemaDefinitionNode;
  additionalProperties?: boolean;
}

/** SchemaDefinition 根结构 */
export interface SchemaDefinitionData {
  $schema?: "https://json-schema.org/draft/2020-12/schema";
  type: "object";
  title?: string;
  description?: string;
  properties?: Record<string, SchemaDefinitionNode>;
  required?: string[];
  additionalProperties?: boolean;
}

/**
 * SchemaDefinition JSON Schema 可视化编辑器组件
 *
 * @description
 * 可视化编辑 JSON Schema，首次挂载由 `defaultValue` 初始化，通过 `alias` 上下文暴露 `setData(schema)` 与 `getData()`（源码: `component-schemas-v2/SchemaDefinition/index.ts`）。
 */
export interface SchemaDefinitionProps {
  alias?: string;
  defaultValue?: ExpressionValue<SchemaDefinitionData | null>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const schemaDefinitionPresets = {
  /** 空对象 Schema 编辑器 */
  basic: (alias: string): SchemaDefinitionProps => ({
    alias,
    defaultValue: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  }),
};
