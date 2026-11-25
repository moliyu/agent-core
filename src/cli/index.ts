import { runInit } from "./init.js";
import { ChromeLauncher } from "../cdp/chrome-launcher.js";
import { WorkspaceContext } from "../workspace/context.js";
import { startMcpServer } from "../mcp/server.js";

export async function runCli(argv: string[]): Promise<void> {
  const command = argv[2] || "mcp";

  // 参数解析辅助
  const getArgValue = (prefix: string): string | undefined => {
    const item = argv.find((a) => a.startsWith(prefix));
    return item ? item.slice(prefix.length) : undefined;
  };

  const portVal = getArgValue("--port=");
  const port = portVal ? parseInt(portVal, 10) : undefined;
  const urlMatch = getArgValue("--url=");

  if (command === "init") {
    const extraArg = argv[3] && !argv[3].startsWith("--") ? argv[3] : undefined;
    if (extraArg) {
      console.error(
        `[agent-core] init 仅在当前工作目录初始化，不支持创建子目录 "${extraArg}"。请先 cd 到目标目录后再执行 agent-core init。`
      );
      process.exit(1);
    }
    runInit({ port, urlMatch });
    return;
  }

  if (command === "launch-chrome") {
    const workspace = WorkspaceContext.findAndLoad();
    const effectivePort = port ?? workspace.config.port;
    const userDataDir = workspace.getUserDataDir();

    console.log(`[agent-core] 正在启动独立调试 Chrome (端口: ${effectivePort}, Profile: ${userDataDir})...`);
    const status = await ChromeLauncher.ensureRunning({
      port: effectivePort,
      userDataDir,
    });

    if (status.alreadyRunning) {
      console.log(`[agent-core] 独立 Chrome 实例已在运行中 (端口: ${effectivePort})。`);
    } else {
      console.log(`[agent-core] 独立 Chrome 启动成功！请在浏览器中打开 Oasis 编辑器页面。`);
    }
    return;
  }

  if (command === "mcp" || command === "start") {
    const workspace = WorkspaceContext.findAndLoad();
    const effectivePort = port ?? workspace.config.port;
    const effectiveMatch = urlMatch ?? workspace.config.urlMatch;

    await startMcpServer({
      port: effectivePort,
      urlMatch: effectiveMatch,
    });
    return;
  }

  if (command === "--help" || command === "-h" || command === "help") {
    console.log(`
Oasis Agent Core - Universal UI Editor Bridge & MCP Server

使用方式:
  agent-core <command> [options]

常用命令:
  init              在当前工作目录初始化工作区（生成 oasis.config.json, tsconfig.json 与组件规范目录）
  launch-chrome     拉起独立免弹窗调试 Chrome (指定用户 Profile，免除频繁登录)
  mcp               以当前工作区为上下文，启动标准 MCP (Model Context Protocol) 服务

通用选项:
  --port=<number>   指定 Chrome 调试端口 (默认: 9222)
  --url=<string>    指定匹配的目标 Tab URL 关键字 (默认: "oasis")
`);
    return;
  }

  console.error(`未知命令: "${command}"。请使用 --help 查看支持的命令。`);
  process.exit(1);
}
