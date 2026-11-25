import { ICdpConnection } from "../cdp/cdp-client.js";

export interface NetworkRequestEntry {
  requestId: string;
  url: string;
  method: string;
  resourceType: string;
  timestamp: number;
  status?: number;
  statusText?: string;
  mimeType?: string;
  durationMs?: number;
  finished: boolean;
  failed?: boolean;
  errorText?: string;
  postData?: string;
  requestHeaders?: Record<string, string>;
  responseHeaders?: Record<string, string>;
  encodedDataLength?: number;
}

export interface NetworkListOptions {
  urlFilter?: string;
  method?: string;
  limit?: number;
}

export interface NetworkDetailResult extends NetworkRequestEntry {
  responseBody?: string;
  base64Encoded?: boolean;
  bodyTruncated?: boolean;
  bodyError?: string;
}

const MAX_RESPONSE_BODY_CHARS = 20000;
const CAPTURED_RESOURCE_TYPES = new Set(["XHR", "Fetch"]);

/**
 * 基于 CDP Network 域的轻量页面接口监听缓冲器（默认仅记录 XHR / Fetch）
 */
export class NetworkMonitor {
  private entries = new Map<string, NetworkRequestEntry>();
  private order: string[] = [];
  private unsubscribers: Array<() => void> = [];
  private started = false;

  constructor(
    private readonly connection: ICdpConnection,
    private readonly maxEntries = 200
  ) {}

  public async start(): Promise<void> {
    if (this.started) return;
    this.started = true;

    this.unsubscribers.push(
      this.connection.on("Network.requestWillBeSent", (params) => {
        const resourceType = String(params?.type || "");
        if (!CAPTURED_RESOURCE_TYPES.has(resourceType)) return;

        const requestId = String(params?.requestId || "");
        if (!requestId) return;

        const entry: NetworkRequestEntry = {
          requestId,
          url: String(params?.request?.url || ""),
          method: String(params?.request?.method || "GET").toUpperCase(),
          resourceType,
          timestamp: Date.now(),
          finished: false,
          postData:
            typeof params?.request?.postData === "string"
              ? params.request.postData
              : undefined,
          requestHeaders: params?.request?.headers,
        };

        if (!this.entries.has(requestId)) {
          this.order.push(requestId);
        }
        this.entries.set(requestId, entry);
        this.evictIfNeeded();
      }),

      this.connection.on("Network.responseReceived", (params) => {
        const requestId = String(params?.requestId || "");
        const entry = this.entries.get(requestId);
        if (!entry) return;

        entry.status = params?.response?.status;
        entry.statusText = params?.response?.statusText;
        entry.mimeType = params?.response?.mimeType;
        entry.responseHeaders = params?.response?.headers;
      }),

      this.connection.on("Network.loadingFinished", (params) => {
        const requestId = String(params?.requestId || "");
        const entry = this.entries.get(requestId);
        if (!entry) return;

        entry.finished = true;
        entry.durationMs = Date.now() - entry.timestamp;
        entry.encodedDataLength = params?.encodedDataLength;
      }),

      this.connection.on("Network.loadingFailed", (params) => {
        const requestId = String(params?.requestId || "");
        const entry = this.entries.get(requestId);
        if (!entry) return;

        entry.finished = true;
        entry.failed = true;
        entry.errorText = params?.errorText;
        entry.durationMs = Date.now() - entry.timestamp;
      })
    );

    await this.connection.send("Network.enable");
  }

  public stop(): void {
    for (const unsub of this.unsubscribers) {
      unsub();
    }
    this.unsubscribers = [];
    this.started = false;
  }

  public clear(): void {
    this.entries.clear();
    this.order = [];
  }

  public listEntries(options: NetworkListOptions = {}): Array<{
    requestId: string;
    method: string;
    url: string;
    resourceType: string;
    status?: number;
    finished: boolean;
    failed?: boolean;
    errorText?: string;
    durationMs?: number;
    hasPostData: boolean;
    timestamp: string;
  }> {
    const limit = Math.min(Math.max(options.limit ?? 20, 1), 100);
    const urlFilter = options.urlFilter?.toLowerCase();
    const methodFilter = options.method?.toUpperCase();

    const matched: NetworkRequestEntry[] = [];
    for (let i = this.order.length - 1; i >= 0; i--) {
      const entry = this.entries.get(this.order[i]);
      if (!entry) continue;
      if (urlFilter && !entry.url.toLowerCase().includes(urlFilter)) continue;
      if (methodFilter && entry.method !== methodFilter) continue;
      matched.push(entry);
      if (matched.length >= limit) break;
    }

    return matched.map((e) => ({
      requestId: e.requestId,
      method: e.method,
      url: e.url,
      resourceType: e.resourceType,
      status: e.status,
      finished: e.finished,
      ...(e.failed ? { failed: true, errorText: e.errorText } : {}),
      ...(e.durationMs !== undefined ? { durationMs: e.durationMs } : {}),
      hasPostData: Boolean(e.postData),
      timestamp: new Date(e.timestamp).toISOString(),
    }));
  }

  public async getEntryDetail(requestId: string): Promise<NetworkDetailResult> {
    const entry = this.entries.get(requestId);
    if (!entry) {
      throw new Error(`未找到 requestId=${requestId} 的网络请求记录（可能已被环形缓冲区淘汰或尚未捕获）`);
    }

    const detail: NetworkDetailResult = { ...entry };
    try {
      const res = await this.connection.send<{ body: string; base64Encoded: boolean }>(
        "Network.getResponseBody",
        { requestId }
      );
      let text = res.base64Encoded
        ? Buffer.from(res.body, "base64").toString("utf-8")
        : res.body;

      if (text.length > MAX_RESPONSE_BODY_CHARS) {
        text = text.slice(0, MAX_RESPONSE_BODY_CHARS);
        detail.bodyTruncated = true;
      }
      detail.responseBody = text;
      detail.base64Encoded = res.base64Encoded;
    } catch (err: any) {
      detail.bodyError = err?.message || "无法获取响应体";
    }

    return detail;
  }

  private evictIfNeeded(): void {
    while (this.order.length > this.maxEntries) {
      const oldestId = this.order.shift();
      if (oldestId) {
        this.entries.delete(oldestId);
      }
    }
  }
}
