/**
 * FormItemContainer 表单字段区容器组件
 *
 * @description
 * Form 模板内置的等宽分栏容器（并非 `Form` 下唯一子容器）。其自身在属性系统中没有任何持久化可配置属性
 * （`propertyConfigs` 为空数组），运行时会自动读取最近父级 `Form` 的 `columns` 配置：
 * 当 `columns > 1` 时，直接子项会以 `display: grid; gridTemplateColumns: repeat(columns, minmax(0, 1fr))` 排版。
 *
 * @usageGuidelines
 * - **无持久化可配置属性**：props 必须为空对象 `{}`，**严禁**配置 `gap`、`style` 等属性；
 * - **简单等宽分栏**：将字段控件直接放在 `FormItemContainer` 下，由 `Form.columns`（`"1" | "2" | "3"`）控制 1~3 列等宽 Grid；
 * - **复杂/灵活布局**：并非只能用 `FormItemContainer`——需要 `gap`、分组、跨列或自定义 Flex/Grid 时，**可以直接在 `Form` 下放 `Container`**（也可将 `Form.columns` 设为 `"1"` 后在 `FormItemContainer` 下放 `Container`），再把字段控件放入该 `Container`；
 * - 两条路径中的字段控件均处于同一 `FormContext` 中，自动继承 `Form.labelWidth` 并参与校验与提交。
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FormItemContainerProps {}

export const formItemContainerPresets = {
  /** 标准空配置（唯一合法写法） */
  default: (): FormItemContainerProps => ({}),
};
