export type Query = {
  canvas: Canvas;
};

export type Canvas = {
  w: Width;
  h: Height;
  layers: Layer[];
};

export type Width = number;
export type Height = number;

export type Layer = ImageLayer | ShapeLayer | FontLayer;

export type ImageLayer = {
  format: "png" | "jpeg" | "gif" | "webp";
  src: string;
  x: X;
  y: Y;
  w: Width;
  h: Height;
};

export type ShapeLayer = {
  format: "rect" | "circle" | "ellipse";
  x: X;
  y: Y;
  w: Width;
  h: Height;
};

export type FontLayer = {
  format: "otf" | "ttf" | "woff" | "woff2";
  src: string;
  x: X;
  y: Y;
  size: FontSize;
  color: Color;
  text: string;
};

export type X = number;
export type Y = number;
export type FontSize = number;
export type Color = string;
