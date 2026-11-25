import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * DrawerFooter 抽屉底部操作区组件
 *
 * @description
 * `Drawer` 抽屉底部的操作内容区域（源码: `component-schemas-v2/DrawerFooter/index.ts`）。
 */
export interface DrawerFooterProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
