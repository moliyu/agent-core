import fs from "node:fs";
import path from "node:path";

export interface OasisWorkspaceConfig {
  /** Chrome 远程调试端口，默认 9222 */
  port?: number;
  /** 目标页面 URL 匹配关键字或正则表达式，如 'oasis', 'ecrm' */
  urlMatch?: string;
  /** 编辑器默认打开的 URL 地址，如 'https://sitsprint18ide.tranzvision.com.cn/' */
  editorUrl?: string;
  /** 独立 Chrome 实例的 User Data 目录（相对于工作区根目录），默认 '.oasis-profile' */
  userDataDir?: string;
  /** 自举生成的组件 TypeScript 规范存放目录，默认 'components' */
  componentsDir?: string;
  /** 业务预设配置存放目录，默认 'presets' */
  presetsDir?: string;
}

export const DEFAULT_CONFIG: Required<OasisWorkspaceConfig> = {
  port: 9222,
  urlMatch: "oasis",
  editorUrl: "https://sitsprint18ide.tranzvision.com.cn/",
  userDataDir: ".oasis-profile",
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
   * 从当前工作目录或指定目录向上查找 oasis.config.json
   */
  public static findAndLoad(startDir: string = process.cwd()): WorkspaceContext {
    let current = path.resolve(startDir);
    while (true) {
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
      const parent = path.dirname(current);
      if (parent === current) {
        break;
      }
      current = parent;
    }

    // 未找到，以 startDir 为默认工作区
    return new WorkspaceContext(startDir);
  }

  /**
   * 获取组件代码资产目录绝对路径
   */
  public getComponentsDir(): string {
    const dir = path.resolve(this.rootDir, this.config.componentsDir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
  }

  /**
   * 获取预设配置目录绝对路径
   */
  public getPresetsDir(): string {
    const dir = path.resolve(this.rootDir, this.config.presetsDir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
  }

  /**
   * 获取独立 Chrome Profile 的绝对路径
   */
  public getUserDataDir(): string {
    const dir = path.resolve(this.rootDir, this.config.userDataDir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
  }
}
