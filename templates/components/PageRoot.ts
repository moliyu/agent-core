import type { ExpressionValue } from "./types.js";

/**
 * PageRoot 页面根节点组件
 *
 * @description
 * 作为整个页面的根节点（节点 ID 固定为 `"ROOT"`），承载页面级业务模块锚点（`bmName`）、
 * 作用域样式（`css`）、默认 BE 上下文与变更日志配置（源码: `component-schemas-v2/PageRoot/index.ts`）。
 *
 * @usageGuidelines
 * - **不可插入/删除**：每个画布自带唯一的 `ROOT` 节点，只能通过 `edit_ui_tree(action: "update", nodeId: "ROOT", ...)` 修改其属性；
 * - **业务模块锚点**：页面中有 `GridPlus` 或 BE 绑定 `Form` 时，应先将 `ROOT.bmName` 对齐到对应的 BM；
 * - **作用域样式 `css`**：仅写页面内 CSS 规则文本（不支持 `JSExpression`），更新时注意保留已有规则。
 */
export interface PageRootProps {
  /** 页面业务模块（BM）锚点，发布为 `context.meta.bmName` */
  bmName?: string;
  /** 页面作用域 CSS 声明源码（自动包裹在 `.unique-page-root-*` 下） */
  css?: string;
  /** 是否开启页面级脏表单状态追踪，默认: false */
  enableValidFormStatus?: boolean;
  /** 静态模拟数据字典（发布为 `context.mock`） */
  mock?: Record<string, string>;
  /** 是否开启实体变更日志入口，默认: false */
  enableChangeLog?: boolean;
  /** 页面默认父业务实体，发布为 `context.meta.parentBeName` */
  parentBeName?: string;
  /** 页面默认业务实体，发布为 `context.meta.beName` */
  beName?: string;
  /** 变更日志目标记录 ID */
  recordId?: ExpressionValue<string>;
  /** 变更日志数据集 */
  dataset?: ExpressionValue<string>;
}
