import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * DrawerExtra 抽屉额外操作区组件
 *
 * @description
 * `Drawer` 抽屉标题旁的额外内容区域（源码: `component-schemas-v2/DrawerExtra/index.ts`）。
 */
export interface DrawerExtraProps {
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}
