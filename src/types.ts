import sharp from "sharp";

export type Query = {
  canvas: CanvasLayer;
  output?: {
    format?: "png" | "jpeg" | "webp";
    by?: "base64" | "buffer";
  };
};

export type CanvasLayer = {
  width: number;
  height: number;
  color?: sharp.Color;
  layers?: Layer[];
};

export type Layer = ImageLayer | ShapeLayer | TextLayer;

export type ImageLayer = {
  type: ImageType;
  src: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  layers?: Layer[];
};

export type ShapeLayer = {
  type: ShapeType;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  color?: sharp.Color;
  layers?: Layer[];
};

export type TextLayer = {
  type: TextType;
  text: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color?: sharp.Color;
  font?: string;
  layers?: Layer[];
};

export type ImageType = "png" | "jpeg" | "gif" | "webp";
export type ShapeType = "rect" | "circle" | "ellipse" | "triangle" | "line";
export type TextType = "text";
export type CanvasType = "canvas";
