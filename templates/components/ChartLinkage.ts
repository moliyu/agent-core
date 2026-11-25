import type { ExpressionValue } from "./types.js";

/**
 * ChartLinkage 图表联动组件
 *
 * @description
 * 配置图表之间的数据联动关系与准星样式（源码: `component-schemas-v2/ChartLinkage/index.ts`）。
 */
export interface ChartLinkageProps {
  height?: ExpressionValue<string>;
  dimensions?: unknown;
  linkageConfig?: {
    isLinkage?: ExpressionValue<boolean>;
    reticleColor?: ExpressionValue<string>;
    reticleWidth?: ExpressionValue<number>;
    reticleType?: ExpressionValue<"solid" | "dashed" | "dotted">;
  };
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
}

export const chartLinkagePresets = {
  /** 默认联动配置 */
  basic: (height: string = "400px"): ChartLinkageProps => ({
    height,
    linkageConfig: {
      isLinkage: true,
      reticleColor: "#1677ff",
      reticleWidth: 1,
      reticleType: "dashed",
    },
  }),
};
