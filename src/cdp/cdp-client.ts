import WebSocket from "ws";
import fs from "fs";
import path from "path";
import os from "os";

export interface CdpTarget {
  id: string;
  type: string;
  title: string;
  url: string;
  webSocketDebuggerUrl?: string;
  devtoolsFrontendUrl?: string;
}

export interface ICdpConnection {
  send<T = any>(method: string, params?: Record<string, any>, timeoutMs?: number): Promise<T>;
  on(event: string, listener: (params: any) => void): () => void;
  close(): void;
}

export class CdpConnection implements ICdpConnection {
  private ws: WebSocket | null = null;
  private nextId = 1;
  private pending = new Map<number, { resolve: (res: any) => void; reject: (err: Error) => void }>();
  private eventListeners = new Map<string, Set<(params: any) => void>>();

  constructor(public readonly wsUrl: string, public readonly targetId?: string) {}

  public async connect(timeoutMs = 5000): Promise<void> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.close();
        reject(new Error(`连接 CDP WebSocket 超时 (${timeoutMs}ms): ${this.wsUrl}`));
      }, timeoutMs);

      try {
        this.ws = new WebSocket(this.wsUrl);
      } catch (err) {
        clearTimeout(timer);
        reject(err);
        return;
      }

      let connected = false;
      this.ws.on("open", () => {
        connected = true;
        clearTimeout(timer);
        resolve();
      });

      this.ws.on("message", (data: WebSocket.RawData) => {
        try {
          const message = JSON.parse(data.toString());
          if ("id" in message) {
            const handler = this.pending.get(message.id);
            if (handler) {
              this.pending.delete(message.id);
              if (message.error) {
                handler.reject(new Error(`CDP Error [${message.error.code}]: ${message.error.message}`));
              } else {
                handler.resolve(message.result);
              }
            }
          } else if ("method" in message) {
            const listeners = this.eventListeners.get(message.method);
            if (listeners) {
              for (const listener of listeners) {
                try {
                  listener(message.params);
                } catch (e) {
                  console.error(`Error in event listener for ${message.method}:`, e);
                }
              }
            }
          }
        } catch (e) {
          console.error("解析 CDP 消息失败:", e);
        }
      });

      this.ws.on("error", (err) => {
        clearTimeout(timer);
        this.rejectAllPending(err);
        if (!connected) {
          reject(err);
        }
      });

      this.ws.on("close", () => {
        clearTimeout(timer);
        this.rejectAllPending(new Error("CDP 连接已关闭"));
        if (!connected) {
          reject(new Error("CDP 连接已关闭"));
        }
      });
    });
  }

  public get isOpen(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  public async send<T = any>(method: string, params: Record<string, any> = {}, timeoutMs = 10000): Promise<T> {
    if (!this.isOpen || !this.ws) {
      throw new Error(`无法发送指令 [${method}]：CDP 连接未建立或已断开`);
    }

    const id = this.nextId++;
    const payload = JSON.stringify({ id, method, params });

    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`CDP 命令调用超时 (${timeoutMs}ms): ${method}`));
      }, timeoutMs);

      this.pending.set(id, {
        resolve: (val) => {
          clearTimeout(timer);
          resolve(val);
        },
        reject: (err) => {
          clearTimeout(timer);
          reject(err);
        },
      });

      this.ws!.send(payload, (err) => {
        if (err) {
          clearTimeout(timer);
          this.pending.delete(id);
          reject(err);
        }
      });
    });
  }

  public on(event: string, listener: (params: any) => void): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(listener);
    return () => {
      this.eventListeners.get(event)?.delete(listener);
    };
  }

  public close(): void {
    if (this.ws) {
      try {
        this.ws.close();
      } catch {
        // ignore
      }
      this.ws = null;
    }
    this.rejectAllPending(new Error("CDP 连接已由客户端主动关闭"));
  }

  private rejectAllPending(err: Error): void {
    for (const { reject } of this.pending.values()) {
      reject(err);
    }
    this.pending.clear();
  }
}

/**
 * 代表一个附加到目标 Page 的会话（扁平模式）
 */
export class CdpSession implements ICdpConnection {
  private eventListeners = new Map<string, Set<(params: any) => void>>();

  constructor(
    public readonly browser: BrowserConnection,
    public readonly sessionId: string,
    public readonly targetId: string
  ) {}

  public async send<T = any>(method: string, params: Record<string, any> = {}, timeoutMs = 10000): Promise<T> {
    return this.browser.sendToSession<T>(this.sessionId, method, params, timeoutMs);
  }

  public on(event: string, listener: (params: any) => void): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(listener);
    return () => {
      this.eventListeners.get(event)?.delete(listener);
    };
  }

  public dispatchEvent(method: string, params: any): void {
    const listeners = this.eventListeners.get(method);
    if (listeners) {
      for (const listener of listeners) {
        try {
          listener(params);
        } catch (e) {
          console.error(`Error in session event listener for ${method}:`, e);
        }
      }
    }
  }

  public close(): void {
    this.browser.detachSession(this.sessionId).catch(() => {});
  }
}

/**
 * 连接到浏览器全局 WebSocket（DevToolsActivePort 机制）
 */
export class BrowserConnection {
  private ws: WebSocket | null = null;
  private nextId = 1;
  private pending = new Map<number, { resolve: (res: any) => void; reject: (err: Error) => void }>();
  private sessions = new Map<string, CdpSession>();

  constructor(public readonly wsUrl: string) {}

