import { ICdpConnection } from "../cdp/cdp-client.js";
import { NetworkMonitor } from "./network-monitor.js";

export interface EvaluateOptions {
  timeoutMs?: number;
  awaitPromise?: boolean;
  returnByValue?: boolean;
}

export interface PageFetchOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  timeoutMs?: number;
}

export interface PageFetchResult {
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  headers: Record<string, string>;
  data: unknown;
  truncated?: boolean;
}

const MAX_FETCH_TEXT_CHARS = 30000;

export class PageBridge {
  public readonly networkMonitor: NetworkMonitor;

  constructor(public readonly connection: ICdpConnection, public readonly targetUrl?: string) {
    this.networkMonitor = new NetworkMonitor(connection);
  }

  /**
   * 启用必要的 CDP 域（Runtime, Page, Network 等）
   */
  public async init(): Promise<void> {
    await this.connection.send("Runtime.enable");
    await this.connection.send("Page.enable");
    await this.networkMonitor.start();
  }

  /**
   * 在目标页面的主执行上下文中执行原生 JavaScript 表达式
   */
  public async evaluate<T = any>(expression: string, options: EvaluateOptions = {}): Promise<T> {
    const { timeoutMs = 10000, awaitPromise = true, returnByValue = true } = options;

    const res = await this.connection.send<{
      result: {
        type: string;
        value?: any;
        description?: string;
        objectId?: string;
      };
      exceptionDetails?: {
        text: string;
        exception?: { description?: string; value?: any };
      };
    }>(
      "Runtime.evaluate",
      {
        expression,
        returnByValue,
        awaitPromise,
        timeout: timeoutMs,
      },
      timeoutMs + 2000
    );

    if (res.exceptionDetails) {
      const desc =
        res.exceptionDetails.exception?.description ||
        res.exceptionDetails.exception?.value ||
        res.exceptionDetails.text;
      throw new Error(`页面脚本执行抛出异常: ${desc}`);
    }

    return res.result?.value;
  }

  /**
   * 安全调用挂载在页面 window 上的某个方法
   * 例如: bridge.callWindowMethod("myApp.getComponentTree")
   */
  public async callWindowMethod<T = any>(
    methodPath: string,
    args: any[] = [],
    options: EvaluateOptions = {}
  ): Promise<T> {
    // 构造安全的调用表达式，防止深层属性访问 undefined 崩溃
    const serializedArgs = JSON.stringify(args);
    const expression = `
      (async function() {
        const parts = ${JSON.stringify(methodPath)}.split('.');
        let curr = window;
        let parent = window;
        for (let i = 0; i < parts.length; i++) {
          parent = curr;
          curr = curr[parts[i]];
          if (curr === undefined || curr === null) {
            throw new Error("方法路径未找到: window." + parts.slice(0, i + 1).join('.'));
          }
        }
        if (typeof curr !== 'function') {
          throw new Error("目标不是函数: window." + ${JSON.stringify(methodPath)});
        }
        return await curr.apply(parent, ${serializedArgs});
      })()
    `;

    return this.evaluate<T>(expression, options);
  }

  /**
   * 等待页面上的某个条件为真（例如等待 window.myApp 初始化完成）
   */
  public async waitForFunction(
    predicateExpression: string,
    options: { timeoutMs?: number; intervalMs?: number } = {}
  ): Promise<void> {
    const { timeoutMs = 10000, intervalMs = 200 } = options;
    const start = Date.now();

    while (Date.now() - start < timeoutMs) {
      try {
        const ok = await this.evaluate<boolean>(`Boolean(${predicateExpression})`, {
          timeoutMs: intervalMs * 2,
        });
        if (ok) return;
      } catch {
        // 等待中可能抛错，继续重试
      }
      await new Promise((r) => setTimeout(r, intervalMs));
    }

    throw new Error(`等待条件超时 (${timeoutMs}ms): ${predicateExpression}`);
  }

  /**
   * 刷新页面
   */
  public async reload(ignoreCache = false): Promise<void> {
    await this.connection.send("Page.reload", { ignoreCache });
  }

  /**
   * 导航到新地址
   */
  public async navigate(url: string): Promise<void> {
    await this.connection.send("Page.navigate", { url });
  }

  /**
   * 在当前页面上下文中发起 HTTP 请求（支持 GET / POST 等，自动携带页面 Cookie 与同源鉴权状态）
   */
  public async fetch(options: PageFetchOptions): Promise<PageFetchResult> {
    const method = (options.method || "GET").toUpperCase();
    const timeoutMs = options.timeoutMs ?? 15000;
    const headers: Record<string, string> = { ...(options.headers || {}) };

    let serializedBody: string | undefined;
    if (options.body !== undefined && options.body !== null && method !== "GET") {
      if (typeof options.body === "string") {
        serializedBody = options.body;
      } else {
        serializedBody = JSON.stringify(options.body);
        const hasContentType = Object.keys(headers).some(
          (k) => k.toLowerCase() === "content-type"
        );
        if (!hasContentType) {
          headers["Content-Type"] = "application/json";
        }
      }
    }

    const expression = `
      (async function() {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), ${timeoutMs});
        try {
          const resp = await fetch(${JSON.stringify(options.url)}, {
            method: ${JSON.stringify(method)},
            headers: ${JSON.stringify(headers)},
            ${serializedBody !== undefined ? `body: ${JSON.stringify(serializedBody)},` : ""}
            credentials: "include",
            signal: controller.signal
          });
          const respHeaders = {};
          resp.headers.forEach((v, k) => { respHeaders[k] = v; });
          const text = await resp.text();
          const contentType = (resp.headers.get("content-type") || "").toLowerCase();
          let data = text;
          let truncated = false;
          if (contentType.includes("application/json")) {
            try {
              data = JSON.parse(text);
            } catch {
              if (text.length > ${MAX_FETCH_TEXT_CHARS}) {
                data = text.slice(0, ${MAX_FETCH_TEXT_CHARS});
                truncated = true;
              }
            }
          } else if (text.length > ${MAX_FETCH_TEXT_CHARS}) {
            data = text.slice(0, ${MAX_FETCH_TEXT_CHARS});
            truncated = true;
          }
          return {
            ok: resp.ok,
            status: resp.status,
            statusText: resp.statusText,
            url: resp.url,
            headers: respHeaders,
            data,
            ...(truncated ? { truncated: true } : {})
          };
        } finally {
          clearTimeout(timer);
        }
      })()
    `;

    return this.evaluate<PageFetchResult>(expression, { timeoutMs: timeoutMs + 2000 });
  }
}
