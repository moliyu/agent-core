import type { ExpressionValue, JSFunction, OperatorCode } from "./types.js";

/** ServiceData 数据集引用 */
export interface ServiceDataDataset {
  id?: string;
  name?: string;
}

/** ServiceData 默认查询参数 */
export interface ServiceDataQueryParam {
  fieldName?: string;
  operation?: OperatorCode;
  value?: string;
  sort?: "none" | "asc" | "desc";
}

/**
 * ServiceData 数据服务容器组件
 *
 * @description
 * 加载或发布供子树与页面消费的上下文数据（源码: `component-schemas-v2/ServiceData/index.ts`）。
 *
 * @usageGuidelines
 * - `dataSourceType: "default"`：通过 `customFunction`（入参 `({ setData, element }) => void`）在挂载时执行逻辑，并通过 `context.updateContext((draft) => { ... })` 发布数据与刷新方法（或 `setData`）；
 * - 发起接口请求使用内置 `request({ url, method, params/data })`（`url` 省略 `/api` 前缀）；常用全局对象有 `router?.searchParams`、`user?.positions?.primaryPosition`、`sendMessage(msg, type)`；
 * - **始终保持 `visible: true` 并包裹需要消费数据的组件/区域**（如 `ServiceData -> Table / GridPlus / Step / 整页内容区`）；**严禁**将 `ServiceData` 设为 `visible: false` 单独空置（IDE 设计态会渲染大块 `>隐藏状态<` 占位框并破坏画布排版）；
 * - `dataSourceType: "be"`：绑定 `beName`、`dataset`、`defaultQueryParams`、`resultField` 自动向后台查询数据。
 */
export interface ServiceDataProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 可选别名 */
  alias?: string;
  /** 数据源模式，默认: "default" */
  dataSourceType?: ExpressionValue<"default" | "be">;
  /** 静态数据对象 */
  staticData?: Record<string, unknown>;
  /** default 模式挂载回调: `({ setData, element }) => void` */
  customFunction?: JSFunction | "";
  /** be 模式业务实体名称 */
  beName?: string;
  /** be 模式父业务实体名称 */
  parentBeName?: string;
  /** be 模式父记录 ID */
  parentBeId?: string;
  /** 分页大小，默认: 20 */
  pageSize?: ExpressionValue<number>;
  /** 数据集配置 */
  dataset?: ServiceDataDataset;
  /** 默认查询与排序参数 */
  defaultQueryParams?: ExpressionValue<ServiceDataQueryParam[]>;
  /** 返回字段白名单 */
  resultField?: ExpressionValue<string[]>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}

export const serviceDataPresets = {
  /** 自定义脚本数据服务（挂载时初始化页面上下文） */
  customScript: (jsCode: string, alias: string = ""): ServiceDataProps => ({
    alias,
    dataSourceType: "default",
    customFunction: {
      _type: "JSFunction",
      value: jsCode,
    },
  }),
};
