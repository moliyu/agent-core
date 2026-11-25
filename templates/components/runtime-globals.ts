/**
 * Oasis 变量/JS 编辑器左侧「函数/常量」全局运行时定义
 *
 * 对应源码：
 * - `oasis-tools/src/components/major-window/property-list/configurators/advanced/function-metadata/`
 * - `base/src/client/script/index.ts` (`RuntimeScriptType`)
 *
 * 在 `JSExpression`、`JSFunction`、事件 `code` 及 `ServiceData.customFunction` 中均可直接访问下列全局对象与函数。
 */

/** 轻提示消息级别 */
export type MessageLevel = "info" | "success" | "warning" | "error" | "loading";

/** 确认框配置参数（对应 Ant Design `ModalFuncProps` 核心字段） */
export interface ConfirmOptions {
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  okButtonProps?: { loading?: boolean; disabled?: boolean; [key: string]: unknown };
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  [key: string]: unknown;
}

/** 确认框 (`confirm`) */
export interface OasisConfirm {
  showConfirm: (options: ConfirmOptions) => void;
  closeConfirm: () => void;
  updateConfirm: (options: ConfirmOptions) => void;
}

/** 环境变量 (`env`) */
export interface OasisEnv {
  NEXT_PUBLIC_LOGIN_URL?: string;
  APP_CODE?: string;
  [key: string]: string | undefined;
}

/** Excel 导出列定义 */
export interface ExcelColumn {
  label: string;
  key: string;
  width?: number;
}

/** Excel 导出选项 */
export interface ExportExcelOptions {
  /** Excel 表头 */
  header: ExcelColumn[];
  /** Excel 表格数据 */
  data: unknown[];
  /** 导出的 Excel 文件名称 */
  filename?: string;
  /** 要合并的单元格 */
  merges?: string[];
  /** 是否自动调整列宽，为 false 时使用表头列宽 */
  autoWidth?: boolean;
}

/** Excel 工具 (`excel`) */
export interface OasisExcel {
  excelJsonToExcel: (options: ExportExcelOptions) => void;
}

/** 工作流运行时 (`flow`) */
export interface OasisFlow {
  flows: Record<string, unknown>;
  currentFlow: Record<string, unknown> | null;
  checkBeforeExecuteFlow: (deploymentId: string, modelId: string) => unknown;
  start: (deploymentId: string, modelId: string, params?: Record<string, unknown>) => Promise<unknown>;
  commit: (instanceId: string, nodeInstanceId: string, params?: Record<string, unknown>) => Promise<unknown>;
  rollback: (instanceId: string, nodeInstanceId: string, params?: Record<string, unknown>) => Promise<unknown>;
  terminate: (instanceId: string, params?: Record<string, unknown>) => Promise<unknown>;
  retry: (instanceId: string, nodeInstanceId: string, params?: Record<string, unknown>) => Promise<unknown>;
  syncStartByDefId: (definitionId: string, params?: Record<string, unknown>) => Promise<unknown>;
  syncStart: (deploymentId: string, modelId: string, params?: Record<string, unknown>) => Promise<unknown>;
  syncCommit: (instanceId: string, nodeInstanceId: string, params?: Record<string, unknown>) => Promise<unknown>;
  syncRollback: (instanceId: string, nodeInstanceId: string, params?: Record<string, unknown>) => Promise<unknown>;
  syncTerminate: (instanceId: string, params?: Record<string, unknown>) => Promise<unknown>;
  syncRetry: (instanceId: string, nodeInstanceId: string, params?: Record<string, unknown>) => Promise<unknown>;
}

/** 工具包 (`lib`) */
export interface OasisLib {
  lodash: unknown;
  dayjs: unknown;
  downloadFile?: (fileId: string, fileName?: string) => void;
}

/** 国际化 (`locale`) */
export interface OasisLocale {
  /** 当前语言编码，如 `ZHS` / `en` */
  current: string;
  /** 可选语言列表 */
  languages: Array<{ value: string; label: string }>;
  /** 切换语言 */
  change: (language: string) => Promise<void>;
  /** 读取多语言文案 */
  get?: (key: string) => string;
}

/** 动作执行 (`action`) */
export interface OasisAction {
  exec: (request: {
    actionCode: string;
    input?: Record<string, unknown>;
    [key: string]: unknown;
  }) => Promise<unknown>;
}

/** 网络请求参数 (`request`) */
export interface OasisRequestOptions {
  /** 请求路径（Oasis 业务接口省略 `/api` 前缀，如 `/com/{bm}/{be}/searchList`） */
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | string;
  params?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string>;
  [key: string]: unknown;
}

