import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_CONFIG } from "../workspace/context.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface InitOptions {
  targetDir?: string;
  port?: number;
  urlMatch?: string;
  silent?: boolean;
}

export function runInit(options: InitOptions = {}): { targetDir: string } {
  const targetDir = path.resolve(options.targetDir || process.cwd());
  const log = (msg: string) => {
    if (!options.silent) {
      console.log(msg);
    }
  };

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 1. 生成 oasis.config.json
  const configPath = path.join(targetDir, "oasis.config.json");
  if (!fs.existsSync(configPath)) {
    const configData = {
      port: options.port ?? DEFAULT_CONFIG.port,
      urlMatch: options.urlMatch ?? DEFAULT_CONFIG.urlMatch,
      componentsDir: DEFAULT_CONFIG.componentsDir,
      presetsDir: DEFAULT_CONFIG.presetsDir,
    };
    fs.writeFileSync(configPath, JSON.stringify(configData, null, 2), "utf-8");
    log(`[agent-core] 创建配置文件: ${configPath}`);
  } else {
    log(`[agent-core] 配置文件已存在: ${configPath}`);
  }

  // 2. 生成 tsconfig.json (支持工作区内 TS 类型推断与检查)
  const tsconfigPath = path.join(targetDir, "tsconfig.json");
  if (!fs.existsSync(tsconfigPath)) {
    const tsconfigData = {
      compilerOptions: {
        target: "ES2022",
        module: "NodeNext",
        moduleResolution: "NodeNext",
        strict: true,
        skipLibCheck: true,
      },
      include: ["components/**/*", "presets/**/*"],
    };
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfigData, null, 2), "utf-8");
    log(`[agent-core] 创建 TS 配置: ${tsconfigPath}`);
  }

  // 3. 生成 .gitignore
  const gitignorePath = path.join(targetDir, ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    const gitignoreContent = `node_modules/
dist/
*.log
`;
    fs.writeFileSync(gitignorePath, gitignoreContent, "utf-8");
    log(`[agent-core] 创建 .gitignore: ${gitignorePath}`);
  }

  // 4. 创建 components/ 目录并复制内置基础原子组件规范 (Text, Tag, Button, Container)
  const componentsDir = path.join(targetDir, DEFAULT_CONFIG.componentsDir);
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  // 尝试从 templates/components 复制初始原子组件资产
  const templateComponentsDir = path.resolve(__dirname, "../../templates/components");
  if (fs.existsSync(templateComponentsDir)) {
    const templateFiles = fs.readdirSync(templateComponentsDir);
    for (const file of templateFiles) {
      const srcPath = path.join(templateComponentsDir, file);
      const destPath = path.join(componentsDir, file);
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
    log(`[agent-core] 注入内置组件规范 (共 129 个): ${componentsDir}`);
  }

  const readmePath = path.join(componentsDir, "README.md");
  if (!fs.existsSync(readmePath)) {
    const readmeContent = `# Oasis 组件规范资产 (Code-as-Asset)

本目录内置了 Oasis 129 个完整组件规范（全量覆盖基础排版、布局容器、表单与条件控件、子表单、数据表格、数据服务、图表与关系图、审批/工作流/看板、日历排班、业务专有组件及复合组件内部槽位/模板节点），
每个组件包含严格的 TypeScript 类型接口定义、合法枚举联合类型及推荐配置预设。
Agent 接入后可直接按此规范生成和修改页面 UI。
`;
    fs.writeFileSync(readmePath, readmeContent, "utf-8");
  }

  // 5. 创建 presets/ 目录及初始模板
  const presetsDir = path.join(targetDir, DEFAULT_CONFIG.presetsDir);
  if (!fs.existsSync(presetsDir)) {
    fs.mkdirSync(presetsDir, { recursive: true });
  }
  const presetSamplePath = path.join(presetsDir, "page-templates.ts");
  if (!fs.existsSync(presetSamplePath)) {
    const presetSampleContent = `/**
 * Oasis 页面与复杂组件预设模板（沉淀自真实项目页面结构）
 */

export interface PageLayoutPreset {
  name: string;
  description: string;
  structure: Record<string, unknown>;
}

export const listManagePagePreset: PageLayoutPreset = {
  name: "企业级列表管理页",
  description: "顶部筛选 Form + 操作栏 + GridPlus 数据表格 + 新增/编辑 Dialog",
  structure: {
    root: "PageRoot",
    sections: [
      "Container(筛选栏: Form + 搜索/重置 Button)",
      "GridPlus(列表主体 + globalOperationConfig/rowOperationConfig)",
      "Dialog(新增/编辑弹窗: Form -> FormItemContainer -> 字段控件)",
    ],
  },
};

export const detailTabPagePreset: PageLayoutPreset = {
  name: "企业级多页签详情页",
  description: "顶部标题/StateModel + ServiceData/Step 阶段条 + Tab(基本信息 Collapse+Form / 子表 GridPlus / 变更日志 Timeline) + 底部操作栏",
  structure: {
    root: "PageRoot",
    header: [
      "Container(标题 Text + StateModel/Button)",
      "ServiceData -> Step(labelPlacement: vertical, isPercent: true)",
    ],
    body: "Tab -> [基本信息(Collapse -> Form + GridPlus), 关联列表(GridPlus + Dialog), 变更日志(Timeline)]",
    footer: "Container(底部按钮组: Button 保存/返回)",
  },
};

export const drawerDetailPagePreset: PageLayoutPreset = {
  name: "列表 + 侧滑抽屉详情/代码预览页",
  description: "GridPlus 列表 + Dialog(CRUD 表单) + Drawer(Tab + Descriptions/CodeEditor 侧滑预览)",
  structure: {
    root: "PageRoot",
    sections: [
      "GridPlus(列表主体 + 行内查看详情 Button)",
      "Dialog(新增/编辑弹窗: Form -> FormItemContainer -> 字段控件)",
      "Drawer(侧滑详情: Tab -> Descriptions / CodeEditor)",
    ],
  },
};
`;
    fs.writeFileSync(presetSamplePath, presetSampleContent, "utf-8");
  }

  // 6. 创建 AGENTS.md (供 Codex, Cursor, Claude 等 Agent 快速识别低代码指令上下文)
  const agentsMdPath = path.join(targetDir, "AGENTS.md");
  if (!fs.existsSync(agentsMdPath)) {
    const agentsMdContent = `# Oasis Low-Code Project Instructions

本工作区是一个 Oasis 低代码可视化页面编排工程。

## 可用 MCP 工具集 (oasis-editor)
你拥有对 Oasis 画布的直接读写工具：
- \`inspect_ui_tree\`: 查看画布组件树（推荐 \`mode: "outline"\`，低 Token 消耗）
- \`edit_ui_tree\`: 编辑画布（\`action: "insert"\` 插入节点、\`action: "update"\` 修改属性、\`action: "delete"\` 删除节点）
- \`get_ui_components\`: 查看可用组件列表
- \`get_component_def\`: 查看指定组件的属性定义与预设
- \`click_ui_element\`: 点击/高亮选中画布中的节点
- \`open_blank_canvas\`: 自动执行【工程 -> 开始工作 -> 新建空白页面】，重置并进入全新空白画布。当刚进入 IDE 页面、画布 Bridge 未就绪或用户要求新建空白页面时直接调用此工具。

## 组件资产规范 (components/)
- \`Container\`: 唯一的布局容器组件（支持 Flex 布局），其他组件严禁作为父级容器嵌套子节点。
- \`Text\`: 文本节点，提供 pageTitle、sectionTitle、body、secondary 等预设。
- \`Tag\`: 状态胶囊节点，提供 success、warning、error 等预设。
- \`Button\`: 操作按钮节点，提供 primaryAction、secondaryAction、dangerDelete 等预设。
- \`Form\` / \`FormItemContainer\`: 表单容器与等宽分栏容器；简单 1~3 列等宽分栏可用 \`FormItemContainer\`，复杂布局（分组、\`gap\`、跨列等）可直接在 \`Form\` 下使用 \`Container\`。
- \`GridPlus\` / \`Grid\`: 企业级数据表格，支持 BE 元数据查询、分页、排序、筛选、行内编辑与 CRUD 操作。
- \`Dialog\` / \`Drawer\`: 模态对话框与侧滑抽屉容器，分别支持 \`headTitle\`/\`footerContent\` 与 \`DrawerExtra\`/\`DrawerFooter\`。
- \`PageRoot\`: 页面根节点（\`ROOT\`），承载 \`bmName\`、作用域 \`css\` 与默认 BE 上下文。
- \`DetailsPageContainer\` / \`Card\` / \`Tab\` / \`Collapse\` / \`Dropdown\` / \`Descriptions\`: 详情页三段式框架、卡片、标签页、折叠面板、下拉菜单与描述列表。
- \`Input\` / \`Transform\` / \`Select\` / \`AutoComplete\` / \`TreeSelect\` / \`DatetimePicker\` / \`CheckBox\` / \`Radio\` / \`Switch\` / \`Prompt\` / \`SingleUpload\` / \`FileUpload\` / \`CodeEditor\` / \`ColorPicker\`: 常用表单与专业输入控件。
- \`Image\` / \`Icon\` / \`Transfer\` / \`Tree\` / \`IteratorContainer\` / \`ServiceData\` / \`Step\` / \`StepPlus\` / \`StateModel\` / \`Timeline\`: 图片、图标、穿梭框、树形控件、循环渲染容器、数据服务、阶段步骤条、状态模型与时间线。
详细设计规范与排版菜谱见 \`components/COMPONENTS.md\`、接口与详情加载指南见 \`components/DATA_AND_API.md\`、页面模板见 \`presets/page-templates.ts\`。

## 行为准则
当用户提出“配置低代码界面”、“查看页面”、“修改界面”等诉求时：
1. 若当前尚未进入画布（收到 Bridge 未就绪提示）或用户要求从头新建页面，直接调用 \`open_blank_canvas\` 初始化空白画布；
2. 优先调用 \`inspect_ui_tree\` 查看当前画布状态与节点 ID；
3. 结合 \`components/\` 下的规范与预设生成合理的节点结构；
4. 调用 \`edit_ui_tree\` 直接写入或更新画布；
5. **配置 \`Dialog\` / \`Drawer\` 时的铁律**：IDE 设计态不会直接唤起弹窗或抽屉，配置完后**严禁**去点击触发按钮或调用 \`click_ui_element\` 试图打开验证（直接通过 \`edit_ui_tree\` 往 \`Dialog\` / \`Drawer\` 节点内插入子组件即可）；同时需**保留一个隐藏的打开按钮**（如 \`hidden: true\` 的触发 \`Button\` 调用 \`context[alias].onOpenDialog()\` / \`onShowDrawer()\`，或按需保留 \`showButton\`），方便人工在配置器里随时点开编辑；
6. **可选属性严禁传 \`null\`**：所有组件（尤其是 \`Input\`/\`InputNumber\` 等 19 个表单控件）的 \`defaultValue\`、\`placeholder\`、\`labelWidth\` 等可选属性在“无默认值/未配置”时，直接省略该字段或传 \`""\`，**严禁传 \`null\`**（否则 IDE 属性面板会报错 \`该值不能为 null\`）。
`;
    fs.writeFileSync(agentsMdPath, agentsMdContent, "utf-8");
  }

  // 7. 注入工作区专用 Agent Skills (.agents/skills/)
  const templateSkillsDir = path.resolve(__dirname, "../../templates/skills");
  const targetSkillsDir = path.join(targetDir, ".agents/skills");
  if (fs.existsSync(templateSkillsDir)) {
    function copyDirRecursive(src: string, dest: string) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
          copyDirRecursive(srcPath, destPath);
        } else {
          if (!fs.existsSync(destPath)) {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      }
    }
    copyDirRecursive(templateSkillsDir, targetSkillsDir);
    log(`[agent-core] 注入工作区专属 Skills: ${targetSkillsDir}`);
  }

  log(`
🎉 Oasis Agent 工作区初始化成功！
工作目录: ${targetDir}
已内置组件规范: components/ (共 129 个，详见 components/COMPONENTS.md、components/DATA_AND_API.md、components/RUNTIME_GLOBALS.md 与 components/RUNTIME_CONTEXT.md)

接下来你只需：
直接在 Cursor / Claude / Windsurf / Pi 中配置本 MCP 服务即可开始使用：
  命令: agent-core
  参数: ["mcp"]

(注: MCP 服务会在你需要操作画布时自动按需拉起并连接浏览器，无需手动执行任何启动命令)
`);

  return { targetDir };
}
