import { z } from "zod";
import { GitHubIssueClient } from "../github/issue-client.js";
import type { AgentToolDefinition } from "./oasis-editor-tools.js";

export const githubListIssuesTool: AgentToolDefinition = {
  name: "github_list_issues",
  description:
    "列出 GitHub 仓库中的 Issues 列表（默认读取打开中的待办任务，支持按 label、state、limit 过滤）。可用于 Agent 自动读取当前待处理需求与任务。",
  requiresEditor: false,
  parameters: z.object({
    repo: z
      .string()
      .optional()
      .describe("目标仓库，如 'moliyu/agent-core'，默认读取当前仓库"),
    state: z
      .enum(["open", "closed", "all"])
      .optional()
      .default("open")
      .describe("Issue 状态过滤，默认 'open'"),
    limit: z.number().optional().default(30).describe("最大拉取数量，默认 30"),
    labels: z.array(z.string()).optional().describe("按标签过滤"),
  }),
  execute: async (_editor, args) => {
    return await GitHubIssueClient.list(args);
  },
};

export const githubGetIssueTool: AgentToolDefinition = {
  name: "github_get_issue",
  description:
    "获取指定 GitHub Issue 的详细内容与评论记录。供 Agent 读取任务要求、UI 验收标准或复查历史上下文。",
  requiresEditor: false,
  parameters: z.object({
    issue_number: z.number().describe("Issue 编号，例如 1"),
    repo: z
      .string()
      .optional()
      .describe("目标仓库，如 'moliyu/agent-core'，默认当前仓库"),
  }),
  execute: async (_editor, args) => {
    return await GitHubIssueClient.get(args.issue_number, { repo: args.repo });
  },
};

export const githubCreateIssueTool: AgentToolDefinition = {
  name: "github_create_issue",
  description:
    "在 GitHub 仓库中创建新的 Issue。供 Agent 在自动化运行过程中自动上报异常、Schema 缺失、画布故障或创建新待办追踪。",
  requiresEditor: false,
  parameters: z.object({
    title: z.string().describe("Issue 标题"),
    body: z.string().describe("Issue 正文描述（支持 Markdown，可包含报错堆栈与节点快照）"),
    repo: z
      .string()
      .optional()
      .describe("目标仓库，如 'moliyu/agent-core'，默认当前仓库"),
    labels: z.array(z.string()).optional().describe("打上的标签列表，如 ['bug', 'auto-report']"),
  }),
  execute: async (_editor, args) => {
    return await GitHubIssueClient.create(args);
  },
};

export const githubCommentIssueTool: AgentToolDefinition = {
  name: "github_comment_issue",
  description:
    "在指定 GitHub Issue 下添加评论。用于 Agent 自动回填任务执行结果、验证结论或运行时进展。",
  requiresEditor: false,
  parameters: z.object({
    issue_number: z.number().describe("Issue 编号"),
    body: z.string().describe("评论正文（支持 Markdown）"),
    repo: z
      .string()
      .optional()
      .describe("目标仓库，如 'moliyu/agent-core'，默认当前仓库"),
  }),
  execute: async (_editor, args) => {
    return await GitHubIssueClient.comment(args.issue_number, args.body, {
      repo: args.repo,
    });
  },
};

export const githubCloseIssueTool: AgentToolDefinition = {
  name: "github_close_issue",
  description:
    "关闭指定的 GitHub Issue。供 Agent 完成页面搭建任务后自动关闭 Issue，支持同时附加完成备注。",
  requiresEditor: false,
  parameters: z.object({
    issue_number: z.number().describe("Issue 编号"),
    comment: z.string().optional().describe("关闭前附带的完成总结评论"),
    repo: z
      .string()
      .optional()
      .describe("目标仓库，如 'moliyu/agent-core'，默认当前仓库"),
  }),
  execute: async (_editor, args) => {
    return await GitHubIssueClient.close(args.issue_number, {
      comment: args.comment,
      repo: args.repo,
    });
  },
};

export const allGitHubTools: AgentToolDefinition[] = [
  githubListIssuesTool,
  githubGetIssueTool,
  githubCreateIssueTool,
  githubCommentIssueTool,
  githubCloseIssueTool,
];