/** 网络请求 (`request`) */
export type OasisRequest = <T = any>(options: OasisRequestOptions) => Promise<T>;

/** 流式请求 (`streamRequest`) */
export interface OasisStreamRequest {
  loading: boolean;
  abort: () => void;
  get: (
    options: { url: string; params?: Record<string, unknown>; [key: string]: unknown },
    callbacks?: { onReceived?: (params: unknown) => void; [key: string]: unknown },
  ) => Promise<unknown>;
  post: (
    options: { url: string; body?: unknown; [key: string]: unknown },
    callbacks?: { onReceived?: (params: unknown) => void; [key: string]: unknown },
  ) => Promise<unknown>;
}

/** 提示消息 (`sendMessage`) */
export type OasisSendMessage = (content: string, level?: MessageLevel) => void;

/** 用户职位信息 */
export interface OasisUserPosition {
  positionId: string;
  positionName: string;
  buId: string;
  buName: string;
  buCode: string;
  characterId: string;
}

/** 登录用户信息 (`user`) */
export interface OasisUser {
  id: string;
  name: string;
  permissions: string[];
  roles: string[];
  language: string;
  avatar?: string | null;
  positions?: {
    primaryPosition?: OasisUserPosition;
    currentPosition?: OasisUserPosition;
    positions?: OasisUserPosition[];
  };
}

/** 站点资源项 */
export interface OasisSiteResource {
  contentType: string;
  fileId?: string;
  textContent?: string;
}

/** 站点配置 (`siteConfig`) */
export interface OasisSiteConfig {
  tenantId: string;
  siteId: string;
  name: string;
  siteName: string;
  sitePath: string;
  siteCookieDomain: string;
  characterType: string;
  siteEnable: string;
  resources: Partial<
    Record<
      | "LoginLogo"
      | "LoginBackground"
      | "LoginBrandContent"
      | "LoginBrandBackground"
      | "Copyright"
      | "CommonLogo"
      | "HeaderLogo"
      | "FooterLogo"
      | "MenuLogoExpanded"
      | "MenuLogoCollapsed"
      | "Favicon",
      OasisSiteResource
    >
  >;
}

/** 内置路由跳转 (`router`) */
export interface OasisRouter {
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  searchParams: URLSearchParams;
  location: string | Record<string, unknown>;
  buildUrl: (options: {
    pathname: string;
    params?: Record<string, unknown>;
    oriParams?: Record<string, unknown>;
    mergeStrategy?: "append" | "override";
  }) => string;
}

/** 浏览器原生路由跳转 (`nativeRouter`) */
export interface OasisNativeRouter {
  back: () => void;
  forward: () => void;
  refresh: () => void;
  push: (url: string) => void;
  replace: (url: string) => void;
  prefetch: (url: string) => void;
}

/** 页签管理 (`pageTag`) */
export interface OasisPageTag {
  /** 更新页签标题 */
  updateTitle: (title: string, path?: string) => void;
}

/** 进度/发送弹窗控制器 (`packagingProgress` / `engineProgress` / `send`) */
export interface OasisDialogController<TParams = unknown> {
  show: (params?: TParams) => void;
  close: () => void;
}

/**
 * Oasis 代码编辑器左侧「函数/常量」全量全局作用域类型
 */
export interface OasisRuntimeGlobals {
  /** 确认框 */
  confirm: OasisConfirm;
  /** 环境变量 */
  env: OasisEnv;
  /** Excel 工具 */
  excel: OasisExcel;
  /** 流 */
  flow: OasisFlow;
  /** 工具包 (`lodash` / `dayjs` / `downloadFile`) */
  lib: OasisLib;
  /** 国际化 */
  locale: OasisLocale;
  /** 动作执行入口 */
  action: OasisAction;
  /** 网络请求 */
  request: OasisRequest;
  /** 流式请求 */
  streamRequest: OasisStreamRequest;
  /** 提示消息 */
  sendMessage: OasisSendMessage;
  /** 登录用户 */
  user: OasisUser;
  /** 站点配置 */
  siteConfig?: OasisSiteConfig;
  /** 内置路由跳转 */
  router: OasisRouter;
  /** 浏览器跳转（Next/原生路由） */
  nativeRouter: OasisNativeRouter;
  /** 页签管理 */
  pageTag: OasisPageTag;
  /** 打包进度弹窗控制器 */
  packagingProgress: OasisDialogController;
  /** 引擎进度弹窗控制器 */
  engineProgress: OasisDialogController;
  /** 发送弹窗控制器 */
  send: OasisDialogController;
}
