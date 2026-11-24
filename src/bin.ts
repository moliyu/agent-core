#!/usr/bin/env node

import { runCli } from "./cli/index.js";

runCli(process.argv).catch((err) => {
  console.error("[agent-core 致命错误]:", err);
  process.exit(1);
});
