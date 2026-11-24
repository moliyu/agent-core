import fs from "node:fs";
import path from "node:path";
import { OasisEditorBridge } from "../bridge/oasis-editor-bridge.js";
import { SchemaExtractor, ExtractedComponent } from "./schema-extractor.js";
import { TsGenerator } from "./ts-generator.js";
import { WorkspaceContext } from "../workspace/context.js";

export interface BootstrapResult {
  total: number;
  components: ExtractedComponent[];
  outputDir: string;
}

export class OasisBootstrapper {
  /**
   * 从正在运行的编辑器 Bridge 自举提取全量组件资产，并生成 TypeScript 规范代码写入工作区
   */
  public static async bootstrap(
    editor: OasisEditorBridge,
    workspace: WorkspaceContext
  ): Promise<BootstrapResult> {
    const outputDir = workspace.getComponentsDir();

    // 1. 调用 Bridge 读取全量组件元数据
    const metaRes = await editor.getComponentMetadata();
    const rawList = metaRes?.components || [];

    if (rawList.length === 0) {
      // 尝试通过 listComponents 获取
      const listRes = await editor.listComponents();
      const fallbackList = listRes?.components || [];
      if (fallbackList.length === 0) {
        throw new Error("未能从当前 Oasis 页面中检索到任何注册组件，请确认页面已进入 UI 编辑模式。");
      }
    }

    // 2. 清洗并提取结构化元数据
    const extractedList = SchemaExtractor.extractAll(rawList);

    // 3. 生成各个组件的 .ts 文件
    for (const comp of extractedList) {
      const code = TsGenerator.generateComponentFile(comp);
      const safeFileName = `${comp.type.replace(/[^a-zA-Z0-9_$]/g, "_")}.ts`;
      const filePath = path.join(outputDir, safeFileName);
      fs.writeFileSync(filePath, code, "utf-8");
    }

    // 4. 生成统一入口 index.ts
    const indexCode = TsGenerator.generateIndexFile(extractedList);
    fs.writeFileSync(path.join(outputDir, "index.ts"), indexCode, "utf-8");

    return {
      total: extractedList.length,
      components: extractedList,
      outputDir,
    };
  }
}
