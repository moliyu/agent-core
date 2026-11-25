import type { EventItem, ExpressionValue, StyleProps } from "./types.js";

/**
 * Carousel 轮播图组件
 *
 * @description
 * 以轮播方式展示多个图片/内容项，支持自动播放、指示器与切换箭头（源码: `component-schemas-v2/Carousel/index.ts`）。
 */
export interface CarouselProps {
  /** 轮播项列表（`src` 为 CDN 或文件标识） */
  carouselItem?: ExpressionValue<Array<{ src?: string }>>;
  arrows?: ExpressionValue<boolean>;
  autoplay?: ExpressionValue<boolean>;
  /** 自动切换间隔（ms），默认: 3000 */
  autoplaySpeed?: ExpressionValue<number>;
  dots?: ExpressionValue<boolean>;
  dotPosition?: ExpressionValue<"top" | "bottom" | "left" | "right">;
  fade?: ExpressionValue<boolean>;
  /** 切换动画耗时（ms），默认: 500 */
  speed?: ExpressionValue<number>;
  dotsClassName?: ExpressionValue<string>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
  itemClassName?: ExpressionValue<string>;
  itemStyle?: ExpressionValue<StyleProps>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  events?: EventItem<"beforeChange" | "afterChange">[];
}

export const carouselPresets = {
  /** 自动轮播横幅 */
  banner: (items: Array<{ src: string }>): CarouselProps => ({
    carouselItem: items,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    dots: true,
    dotPosition: "bottom",
  }),
};
