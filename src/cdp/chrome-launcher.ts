import http from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import { findChromeExecutable } from "./chrome-finder.js";

export interface ChromeLauncherOptions {
  port?: number;
  host?: string;
  userDataDir: string;
  executablePath?: string;
  targetUrl?: string;
  headless?: boolean;
}

export class ChromeLauncher {
  /**
   * 检查指定端口是否已提供 Chrome DevTools 服务
   */
  public static async isPortListening(port: number, host = "127.0.0.1", timeoutMs = 800): Promise<boolean> {
    return new Promise((resolve) => {
      const req = http.get(
        {
          host,
          port,
          path: "/json/version",
          timeout: timeoutMs,
        },
        (res) => {
          if (res.statusCode === 200) {
            res.resume();
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );

      req.on("error", () => resolve(false));
      req.on("timeout", () => {
        req.destroy();
        resolve(false);
      });
    });
  }

  /**
   * 拉起独立的 Chrome 实例
   */
  public static launch(options: ChromeLauncherOptions): { pid: number | undefined } {
    const port = options.port ?? 9222;
    if (!options.userDataDir) {
      throw new Error("必须显式指定 Chrome 的 userDataDir（例如来自 workspace.getUserDataDir()）");
    }
    const userDataDir = path.resolve(options.userDataDir);

    if (!fs.existsSync(userDataDir)) {
      fs.mkdirSync(userDataDir, { recursive: true });
    }

    const execInfo = options.executablePath
      ? { executablePath: options.executablePath, source: "custom" }
      : findChromeExecutable();

    if (!execInfo) {
      throw new Error(
        "未能检测到系统 Chrome 安装路径。请通过环境变量 CHROME_PATH 指定 Chrome 可执行文件。"
      );
    }

    const args = [
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${userDataDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-blink-features=AutomationControlled",
      "--test-type",
    ];

    if (options.headless) {
      args.push("--headless=new");
    }

    if (options.targetUrl) {
      args.push(options.targetUrl);
    }

    const child = spawn(execInfo.executablePath, args, {
      detached: true,
      stdio: "ignore",
    });

    child.unref();

    return { pid: child.pid };
  }

  /**
   * 确保 Chrome 已经在运行并开启远程调试
   */
  public static async ensureRunning(
    options: ChromeLauncherOptions,
    waitTimeoutMs = 12000
  ): Promise<{ alreadyRunning: boolean; port: number }> {
    const port = options.port ?? 9222;
    const host = options.host ?? "127.0.0.1";

    // 1. 如果已在监听，直接复用
    const already = await this.isPortListening(port, host);
    if (already) {
      return { alreadyRunning: true, port };
    }

    // 2. 否则启动独立实例
    this.launch(options);

    // 3. 轮询等待就绪
    const startTime = Date.now();
    while (Date.now() - startTime < waitTimeoutMs) {
      await new Promise((r) => setTimeout(r, 400));
      const ok = await this.isPortListening(port, host);
      if (ok) {
        return { alreadyRunning: false, port };
      }
    }

    throw new Error(
      `Chrome 启动超时：在 ${waitTimeoutMs}ms 内未能连通 http://${host}:${port}/json/version`
    );
  }
}
