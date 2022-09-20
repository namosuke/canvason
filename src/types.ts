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

export type Layer =
  | ImageLayer
  | TextLayer
  | RectLayer
  | CircleLayer
  | EllipseLayer
  | PolygonLayer;

export type ImageLayer = {
  type: "image";
  src: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
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

export type RectLayer = {
  type: "rect";
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  rx?: number;
  ry?: number;
  layers?: Layer[];
};

export type CircleLayer = {
  type: "circle";
  x?: number;
  y?: number;
  r?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  layers?: Layer[];
};

export type EllipseLayer = {
  type: "ellipse";
  x?: number;
  y?: number;
  rx?: number;
  ry?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  layers?: Layer[];
};

export type PolygonLayer = {
  type: "polygon";
  points: string;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  layers?: Layer[];
};
