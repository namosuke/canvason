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
  type: "image";
  src: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  layers?: Layer[];
};

export type ShapeLayer = {
  type: "rect" | "circle" | "ellipse" | "triangle" | "line";
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  color?: sharp.Color;
  layers?: Layer[];
};

export type TextLayer = {
  type: "text";
  text: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  font?: string;
  fontfile?: string;
  align?: "left" | "center" | "right";
  justify?: boolean;
  spacing?: number;
  layers?: Layer[];
};
