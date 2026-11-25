/**
 * FormItemContainer 表单字段区容器组件
 *
 * @description
 * Form 模板内置的唯一表单字段区 Canvas 入口容器。其自身在属性系统中没有任何持久化可配置属性
 * （`propertyConfigs` 为空数组），运行时会自动读取最近父级 `Form` 的 `columns` 配置：
 * 当 `columns > 1` 时，直接子项会以 `display: grid; gridTemplateColumns: repeat(columns, minmax(0, 1fr))` 排版。
 *
 * @usageGuidelines
 * - **无持久化可配置属性**：props 必须为空对象 `{}`，**严禁**配置 `gap`、`style` 等属性；
 * - **路径一（简单等宽分栏）**：将字段控件直接放在 `FormItemContainer` 下，由 `Form.columns`（`"1" | "2" | "3"`）控制 1~3 列等宽 Grid；
 * - **路径二（灵活布局）**：将 `Form.columns` 设为 `"1"`，在 `FormItemContainer` 下放入一个普通 `Container`（通过 `Container.style` 配置 Flex/Grid、`gap`、分组与跨列），再把字段控件放入该 `Container`；
 * - 两条路径中的字段控件均处于同一 `FormContext` 中，自动继承 `Form.labelWidth` 并参与校验与提交。
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FormItemContainerProps {}

export const formItemContainerPresets = {
  /** 标准空配置（唯一合法写法） */
  default: (): FormItemContainerProps => ({}),
};
