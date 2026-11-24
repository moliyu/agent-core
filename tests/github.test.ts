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
    const issues = await GitHubIssueClient.list({ limit: 5 });
    expect(Array.isArray(issues)).toBe(true);
  });
});
