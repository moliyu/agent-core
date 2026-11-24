import { ExtractedComponent } from "./schema-extractor.js";

export class TsGenerator {
  /**
   * 为单个组件生成 TypeScript 规范代码
   */
  public static generateComponentFile(comp: ExtractedComponent): string {
    const interfaceName = `${this.sanitizeIdentifier(comp.type)}Props`;
    const metaName = `${this.toCamelCase(comp.type)}Meta`;
    const presetsName = `${this.toCamelCase(comp.type)}Presets`;

    const propLines: string[] = [];

    for (const p of comp.properties) {
      const jsDocLines: string[] = ["  /**"];
      jsDocLines.push(`   * ${p.label || p.name}`);
      if (p.description) {
        jsDocLines.push(`   * ${p.description}`);
      }
      if (p.group) {
        jsDocLines.push(`   * @group ${p.group}`);
      }
      if (p.inputType) {
        jsDocLines.push(`   * @control ${p.inputType}`);
      }
      if (p.defaultValue !== undefined) {
        jsDocLines.push(`   * @default ${JSON.stringify(p.defaultValue)}`);
      }
      if (p.enums && p.enums.length > 0) {
        jsDocLines.push("   * @options");
        for (const e of p.enums) {
          jsDocLines.push(`   * - \`${e.value}\`: ${e.label}`);
        }
      }
      jsDocLines.push("   */");

      const optionalMark = p.required ? "" : "?";
      const fieldProp = `  ${this.sanitizePropKey(p.name)}${optionalMark}: ${p.tsType};`;

      propLines.push(jsDocLines.join("\n"));
      propLines.push(fieldProp);
      propLines.push("");
    }

    const defaultPropsCode = JSON.stringify(comp.defaultProps, null, 2);

    return `/**
 * Oasis 自举组件规范: ${comp.displayName} (${comp.type})
 * 此文件由 Agent 自举引擎从在线画布与组件库配置自动生成，具有完整的属性类型约束与合法枚举选项。
 */

/** ${comp.displayName} 组件属性契约 */
export interface ${interfaceName} {
${propLines.join("\n")}
}

/** ${comp.displayName} 组件元数据信息 */
export const ${metaName} = {
  type: ${JSON.stringify(comp.type)},
  displayName: ${JSON.stringify(comp.displayName)},
  isCanvas: ${comp.isCanvas},
  tags: ${JSON.stringify(comp.tags)},
} as const;

/** 开箱即用预设配置模版 */
export const ${presetsName} = {
  default: ${defaultPropsCode} as ${interfaceName},
};

export default ${metaName};
`;
  }

  /**
   * 生成 index.ts 统一注册与导出文件
   */
  public static generateIndexFile(components: ExtractedComponent[]): string {
    const importLines: string[] = [];
    const exportItemLines: string[] = [];
    const componentTypes: string[] = [];

    for (const comp of components) {
      const id = this.sanitizeIdentifier(comp.type);
      const metaName = `${this.toCamelCase(comp.type)}Meta`;
      const interfaceName = `${id}Props`;
      const presetsName = `${this.toCamelCase(comp.type)}Presets`;

      importLines.push(
        `import { ${interfaceName}, ${metaName}, ${presetsName} } from "./${id}.js";`
      );
      exportItemLines.push(
        `  ${JSON.stringify(comp.type)}: { meta: ${metaName}, presets: ${presetsName} },`
      );
      componentTypes.push(JSON.stringify(comp.type));
    }

    const typeUnion = componentTypes.length > 0 ? componentTypes.join(" | ") : "string";

    return `/**
 * Oasis 组件库统一资产目录入口
 * 包含所有自举提取的组件类型契约与预设
 */

${importLines.join("\n")}

export type OasisComponentType = ${typeUnion};

export const OASIS_COMPONENT_CATALOG = {
${exportItemLines.join("\n")}
} as const;

${components
  .map(
    (c) =>
      `export type { ${this.sanitizeIdentifier(c.type)}Props } from "./${this.sanitizeIdentifier(c.type)}.js";`
  )
  .join("\n")}
`;
  }

  private static sanitizeIdentifier(name: string): string {
    return name.replace(/[^a-zA-Z0-9_$]/g, "_");
  }

  private static sanitizePropKey(name: string): string {
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) {
      return name;
    }
    return JSON.stringify(name);
  }

  private static toCamelCase(str: string): string {
    const clean = this.sanitizeIdentifier(str);
    return clean.charAt(0).toLowerCase() + clean.slice(1);
  }
}
