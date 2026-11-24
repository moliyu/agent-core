import { describe, it, expect } from "vitest";
import { SchemaExtractor } from "../src/bootstrap/schema-extractor.js";
import { TsGenerator } from "../src/bootstrap/ts-generator.js";

describe("Bootstrap Engine (SchemaExtractor & TsGenerator)", () => {
  it("should extract component properties, enums and infer correct TS types", () => {
    const rawComponent = {
      type: "Button",
      displayName: "按钮组件",
      isCanvas: false,
      tags: ["basic", "action"],
      localeData: {
        "Button.theme": "按钮主题",
        "Theme.primary": "主色",
        "Theme.danger": "危险红",
      },
      propertyConfigs: [
        {
          name: "基础配置",
          items: [
            {
              name: "label",
              label: "按钮文字",
              inputType: "InputText",
              initialValue: "提交",
              required: true,
            },
            {
              name: "theme",
              nameLocaleKey: "Button.theme",
              inputType: "Select",
              initialValue: "primary",
              inputDetails: {
                select: {
                  options: [
                    { label: "Theme.primary", value: "primary" },
                    { label: "Theme.danger", value: "danger" },
                    { label: "默认灰", value: "default" },
                  ],
                },
              },
            },
            {
              name: "disabled",
              label: "是否禁用",
              inputType: "Checkbox",
              initialValue: false,
            },
            {
              name: "width",
              label: "宽度",
              inputType: "InputNumber",
              initialValue: 120,
            },
          ],
        },
      ],
    };

    const extracted = SchemaExtractor.extractSingle(rawComponent);
    expect(extracted.type).toBe("Button");
    expect(extracted.displayName).toBe("按钮组件");
    expect(extracted.properties.length).toBe(4);

    const themeProp = extracted.properties.find((p) => p.name === "theme")!;
    expect(themeProp.label).toBe("按钮主题");
    expect(themeProp.enums).toEqual([
      { value: "primary", label: "主色" },
      { value: "danger", label: "危险红" },
      { value: "default", label: "默认灰" },
    ]);
    expect(themeProp.tsType).toBe('"primary" | "danger" | "default"');

    const disabledProp = extracted.properties.find((p) => p.name === "disabled")!;
    expect(disabledProp.tsType).toBe("boolean");

    const widthProp = extracted.properties.find((p) => p.name === "width")!;
    expect(widthProp.tsType).toBe("number");
  });

  it("should generate high-expressiveness TypeScript code with JSDoc and enums", () => {
    const extracted = {
      type: "Button",
      displayName: "按钮组件",
      isCanvas: false,
      tags: ["basic"],
      properties: [
        {
          name: "label",
          label: "按钮文本",
          tsType: "string",
          inputType: "InputText",
          defaultValue: "点击我",
        },
        {
          name: "theme",
          label: "主题样式",
          tsType: '"primary" | "danger" | "default"',
          inputType: "Select",
          defaultValue: "primary",
          enums: [
            { value: "primary", label: "主要" },
            { value: "danger", label: "危险" },
            { value: "default", label: "默认" },
          ],
        },
      ],
      defaultProps: {
        label: "点击我",
        theme: "primary",
      },
    };

    const code = TsGenerator.generateComponentFile(extracted);
    expect(code).toContain("export interface ButtonProps");
    expect(code).toContain('theme?: "primary" | "danger" | "default";');
    expect(code).toContain("export const buttonPresets = {");
    expect(code).toContain('"theme": "primary"');

    const indexCode = TsGenerator.generateIndexFile([extracted]);
    expect(indexCode).toContain('export type OasisComponentType = "Button";');
    expect(indexCode).toContain("export const OASIS_COMPONENT_CATALOG");
  });
});
