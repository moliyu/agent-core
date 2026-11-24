export interface ExtractedEnumOption {
  value: string | number | boolean;
  label: string;
}

export interface ExtractedProperty {
  name: string;
  label: string;
  description?: string;
  tsType: string;
  inputType: string;
  enums?: ExtractedEnumOption[];
  defaultValue?: any;
  required?: boolean;
  group?: string;
}

export interface ExtractedComponent {
  type: string;
  displayName: string;
  isCanvas: boolean;
  tags: string[];
  properties: ExtractedProperty[];
  defaultProps: Record<string, any>;
}

export class SchemaExtractor {
  /**
   * 将原始从 Oasis Bridge 获取的元数据数组转换为结构化的 ExtractedComponent 列表
   */
  public static extractAll(rawComponents: any[]): ExtractedComponent[] {
    return rawComponents.map((raw) => this.extractSingle(raw));
  }

  public static extractSingle(raw: any): ExtractedComponent {
    const type: string = raw.type || raw.name || "UnknownComponent";
    const displayName: string = raw.displayName || type;
    const isCanvas = Boolean(raw.isCanvas);
    const tags: string[] = Array.isArray(raw.tags) ? raw.tags : [];
    const localeData = raw.localeData || {};

    const properties: ExtractedProperty[] = [];
    const defaultProps: Record<string, any> = {};

    const propertyConfigs = Array.isArray(raw.propertyConfigs) ? raw.propertyConfigs : [];

    for (const group of propertyConfigs) {
      const groupName = this.resolveText(group.name, localeData) || "属性配置";
      const items = Array.isArray(group.items) ? group.items : [];

      for (const item of items) {
        if (!item || typeof item.name !== "string") continue;

        const propName = item.name;
        const propLabel = this.resolveText(item.nameLocaleKey || item.label || item.name, localeData) || propName;
        const propDesc = this.resolveText(item.descriptionLocaleKey || item.description, localeData);
        const inputType = String(item.inputType || item.type || "InputText");

        // 提取枚举可选项
        const enums = this.extractEnums(item, localeData);

        // 推断 TypeScript 类型
        const tsType = this.inferTsType(item, enums);

        const defaultValue = item.initialValue !== undefined ? item.initialValue : item.defaultValue;
        if (defaultValue !== undefined) {
          defaultProps[propName] = defaultValue;
        }

        properties.push({
          name: propName,
          label: propLabel,
          description: propDesc,
          tsType,
          inputType,
          enums: enums.length > 0 ? enums : undefined,
          defaultValue,
          group: groupName,
        });
      }
    }

    return {
      type,
      displayName,
      isCanvas,
      tags,
      properties,
      defaultProps,
    };
  }

  private static extractEnums(item: any, localeData: Record<string, any>): ExtractedEnumOption[] {
    const selectOptions = item.inputDetails?.select?.options || item.options;
    if (!Array.isArray(selectOptions)) {
      return [];
    }

    const result: ExtractedEnumOption[] = [];
    for (const opt of selectOptions) {
      if (opt === null || opt === undefined) continue;

      if (typeof opt === "string" || typeof opt === "number" || typeof opt === "boolean") {
        result.push({
          value: opt,
          label: String(opt),
        });
      } else if (typeof opt === "object" && opt.value !== undefined) {
        const label = this.resolveText(opt.labelLocaleKey || opt.label || opt.name, localeData) || String(opt.value);
        result.push({
          value: opt.value,
          label,
        });
      }
    }

    return result;
  }

  private static inferTsType(item: any, enums: ExtractedEnumOption[]): string {
    // 1. 如果有枚举选项，直接生成字面量联合类型
    if (enums.length > 0) {
      return enums
        .map((e) => {
          if (typeof e.value === "string") return JSON.stringify(e.value);
          return String(e.value);
        })
        .join(" | ");
    }

    const inputType = String(item.inputType || "").toLowerCase();
    const rawType = String(item.type || "").toLowerCase();

    // 2. 布尔类型
    if (inputType.includes("checkbox") || inputType.includes("switch") || rawType === "boolean") {
      return "boolean";
    }

    // 3. 数字类型
    if (
      inputType.includes("number") ||
      inputType.includes("slider") ||
      rawType === "number" ||
      rawType === "integer"
    ) {
      return "number";
    }

    // 4. 对象 / JSON 类型
    if (inputType.includes("json") || inputType.includes("style") || rawType === "object") {
      return "Record<string, any>";
    }

    // 5. 数组类型
    if (rawType === "array") {
      return "any[]";
    }

    // 6. 默认字符串
    return "string";
  }

  private static resolveText(val: any, localeData: Record<string, any>): string | undefined {
    if (!val) return undefined;
    if (typeof val === "string") {
      // 检查是否是多语言 key 如 "Button.submit"
      if (localeData && localeData[val]) {
        return localeData[val];
      }
      return val;
    }
    if (typeof val === "object") {
      if (typeof val.key === "string" && localeData && localeData[val.key]) {
        return localeData[val.key];
      }
      if (typeof val.default === "string") {
        return val.default;
      }
      if (typeof val.zh === "string") {
        return val.zh;
      }
    }
    return undefined;
  }
}
