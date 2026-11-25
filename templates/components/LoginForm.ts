import type { ExpressionValue, StyleProps } from "./types.js";

/**
 * LoginForm 共享登录面板组件
 *
 * @description
 * 封装宿主登录控制器（账密、短信/邮箱验证码、滑块/图形验证码、SSO），仅需配置尺寸、间距与外层样式，认证与跳转由宿主管理（源码: `component-schemas-v2/LoginForm/index.ts`）。
 */
export interface LoginFormProps {
  size?: ExpressionValue<"small" | "middle" | "large" | "custom">;
  customHeight?: ExpressionValue<number>;
  customGap?: ExpressionValue<number>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const loginFormPresets = {
  /** 标准登录表单 */
  standard: (): LoginFormProps => ({
    size: "large",
  }),
};
