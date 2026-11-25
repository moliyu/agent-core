/**
 * Oasis 统一底层类型与表达式系统定义
 */

/**
 * Oasis 动态运行时表达式包装器。
 * 当某个属性依赖 Context、页面运行时数据或动态计算逻辑时使用。
 */
export interface JSExpression<T = any> {
  _type: "JSExpression";
  /** JS 函数体字符串，必须使用 return 返回最终属性值。例如: "return context.userInfo?.name || '访客';" */
  value: string;
  /** 编译或计算异常时的降级默认值 */
  defaultValue?: T;
}

/**
 * Oasis 国际化多语言资源引用。
 */
export interface MessageCollection {
  _type: "MessageCollection";
  /** 多语言 key 标识 */
  value: string;
}

/**
 * Oasis 可调用回调函数持久化包装器。
 * `value` 为求值后返回目标函数的源码字符串（如 `() => { ... }`），未配置时部分属性可设为 `""` 或 `false`。
 */
export interface JSFunction {
  _type: "JSFunction";
  /** 回调函数源码字符串 */
  value: string;
  /** 编译或求值异常时的降级默认值 */
  defaultValue?: unknown;
}

/** 支持字面量值或动态表达式的值类型 */
export type ExpressionValue<T> = T | JSExpression<T>;

/** 支持字面量、表达式或多语言的值类型 */
export type MessageValue<T = string> = T | JSExpression<T> | MessageCollection;

/** 基础通用 CSS 样式定义字典 */
export type StyleProps = Record<string, string | number | undefined | null>;

/** 点击事件通用结构 */
export interface ClickEvent {
  trigger: "onClick";
  /** 可执行的 JS 代码字符串。例如: "context.router.push('/dashboard');" */
  code: string;
}

/** 通用事件条目结构 */
export interface EventItem<TTrigger extends string = string> {
  trigger: TTrigger;
  /** 可执行的 JS 代码字符串 */
  code: string;
}

/**
 * 部分组件（如 GridPlus 操作按钮、customerProperty）使用的事件包装对象。
 * 注意区分：`events` 是数组，`event` 是 `{ id, events }` 包装对象。
 */
export interface EventWrapper<TTrigger extends string = string> {
  id: string;
  events: EventItem<TTrigger>[];
}

/**
 * Oasis 统一查询操作符枚举（与 GridPlus locale 一致）：
 * - `"01"`: 等于
 * - `"02"`: 不等于
 * - `"03"`: 大于
 * - `"04"`: 大于等于
 * - `"05"`: 小于
 * - `"06"`: 小于等于
 * - `"07"`: 包含
 * - `"08"`: 开始于
 * - `"09"`: 结束于
 * - `"10"`: 在…之内
 * - `"11"`: 为空
 * - `"12"`: 不为空
 * - `"13"`: 不在…之内
 * - `"14"`: 在…之间
 * - `"15"`: 不等于或为空
 * - `"16"`: 等于或为空
 */
export type OperatorCode =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16";
