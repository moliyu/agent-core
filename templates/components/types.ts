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

/** 支持字面量值或动态表达式的值类型 */
export type ExpressionValue<T> = T | JSExpression<T>;

/** 支持字面量、表达式或多语言的值类型 */
export type MessageValue<T = string> = T | JSExpression<T> | MessageCollection;

/** 基础通用 CSS 样式定义字典 */
export type StyleProps = Record<string, string | number | undefined | null>;

/** 点击事件通用契约 */
export interface ClickEvent {
  trigger: "onClick";
  /** 可执行的 JS 代码字符串。例如: "context.router.push('/dashboard');" */
  code: string;
}
