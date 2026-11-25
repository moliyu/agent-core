import { describe, it, expect } from "vitest";
import { NetworkMonitor } from "../src/bridge/network-monitor.js";
import { PageBridge } from "../src/bridge/page-bridge.js";
import { ICdpConnection } from "../src/cdp/cdp-client.js";

function createMockConnection() {
  const listeners = new Map<string, Set<(params: any) => void>>();
  const sent: Array<{ method: string; params?: Record<string, any> }> = [];
  let mockResponseBody: { body: string; base64Encoded: boolean } = {
    body: '{"ok":true}',
    base64Encoded: false,
  };
  let mockEvaluateResult: any = {
    ok: true,
    status: 200,
    statusText: "OK",
    url: "https://example.com/api/test",
    headers: {},
    data: { items: [] },
  };

  const connection: ICdpConnection = {
    async send<T = any>(method: string, params?: Record<string, any>): Promise<T> {
      sent.push({ method, params });
      if (method === "Network.getResponseBody") {
        return mockResponseBody as any;
      }
      if (method === "Runtime.evaluate") {
        return { result: { type: "object", value: mockEvaluateResult } } as any;
      }
      return {} as any;
    },
    on(event: string, listener: (params: any) => void): () => void {
      if (!listeners.has(event)) {
        listeners.set(event, new Set());
      }
      listeners.get(event)!.add(listener);
      return () => {
        listeners.get(event)?.delete(listener);
      };
    },
    close() {},
  };

  const emit = (event: string, params: any) => {
    for (const listener of listeners.get(event) || []) {
      listener(params);
    }
  };

  return {
    connection,
    sent,
    emit,
    setMockResponseBody(val: { body: string; base64Encoded: boolean }) {
      mockResponseBody = val;
    },
    setMockEvaluateResult(val: any) {
      mockEvaluateResult = val;
    },
  };
}

describe("NetworkMonitor & PageBridge.fetch", () => {
  it("should capture XHR/Fetch requests, ignore static assets, and fetch response body on detail", async () => {
    const mock = createMockConnection();
    const monitor = new NetworkMonitor(mock.connection, 3);
    await monitor.start();

    expect(mock.sent.some((s) => s.method === "Network.enable")).toBe(true);

    // Static asset should be ignored
    mock.emit("Network.requestWillBeSent", {
      requestId: "img-1",
      type: "Image",
      request: { url: "https://example.com/logo.png", method: "GET" },
    });

    // POST XHR should be captured
    mock.emit("Network.requestWillBeSent", {
      requestId: "xhr-1",
      type: "XHR",
      request: {
        url: "https://example.com/com/SalesOrder/query",
        method: "POST",
        postData: '{"page":1}',
        headers: { "Content-Type": "application/json" },
      },
    });
    mock.emit("Network.responseReceived", {
      requestId: "xhr-1",
      response: { status: 200, statusText: "OK", mimeType: "application/json" },
    });
    mock.emit("Network.loadingFinished", {
      requestId: "xhr-1",
      encodedDataLength: 128,
    });

    const list = monitor.listEntries({ method: "POST" });
    expect(list).toHaveLength(1);
    expect(list[0].requestId).toBe("xhr-1");
    expect(list[0].status).toBe(200);
    expect(list[0].hasPostData).toBe(true);

    const detail = await monitor.getEntryDetail("xhr-1");
    expect(detail.postData).toBe('{"page":1}');
    expect(detail.responseBody).toBe('{"ok":true}');

    // Ring buffer eviction (maxEntries = 3)
    for (const id of ["f-2", "f-3", "f-4"]) {
      mock.emit("Network.requestWillBeSent", {
        requestId: id,
        type: "Fetch",
        request: { url: `https://example.com/api/${id}`, method: "GET" },
      });
    }
    const afterEvict = monitor.listEntries({ limit: 10 });
    expect(afterEvict).toHaveLength(3);
    expect(afterEvict.map((e) => e.requestId)).toEqual(["f-4", "f-3", "f-2"]);

    monitor.clear();
    expect(monitor.listEntries()).toHaveLength(0);
    monitor.stop();
  });

  it("should evaluate fetch with JSON serialization in PageBridge.fetch", async () => {
    const mock = createMockConnection();
    const bridge = new PageBridge(mock.connection);
    await bridge.init();

    const res = await bridge.fetch({
      url: "/com/bm/be/query",
      method: "POST",
      body: { keyword: "test" },
    });

    expect(res.ok).toBe(true);
    expect(res.status).toBe(200);
    const evalCall = mock.sent.find((s) => s.method === "Runtime.evaluate");
    expect(evalCall?.params?.expression).toContain("/com/bm/be/query");
    expect(evalCall?.params?.expression).toContain("Content-Type");
    expect(evalCall?.params?.expression).toContain('credentials: "include"');
  });
});
