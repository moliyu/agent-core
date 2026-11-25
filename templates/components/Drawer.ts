import type { EventItem, ExpressionValue, MessageValue, StyleProps } from "./types.js";

/**
 * Drawer 抽屉面板组件
 *
 * @description
 * 从页面边缘展开的抽屉面板，常用于列表页详情预览、侧边表单编辑或代码预览（源码: `component-schemas-v2/Drawer/index.ts`）。
 *
 * @usageGuidelines
 * - 非空 `alias` 会向页面上下文发布 `onShowDrawer()` 与 `onHideDrawer()`；
 * - **IDE 设计态不会直接唤起抽屉**：配置完 `Drawer` 后，**严禁**在 IDE 中点击业务按钮或调用 `click_ui_element` 试图唤起/验证抽屉打开；写入内部内容时先用 `inspect_ui_tree` 读取真实节点 ID，再直接通过 `edit_ui_tree` 插入子组件即可；
 * - **保留隐藏的抽屉打开按钮**：当抽屉由表格/外部按钮通过 `context[alias].onShowDrawer()` 唤起时，建议保留一个隐藏的打开按钮（如设置 `showButton: true` 并隐藏按钮，或放置一个 `hidden: true` 的 `Button` 调用 `context[alias].onShowDrawer()`），以便人工在配置器里随时点开编辑内部节点；
 * - 新建 `Drawer` 会自动生成 `DrawerExtra`（仅放 `Button`）、内容容器和 `DrawerFooter` 三个 Linked Node；
 * - 自定义宽度请直接配置 `width`（如 `600`、`"600px"`、`"60vw"`），使用 `size` 预设时省略 `width`。
 */
export interface DrawerProps {
  /** 非空 alias 发布 `onShowDrawer()` 与 `onHideDrawer()` 到页面上下文 */
  alias?: ExpressionValue<string>;
  /** 设计态/运行时是否显示内置触发按钮，默认: true */
  showButton?: ExpressionValue<boolean>;
  /** 内置触发按钮文案，默认: "Open" */
  buttonLabel?: MessageValue;
  /** 抽屉标题 */
  title?: MessageValue;
  /** 是否显示遮罩，默认: true */
  mask?: ExpressionValue<boolean>;
  /** 点击遮罩是否允许关闭，默认: true */
  maskClosable?: ExpressionValue<boolean>;
  /** 预设尺寸（default: 378px / large: 736px） */
  size?: ExpressionValue<"default" | "large">;
  /** 自定义抽屉宽度（如 600, "600px", "60vw"），优先于 size */
  width?: ExpressionValue<number | string>;
  /** 抽屉方向，默认: "right" */
  placement?: ExpressionValue<"top" | "right" | "bottom" | "left">;
  /** 是否显示右上角关闭按钮，默认: true */
  closable?: ExpressionValue<boolean>;
  /** 是否支持 ESC 关闭，默认: true */
  keyboard?: ExpressionValue<boolean>;
  /** 是否预渲染内部节点，默认: true */
  forceRender?: ExpressionValue<boolean>;
  /** 关闭时是否销毁内部元素，默认: false */
  destroyOnHidden?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  rootStyle?: ExpressionValue<StyleProps>;
  /** `beforeClose` 异步返回 `true` 时才允许关闭 */
  events?: EventItem<"beforeClose">[];
}

export const drawerPresets = {
  /** 列表页右侧详情预览抽屉（隐藏内置按钮，通过 alias 打开） */
  detailDrawer: (alias: string, title: string, width: string | number = 720): DrawerProps => ({
    alias,
    title,
    showButton: false,
    placement: "right",
    width,
    maskClosable: true,
    destroyOnHidden: false,
  }),
};
