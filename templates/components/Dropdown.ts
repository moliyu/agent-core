import type { MessageValue, ExpressionValue, StyleProps, EventItem } from "./types.js";

/** Dropdown 菜单项配置 */
export interface DropdownMenuItem {
  key?: ExpressionValue<string>;
  label?: MessageValue<string>;
  type?: ExpressionValue<"item" | "divider">;
  iconName?: ExpressionValue<string>;
  disabled?: ExpressionValue<boolean>;
  danger?: ExpressionValue<boolean>;
}

/**
 * Dropdown 下拉菜单组件
 *
 * @description
 * 展示由菜单项组成的下拉菜单，并配置触发与定位方式
 * （源码: `component-schemas-v2/Dropdown/index.ts`）。
 *
 * @usageGuidelines
 * - 插入后模板会生成 `DropdownTriggerSlot`（触发器插槽）与 `DropdownItemSlot`（仅 `useCustomItemTemplate: true` 时渲染）两个 Linked Node；
 * - 菜单点击事件 `onMenuClick` 的 `params[0]` 为 `{ key, label, type, disabled, danger, iconName }`。
 */
export interface DropdownProps {
  /** 编辑器节点内部标识，保留原有值即可 */
  id?: string;
  /** 菜单项列表 */
  menuItems?: ExpressionValue<DropdownMenuItem[]>;
  /** 是否启用自定义菜单项插槽（`DropdownItemSlot`），默认: false */
  useCustomItemTemplate?: ExpressionValue<boolean>;
  /** 触发方式，默认: "click" */
  trigger?: ExpressionValue<"click" | "hover">;
  /** 菜单弹出位置，默认: "bottomLeft" */
  placement?: ExpressionValue<
    "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight"
  >;
  /** 是否显示弹出箭头，默认: false */
  arrow?: ExpressionValue<boolean>;
  disabled?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  events?: EventItem<"onMenuClick" | "onOpenChange">[];
}

export const dropdownPresets = {
  /** 标准点击下拉操作菜单 */
  actionMenu: (
    items: Array<{ key: string; label: string; danger?: boolean }>,
    onMenuClickCode?: string
  ): DropdownProps => ({
    trigger: "click",
    placement: "bottomLeft",
    menuItems: items.map((item) => ({
      key: item.key,
      label: item.label,
      type: "item",
      iconName: "",
      disabled: false,
      danger: Boolean(item.danger),
    })),
    ...(onMenuClickCode
      ? { events: [{ trigger: "onMenuClick", code: onMenuClickCode }] }
      : {}),
  }),
};