  public async connect(timeoutMs = 5000): Promise<void> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.close();
        reject(new Error(`连接浏览器 WebSocket 超时 (${timeoutMs}ms): ${this.wsUrl}`));
      }, timeoutMs);

      try {
        this.ws = new WebSocket(this.wsUrl);
      } catch (err) {
        clearTimeout(timer);
        reject(err);
        return;
      }

      let connected = false;
      this.ws.on("open", () => {
        connected = true;
        clearTimeout(timer);
        resolve();
      });

      this.ws.on("message", (data: WebSocket.RawData) => {
        try {
          const message = JSON.parse(data.toString());
          if ("id" in message) {
            const handler = this.pending.get(message.id);
            if (handler) {
              this.pending.delete(message.id);
              if (message.error) {
                handler.reject(new Error(`CDP Error [${message.error.code}]: ${message.error.message}`));
              } else {
                handler.resolve(message.result);
              }
            }
          } else if ("sessionId" in message && "method" in message) {
            const session = this.sessions.get(message.sessionId);
            if (session) {
              session.dispatchEvent(message.method, message.params);
            }
          }
        } catch (e) {
          console.error("解析 Browser CDP 消息失败:", e);
        }
      });

      this.ws.on("error", (err) => {
        clearTimeout(timer);
        this.rejectAll(err);
        if (!connected) {
          reject(err);
        }
      });

      this.ws.on("close", () => {
        clearTimeout(timer);
        this.rejectAll(new Error("浏览器 CDP 连接已关闭"));
        if (!connected) {
          reject(new Error("浏览器 CDP 连接已关闭"));
        }
      });
    });
  }

  public async send<T = any>(
    method: string,
    params: Record<string, any> = {},
    sessionId?: string,
    timeoutMs = 10000
  ): Promise<T> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error(`浏览器 CDP 连接未打开`);
    }

    const id = this.nextId++;
    const payload: any = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;

    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`CDP 命令调用超时 (${timeoutMs}ms): ${method}`));
      }, timeoutMs);

      this.pending.set(id, {
        resolve: (val) => {
          clearTimeout(timer);
          resolve(val);
        },
        reject: (err) => {
          clearTimeout(timer);
          reject(err);
        },
      });

      this.ws!.send(JSON.stringify(payload), (err) => {
        if (err) {
          clearTimeout(timer);
          this.pending.delete(id);
          reject(err);
        }
      });
    });
  }

  public async sendToSession<T = any>(
    sessionId: string,
    method: string,
    params: Record<string, any> = {},
    timeoutMs = 10000
  ): Promise<T> {
    return this.send<T>(method, params, sessionId, timeoutMs);
  }

  public async getTargets(): Promise<CdpTarget[]> {
    const res = await this.send<{ targetInfos: any[] }>("Target.getTargets");
    return (res.targetInfos || []).map((t) => ({
      id: t.targetId,
      type: t.type,
      title: t.title,
      url: t.url,
      devtoolsFrontendUrl: t.devtoolsFrontendUrl,
    }));
  }

  public async attachToTarget(targetId: string): Promise<CdpSession> {
    const res = await this.send<{ sessionId: string }>("Target.attachToTarget", {
      targetId,
      flatten: true,
    });
    const session = new CdpSession(this, res.sessionId, targetId);
    this.sessions.set(res.sessionId, session);
    return session;
  }

  public async detachSession(sessionId: string): Promise<void> {
    this.sessions.delete(sessionId);
    try {
      await this.send("Target.detachFromTarget", { sessionId });
    } catch {
      // ignore
    }
  }

  public close(): void {
    if (this.ws) {
      try {
        this.ws.close();
      } catch {}
      this.ws = null;
    }
    this.rejectAll(new Error("浏览器 CDP 连接已主动断开"));
  }

  private rejectAll(err: Error): void {
    for (const { reject } of this.pending.values()) {
      reject(err);
    }
    this.pending.clear();
  }
}

/**
 * 寻找本地系统中运行中浏览器写入的 DevToolsActivePort 文件
 */
export function getDevToolsActivePortInfo(): { port: number; browserWsUrl: string } | null {
  const home = os.homedir();
  const candidates = [
    path.join(home, "Library/Application Support/Google/Chrome/DevToolsActivePort"),
    path.join(home, "Library/Application Support/Google/Chrome Canary/DevToolsActivePort"),
    path.join(home, "Library/Application Support/Microsoft Edge/DevToolsActivePort"),
    path.join(home, ".config/google-chrome/DevToolsActivePort"),
    "/tmp/oasis-debug-profile/DevToolsActivePort",
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      try {
        const content = fs.readFileSync(candidate, "utf-8").trim().split("\n");
        if (content.length >= 2) {
          const port = parseInt(content[0].trim(), 10);
          const browserPath = content[1].trim();
          if (port && browserPath.startsWith("/")) {
            return {
              port,
              browserWsUrl: `ws://127.0.0.1:${port}${browserPath}`,
            };
          }
        }
      } catch {}
    }
  }

  return null;
}

/**
 * 查询指定端口暴露的所有 CDP 目标（标签页、扩展后台等）
 */
export async function listCdpTargets(port: number, host = "127.0.0.1", timeoutMs = 3000): Promise<CdpTarget[]> {
  const url = `http://${host}:${port}/json/list`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} when fetching ${url}`);
    }
    const list = (await res.json()) as CdpTarget[];
    return list;
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error(`连接 http://${host}:${port}/json/list 超时 (${timeoutMs}ms)`);
    }
    throw new Error(`无法连接到 Chrome 调试端口 ${port}: ${err.message}`);
  } finally {
    clearTimeout(timer);
  }
}
