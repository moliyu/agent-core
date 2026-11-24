import { describe, it, expect } from "vitest";
import { findChromeExecutable } from "../src/cdp/chrome-finder.js";
import { PageBridge } from "../src/bridge/page-bridge.js";

describe("agent-core smoke tests", () => {
  it("should be able to probe system Chrome or Edge", () => {
    const chrome = findChromeExecutable();
    // 本地应该能探测到系统的 Chrome 或 Edge
    expect(chrome).not.toBeNull();
    expect(chrome?.executablePath).toBeDefined();
    console.log("探测到的 Chrome 路径:", chrome);
  });

  it("PageBridge should construct safely with mock connection", () => {
    const mockConnection: any = {
      send: async () => ({}),
      isOpen: true,
    };
    const bridge = new PageBridge(mockConnection, "https://example.com");
    expect(bridge).toBeDefined();
    expect(bridge.targetUrl).toBe("https://example.com");
  });
});
