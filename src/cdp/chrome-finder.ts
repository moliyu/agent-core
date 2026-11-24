import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export interface ChromeLocation {
  executablePath: string;
  source: "env" | "default-path" | "edge-fallback";
}

/**
 * 跨平台探测系统安装的 Chrome / Chromium / Edge 可执行路径
 */
export function findChromeExecutable(): ChromeLocation | null {
  // 1. 优先读取显式环境变量
  const envPath = process.env.CHROME_PATH || process.env.AGENT_CHROME_EXECUTABLE;
  if (envPath && fs.existsSync(envPath)) {
    return { executablePath: envPath, source: "env" };
  }

  const platform = process.platform;
  const candidates: { path: string; source: "default-path" | "edge-fallback" }[] = [];

  if (platform === "darwin") {
    // macOS
    candidates.push(
      { path: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", source: "default-path" },
      { path: path.join(os.homedir(), "Applications/Google Chrome.app/Contents/MacOS/Google Chrome"), source: "default-path" },
      { path: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge", source: "edge-fallback" },
      { path: "/Applications/Chromium.app/Contents/MacOS/Chromium", source: "default-path" }
    );
  } else if (platform === "win32") {
    // Windows
    const localAppData = process.env.LOCALAPPDATA || "";
    const programFiles = process.env.ProgramFiles || "C:\\Program Files";
    const programFilesX86 = process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)";

    candidates.push(
      { path: path.join(programFiles, "Google\\Chrome\\Application\\chrome.exe"), source: "default-path" },
      { path: path.join(programFilesX86, "Google\\Chrome\\Application\\chrome.exe"), source: "default-path" },
      { path: path.join(localAppData, "Google\\Chrome\\Application\\chrome.exe"), source: "default-path" },
      // Edge 兜底
      { path: path.join(programFilesX86, "Microsoft\\Edge\\Application\\msedge.exe"), source: "edge-fallback" },
      { path: path.join(programFiles, "Microsoft\\Edge\\Application\\msedge.exe"), source: "edge-fallback" }
    );
  } else {
    // Linux
    candidates.push(
      { path: "/usr/bin/google-chrome", source: "default-path" },
      { path: "/usr/bin/google-chrome-stable", source: "default-path" },
      { path: "/usr/bin/chromium", source: "default-path" },
      { path: "/usr/bin/chromium-browser", source: "default-path" },
      { path: "/snap/bin/chromium", source: "default-path" }
    );
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate.path)) {
      return { executablePath: candidate.path, source: candidate.source };
    }
  }

  return null;
}

/**
 * 尝试从指定的 user-data-dir 读取 DevToolsActivePort 文件获取实际绑定的随机端口
 */
export async function readDevToolsActivePort(userDataDir: string): Promise<{ port: number; browserWsEndpoint: string } | null> {
  const portFilePath = path.join(userDataDir, "DevToolsActivePort");
  try {
    if (!fs.existsSync(portFilePath)) {
      return null;
    }
    const content = await fs.promises.readFile(portFilePath, "utf-8");
    const [rawPort, rawPath] = content.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!rawPort || !rawPath) return null;
    const port = parseInt(rawPort, 10);
    if (isNaN(port) || port <= 0 || port > 65535) return null;

    return {
      port,
      browserWsEndpoint: `ws://127.0.0.1:${port}${rawPath}`,
    };
  } catch {
    return null;
  }
}
