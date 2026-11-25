import type { ExpressionValue, StyleProps } from "./types.js";

/** Image 图片来源配置 */
export interface ImageSourceConfig {
  /** 来源类型：fileId 通过平台文件下载接口解析，url/base64/dataUri 直接渲染 */
  sourceType: ExpressionValue<"fileId" | "url" | "base64" | "dataUri">;
  /** 文件 ID 或图片地址 */
  value: ExpressionValue<string>;
  alt?: ExpressionValue<string>;
  title?: ExpressionValue<string>;
}

/** Image 尺寸与裁剪样式 */
export interface ImageStyleConfig {
  width?: ExpressionValue<string>;
  height?: ExpressionValue<string>;
  objectFit?: ExpressionValue<"cover" | "contain" | "fill">;
  borderRadius?: ExpressionValue<string>;
}

/**
 * Image 图片展示组件
 *
 * @description
 * 展示图片（支持 `fileId`、`url`、`base64`、`dataUri`），内置大图预览、缩放、懒加载与加载失败兜底（源码: `component-schemas-v2/Image/index.ts`）。
 */
export interface ImageProps {
  /** 图片来源配置 */
  source?: ExpressionValue<ImageSourceConfig>;
  /** 图片尺寸、裁剪与圆角配置 */
  imageStyle?: ExpressionValue<ImageStyleConfig>;
  /** 预览与缩放配置 */
  preview?: ExpressionValue<{
    enabled?: ExpressionValue<boolean>;
    zoomMin?: ExpressionValue<number>;
    zoomMax?: ExpressionValue<number>;
  }>;
  /** 预览工具栏下载开关 */
  download?: ExpressionValue<{
    enabled?: ExpressionValue<boolean>;
  }>;
  /** 备用图片地址 */
  fallback?: ExpressionValue<{
    image?: ExpressionValue<string>;
  }>;
  emptyText?: ExpressionValue<string>;
  loadErrorText?: ExpressionValue<string>;
  lazyLoad?: ExpressionValue<boolean>;
  visible?: ExpressionValue<boolean>;
  hidden?: ExpressionValue<boolean>;
  className?: ExpressionValue<string>;
  style?: ExpressionValue<StyleProps>;
}

export const imagePresets = {
  /** 圆形头像（常用于列表/卡片中的联系人头像） */
  avatar: (urlOrFileId: ExpressionValue<string>, sourceType: "url" | "fileId" = "url", size: string = "40px"): ImageProps => ({
    source: {
      sourceType,
      value: urlOrFileId,
      alt: "avatar",
      title: "",
    },
    imageStyle: {
      width: size,
      height: size,
      objectFit: "cover",
      borderRadius: "50%",
    },
    preview: { enabled: false, zoomMin: 1, zoomMax: 5 },
  }),

  /** 可预览的常规卡片缩略图 */
  thumbnail: (urlOrFileId: ExpressionValue<string>, sourceType: "url" | "fileId" = "fileId"): ImageProps => ({
    source: {
      sourceType,
      value: urlOrFileId,
      alt: "",
      title: "",
    },
    imageStyle: {
      width: "120px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "6px",
    },
    preview: { enabled: true, zoomMin: 1, zoomMax: 5 },
  }),
};
