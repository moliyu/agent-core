import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { runInit } from "../src/cli/init.js";
import { WorkspaceContext } from "../src/workspace/context.js";

describe("Workspace & CLI Init", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "oasis-workspace-test-"));
  });

  afterEach(() => {
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("should initialize a complete oasis workspace structure", () => {
    const res = runInit({ targetDir: tmpDir, port: 9333, urlMatch: "custom-match" });
    expect(res.targetDir).toBe(tmpDir);

    expect(fs.existsSync(path.join(tmpDir, "oasis.config.json"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "tsconfig.json"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, ".gitignore"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "components/README.md"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "components/Text.ts"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "components/Tag.ts"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "components/Button.ts"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "components/Container.ts"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "components/COMPONENTS.md"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "AGENTS.md"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, ".agents/skills/oasis-blank-canvas/SKILL.md"))).toBe(true);
    expect(fs.existsSync(path.join(tmpDir, "presets/page-templates.ts"))).toBe(true);

    const config = JSON.parse(fs.readFileSync(path.join(tmpDir, "oasis.config.json"), "utf-8"));
    expect(config.port).toBe(9333);
    expect(config.urlMatch).toBe("custom-match");

    const ws = WorkspaceContext.findAndLoad(tmpDir);
    expect(ws.config.port).toBe(9333);
    expect(ws.getComponentsDir()).toBe(path.join(tmpDir, "components"));
    expect(ws.getUserDataDir()).toBe(path.join(tmpDir, ".oasis-profile"));
  });
});
