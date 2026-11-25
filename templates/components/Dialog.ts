import type { MessageValue, ExpressionValue, StyleProps, EventItem, EventWrapper } from "./types.js";

/** Dialog 底部操作按钮配置 */
export interface DialogFooterItem {
  label?: MessageValue<string>;
  /** 历史/兼容字段 */
  buttonType?: "primary" | "dashed" | "link" | "text" | "default";
  /** 历史颜色字段 */
  color?: "primary" | "danger" | "default";
  /** 按钮行为，默认: "button"（提交表单用 `"submit"`，关闭弹窗用 `"cancel"`） */
  buttonBehavior?: ExpressionValue<"submit" | "cancel" | "reset" | "button">;
  /** 关联的表单 alias（buttonBehavior="submit" / "reset" 时使用） */
  formAlias?: ExpressionValue<string>;
  theme?: ExpressionValue<"primary" | "green" | "cyan" | "volcano" | "danger" | "default">;
  loadingMode?: "none" | "button" | "page";
  /** 点击后是否关闭弹窗，默认: false */
  isCloseDialog?: ExpressionValue<boolean>;
  variant?: ExpressionValue<"solid" | "filled" | "outlined" | "dashed" | "link" | "text">;
  /** 自定义点击事件包装器（`params[0]` 为 `{ onOpenDialog, onHideDialog }`） */
  customerFunction?: EventWrapper<"onClick">;
}

/**
 * Dialog 模态对话框组件
 *
 * @description
 * 在当前页面上层展示可控制打开与关闭的模态对话框（源码: `component-schemas-v2/Dialog/index.ts`）。
 *
 * @usageGuidelines
 * 1. **Page Context 能力**：
 *    - 配置非空 `alias` 后，可通过 `context[alias].onOpenDialog(options?)` 和 `context[alias].onHideDialog(options?)` 打开/关闭弹窗；
 *    - 弹窗内部子组件可直接通过 `context.onOpenDialog` / `context.onHideDialog` 控制当前弹窗（即使 `alias` 为空）。
 * 2. **设计态打开表单技巧（重要）**：
 *    - 设计态下 `GridPlus` 的新建/编辑按钮不会直接弹出关联的 `Dialog`；
 *    - 业务人员通常开启 `showButton: true`（或配置一个隐藏按钮调用 `context[alias].onOpenDialog()`），以便在配置器中随时点开弹窗编辑内部的 `Form`。
 * 3. **内容挂载模式**：
 *    - 无直接子组件时渲染内置 `slots.Container`；一旦向 `Dialog` 直接添加子组件（如 `Form`），则直接渲染这些子组件。
 */
export interface DialogProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 弹窗 Page Context 别名（非空时发布 `context[alias].onOpenDialog` / `onHideDialog`） */
  alias?: ExpressionValue<string>;
  /** 弹窗宽度，默认: "50vw"（如 "720px"） */
  width?: ExpressionValue<string>;
  /** 是否渲染内置打开按钮，默认: true */
  showButton?: ExpressionValue<boolean>;
  /** 内置打开按钮文案，默认: "Open" */
  buttonLabel?: MessageValue<string>;
  /** 弹窗标题，默认: "Title" */
  headTitle?: MessageValue<string>;
  /** 是否显示右上角关闭按钮，默认: true */
  closeable?: ExpressionValue<boolean>;
  /** 是否支持 Esc 键关闭，默认: true */
  keyboard?: ExpressionValue<boolean>;
  /** 点击遮罩层是否允许关闭，默认: false */
  maskCloseable?: ExpressionValue<boolean>;
  /** 是否显示底部栏，默认: true */
  footer?: ExpressionValue<boolean>;
  /** 底部按钮列表 */
  footerContent?: ExpressionValue<DialogFooterItem[]>;
  /** 隐藏时是否强制渲染内容，默认: false */
  forceRender?: ExpressionValue<boolean>;
  /** 关闭时是否销毁子元素，默认: true */
  destroyOnClose?: ExpressionValue<boolean>;
  /** 子树渲染完成前是否显示全屏加载态，默认: false */
  isOpenWaitingLoading?: ExpressionValue<boolean>;
  /** CSS 可见性，默认: true */
  visible?: ExpressionValue<boolean>;
  /** 条件隐藏并卸载，默认: false */
  hidden?: ExpressionValue<boolean>;
  /** 关闭事件回调（trigger: `"handleClose"`） */
  events?: EventItem<"handleClose">[];
  /** CSS 类名 */
  className?: ExpressionValue<string>;
  /** 面板样式（运行时会忽略 `display`） */
  style?: ExpressionValue<StyleProps>;
}

/**
 * Dialog 高频业务推荐预设 (Presets)
 */
export const dialogPresets = {
  /** 搭配 GridPlus + Form 的新建/编辑弹窗（默认隐藏内置按钮，需要设计态点开时可设 showButton=true） */
  crudFormModal: (
    alias: string,
    headTitle: string,
    formAlias: string,
    showButton: boolean = false
  ): DialogProps => ({
    alias,
    headTitle,
    width: "720px",
    showButton,
    buttonLabel: "打开表单",
    footer: true,
    destroyOnClose: true,
    footerContent: [
      {
        label: "取消",
        buttonBehavior: "cancel",
        theme: "default",
        variant: "outlined",
        isCloseDialog: true,
      },
      {
        label: "保存",
        buttonBehavior: "submit",
        formAlias,
        theme: "primary",
        variant: "solid",
        isCloseDialog: false,
      },
    ],
  }),

  /** 仅展示信息的确认/详情弹窗 */
  infoModal: (alias: string, headTitle: string): DialogProps => ({
    alias,
    headTitle,
    width: "560px",
    showButton: false,
    footer: true,
    footerContent: [
      {
        label: "关闭",
        buttonBehavior: "cancel",
        theme: "default",
        variant: "outlined",
        isCloseDialog: true,
      },
    ],
  }),
};
