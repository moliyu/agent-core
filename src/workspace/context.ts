import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export const FIXED_USER_DATA_DIR_NAME = ".oasis-agent-profile";

export interface OasisWorkspaceConfig {
  /** Chrome 远程调试端口，默认 9222 */
  port?: number;
  /** 目标页面 URL 匹配关键字或正则表达式，如 'oasis', 'ecrm' */
  urlMatch?: string;
  /** 编辑器默认打开的 URL 地址，如 'https://sitsprint18ide.tranzvision.com.cn/' */
  editorUrl?: string;
  /** 自举生成的组件 TypeScript 规范存放目录，默认 'components' */
  componentsDir?: string;
  /** 业务预设配置存放目录，默认 'presets' */
  presetsDir?: string;
}

export const DEFAULT_CONFIG: Required<OasisWorkspaceConfig> = {
  port: 9222,
  urlMatch: "oasis",
  editorUrl: "",
  componentsDir: "components",
  presetsDir: "presets",
};

export class WorkspaceContext {
  public readonly rootDir: string;
  public config: Required<OasisWorkspaceConfig>;

  constructor(rootDir: string, config?: OasisWorkspaceConfig) {
    this.rootDir = path.resolve(rootDir);
    this.config = { ...DEFAULT_CONFIG, ...(config || {}) };
  }

  /**
   * 从当前工作目录或指定目录加载 oasis.config.json（不再向上级目录递归，避免被父级残留配置劫持）
   */
  public static findAndLoad(startDir: string = process.cwd()): WorkspaceContext {
    const current = path.resolve(startDir);
    const configPath = path.join(current, "oasis.config.json");
    if (fs.existsSync(configPath)) {
      try {
        const raw = fs.readFileSync(configPath, "utf-8");
        const parsed = JSON.parse(raw);
        return new WorkspaceContext(current, parsed);
      } catch (e: any) {
        console.warn(`[agent-core] 无法解析 ${configPath}，使用默认配置: ${e.message}`);
        return new WorkspaceContext(current);
      }
    }

    // 未找到，以 startDir 为工作区
    return new WorkspaceContext(current);
  }

  /**
   * 判断当前目录是否已初始化为 Oasis 工作区（存在 oasis.config.json）
   */
  public isInitialized(): boolean {
    return fs.existsSync(path.join(this.rootDir, "oasis.config.json"));
  }

  /**
   * 返回非工作区时的统一提示信息
   */
  public getUninitializedErrorMessage(): string {
    return `当前目录 (${this.rootDir}) 尚未初始化为 Oasis 工作区（未找到 oasis.config.json）。请先在该目录下运行 \`agent-core init\` 初始化。`;
  }

  /**
   * 获取组件代码资产目录绝对路径
   */
  public getComponentsDir(): string {
    const dir = path.resolve(this.rootDir, this.config.componentsDir);
    if (this.isInitialized() && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
  }

  /**
   * 获取预设配置目录绝对路径
   */
  public getPresetsDir(): string {
    const dir = path.resolve(this.rootDir, this.config.presetsDir);
    if (this.isInitialized() && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
  }

  /**
   * 获取独立 Chrome Profile 的绝对路径（固定为家目录下的 ~/.oasis-agent-profile，不开放配置）
   */
  public getUserDataDir(): string {
    const dir = path.join(os.homedir(), FIXED_USER_DATA_DIR_NAME);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
  }
}
