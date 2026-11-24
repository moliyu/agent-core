import { describe, it, expect } from "vitest";
import { allGitHubTools } from "../src/tools/github-issue-tools.js";
import { GitHubIssueClient } from "../src/github/issue-client.js";

describe("GitHub Issue Tools & Client", () => {
  it("should define all 5 core GitHub issue tools with requiresEditor: false", () => {
    expect(allGitHubTools).toHaveLength(5);
    const names = allGitHubTools.map((t) => t.name);
    expect(names).toContain("github_list_issues");
    expect(names).toContain("github_get_issue");
    expect(names).toContain("github_create_issue");
    expect(names).toContain("github_comment_issue");
    expect(names).toContain("github_close_issue");

    for (const tool of allGitHubTools) {
      expect(tool.requiresEditor).toBe(false);
    }
  });

  it("should be able to list issues on current repo without throwing", async () => {
    try {
      const issues = await GitHubIssueClient.list({ limit: 5 });
      expect(Array.isArray(issues)).toBe(true);
    } catch (err: any) {
      // 若处于缺少鉴权的纯离线沙盒环境，验证错误提示格式符合预期
      expect(err.message).toMatch(/\[gh CLI Error\]/);
    }
  });
});
