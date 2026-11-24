import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface GitHubIssue {
  number: number;
  title: string;
  body: string;
  state: "OPEN" | "CLOSED";
  url: string;
  createdAt: string;
  updatedAt: string;
  labels: Array<{ name: string; description?: string; color?: string }>;
  author?: { login: string };
  comments?: Array<{
    author: { login: string };
    body: string;
    createdAt: string;
  }>;
}

export interface ListIssuesOptions {
  repo?: string;
  state?: "open" | "closed" | "all";
  limit?: number;
  labels?: string[];
}

export interface CreateIssueOptions {
  title: string;
  body: string;
  repo?: string;
  labels?: string[];
}

export interface CloseIssueOptions {
  comment?: string;
  repo?: string;
}

export class GitHubIssueClient {
  /**
   * 执行 gh CLI 命令并返回解析后的 stdout
   */
  private static async execGh(args: string[]): Promise<string> {
    try {
      const env = { ...process.env };
      if (!env.GH_TOKEN && env.GITHUB_TOKEN) {
        env.GH_TOKEN = env.GITHUB_TOKEN;
      }
      const { stdout } = await execFileAsync("gh", args, {
        maxBuffer: 10 * 1024 * 1024,
        env,
      });
      return stdout.trim();
    } catch (error: any) {
      const msg = error.stderr || error.message || String(error);
      throw new Error(`[gh CLI Error]: ${msg.trim()}`);
    }
  }

  /**
   * 列出 GitHub Issues
   */
  public static async list(options: ListIssuesOptions = {}): Promise<GitHubIssue[]> {
    const args = [
      "issue",
      "list",
      "--json",
      "number,title,body,state,url,createdAt,updatedAt,labels,author",
    ];

    if (options.repo) {
      args.push("--repo", options.repo);
    }
    if (options.state) {
      args.push("--state", options.state);
    }
    if (options.limit) {
      args.push("--limit", String(options.limit));
    }
    if (options.labels && options.labels.length > 0) {
      for (const label of options.labels) {
        args.push("--label", label);
      }
    }

    const raw = await this.execGh(args);
    if (!raw) return [];
    return JSON.parse(raw) as GitHubIssue[];
  }

  /**
   * 获取指定 Issue 的完整详情（含评论）
   */
  public static async get(
    issueNumber: number,
    options: { repo?: string } = {}
  ): Promise<GitHubIssue> {
    const args = [
      "issue",
      "view",
      String(issueNumber),
      "--json",
      "number,title,body,state,url,createdAt,updatedAt,labels,author,comments",
    ];

    if (options.repo) {
      args.push("--repo", options.repo);
    }

    const raw = await this.execGh(args);
    return JSON.parse(raw) as GitHubIssue;
  }

  /**
   * 创建新的 Issue（用于异常上报、任务记录、组件缺失追踪）
   */
  public static async create(options: CreateIssueOptions): Promise<GitHubIssue> {
    const args = ["issue", "create", "--title", options.title, "--body", options.body];

    if (options.repo) {
      args.push("--repo", options.repo);
    }
    if (options.labels && options.labels.length > 0) {
      for (const label of options.labels) {
        args.push("--label", label);
      }
    }

    // gh issue create 默认输出创建后的 URL
    const issueUrl = await this.execGh(args);

    // 从 URL 提取 issue number 并获取完整结构
    const match = issueUrl.match(/\/issues\/(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      return this.get(num, { repo: options.repo });
    }

    return {
      number: 0,
      title: options.title,
      body: options.body,
      state: "OPEN",
      url: issueUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      labels: [],
    };
  }

  /**
   * 在指定 Issue 下添加评论（用于回填执行进展与页面测试快照）
   */
  public static async comment(
    issueNumber: number,
    body: string,
    options: { repo?: string } = {}
  ): Promise<{ success: boolean; issueNumber: number }> {
    const args = ["issue", "comment", String(issueNumber), "--body", body];
    if (options.repo) {
      args.push("--repo", options.repo);
    }
    await this.execGh(args);
    return { success: true, issueNumber };
  }

  /**
   * 关闭指定 Issue
   */
  public static async close(
    issueNumber: number,
    options: CloseIssueOptions = {}
  ): Promise<{ success: boolean; issueNumber: number }> {
    if (options.comment) {
      await this.comment(issueNumber, options.comment, { repo: options.repo });
    }
    const args = ["issue", "close", String(issueNumber)];
    if (options.repo) {
      args.push("--repo", options.repo);
    }
    await this.execGh(args);
    return { success: true, issueNumber };
  }
}
