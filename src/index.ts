import {
  CdpConnection,
  BrowserConnection,
  ICdpConnection,
  listCdpTargets,
  getDevToolsActivePortInfo,
  CdpTarget,
} from "./cdp/cdp-client.js";
import { PageBridge } from "./bridge/page-bridge.js";

export interface ConnectOptions {
  port?: number;
  host?: string;
  /**
   * 优先重连的上一次操作页 targetId
   */
  preferredTargetId?: string;
  /**
   * 排除的 targetId 列表（如已确认非画布的标签页）
   */
  excludeTargetIds?: string[];
  /**
   * 自动过滤目标 Tab：可以用字符串包含或正则表达式匹配 URL / 标题
   */
  targetFilter?: (target: CdpTarget) => boolean;
  timeoutMs?: number;
}

/**
 * 判断标签页是否为非编辑态辅助页（DevTools、内置页、预览页）
 */
export function isNonEditorTarget(target: CdpTarget): boolean {
  try {
    const u = new URL(target.url);
    if (u.protocol === "devtools:" || u.protocol === "chrome:") {
      return true;
    }
    if (u.pathname === "/preview" || u.pathname.endsWith("/preview")) {
      return true;
    }
  } catch {
    // ignore invalid URL
  }
  return target.url === "about:blank";
}

export class OasisAgentCore {
  private connection: ICdpConnection | null = null;
  private bridge: PageBridge | null = null;

  constructor(public readonly options: ConnectOptions = {}) {}

  /**
   * 静态快速连接方法
   */
  public static async connect(options: ConnectOptions = {}): Promise<PageBridge> {
    const instance = new OasisAgentCore(options);
    return instance.init();
  }

  /**
   * 初始化并连接到目标标签页
   */
  public async init(): Promise<PageBridge> {
    const port = this.options.port ?? 9222;
    const host = this.options.host ?? "127.0.0.1";
    const timeoutMs = this.options.timeoutMs ?? 5000;

    // 优先从指定端口的 HTTP /json/list 获取当前活跃页面
    const targets = await listCdpTargets(port, host, timeoutMs);
    const excluded = new Set(this.options.excludeTargetIds ?? []);
    const pages = targets.filter(
      (t) => t.type === "page" && t.webSocketDebuggerUrl && !excluded.has(t.id)
    );
    if (pages.length === 0) {
      throw new Error(`在 http://${host}:${port} 未找到可连接的网页标签页 (targets count: ${targets.length})`);
    }

    const editorCandidates = pages.filter((p) => !isNonEditorTarget(p));
    const searchPool = editorCandidates.length > 0 ? editorCandidates : pages;

    let target: CdpTarget | undefined;
    if (this.options.preferredTargetId) {
      target = searchPool.find((p) => p.id === this.options.preferredTargetId);
    }

    if (!target && this.options.targetFilter) {
      target = searchPool.find(this.options.targetFilter);
    }

    if (!target) {
      // 智能识别 Oasis / 低代码 / IDE / 平台页面
      target = searchPool.find((p) => {
        const text = (p.title + " " + p.url).toLowerCase();
        return (
          text.includes("oasis") ||
          text.includes("ide") ||
          text.includes("tranzvision") ||
          text.includes("ecrm") ||
          text.includes("devide") ||
          text.includes("platform")
        );
      });
    }

    if (!target) {
      // 排除内部调试页面与 about:blank，若用户只打开了一个常规网页，直接选用
      const realPages = searchPool.filter(
        (p) => !p.url.startsWith("chrome://") && p.url !== "about:blank"
      );
      if (realPages.length === 1) {
        target = realPages[0];
      }
    }

    if (!target) {
      target =
        searchPool.find((p) => !p.url.startsWith("chrome://") && p.url !== "about:blank") ||
        searchPool[0];
    }

    if (!target.webSocketDebuggerUrl) {
      throw new Error(`目标标签页缺少 webSocketDebuggerUrl: ${target.title}`);
    }

    const directConn = new CdpConnection(target.webSocketDebuggerUrl, target.id);
    await directConn.connect(timeoutMs);
    this.connection = directConn;

    this.bridge = new PageBridge(directConn, target.url, target.id);
    await this.bridge.init();

    return this.bridge;
  }

  public getBridge(): PageBridge {
    if (!this.bridge) {
      throw new Error("尚未连接，请先调用 init()");
    }
    return this.bridge;
  }

  public close(): void {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
    this.bridge = null;
  }
}

export * from "./cdp/index.js";
export * from "./bridge/index.js";
export * from "./tools/index.js";
export * from "./github/index.js";
export * from "./mcp/server.js";
