import { Query, Layer, ImageLayer } from "./types";
import sharp from "sharp";

export const generateImage = async (q: Query): Promise<string | Buffer> => {
  const { width, height, color = { r: 0, g: 0, b: 0, alpha: 0 } } = q.canvas;
  const { format = "png", by = "buffer" } = q.output ?? {};

  const canvas = sharp({
    create: {
      width: width,
      height: height,
      channels: 4,
      background: color,
    },
  });

  const compositeLayers = async (
    base: sharp.Sharp,
    layer: Layer
  ): Promise<sharp.Sharp> => {
    if (["png", "jpeg", "gif", "webp"].includes(layer.type)) {
      const { src, x = 0, y = 0, width, height, layers } = layer as ImageLayer;

      const image = sharp(
        new Uint8Array(
          (await fetch(src).then((res) => res.arrayBuffer())) as ArrayBuffer
        ),
        {}
      );

      // 元画像の大きさ
      const [srcWidth, srcHeight] = await image
        .metadata()
        .then((meta) => [Number(meta.width), Number(meta.height)]);
      // キャンバスの大きさ
      const [baseWidth, baseHeight] = await base
        .metadata()
        .then((meta) => [Number(meta.width), Number(meta.height)]);
      // リサイズ後の大きさ
      const realWidth = width ?? srcWidth;
      const realHeight = height ?? srcHeight;
      const left = Math.max(x, 0);
      const top = Math.max(y, 0);
      const extractLeft = Math.max(-x, 0);
      const extractTop = Math.max(-y, 0);
      const extractWidth = Math.min(baseWidth - left, realWidth - extractLeft);
      const extractHeight = Math.min(baseHeight - top, realHeight - extractTop);

      // 画面外に配置された場合
      if (
        extractLeft >= realWidth ||
        extractTop >= realHeight ||
        extractWidth <= 0 ||
        extractHeight <= 0
      ) {
        return base;
      }

      return base.composite([
        {
          // 子レイヤーが親レイヤーをはみ出すとエラーになる
          // extractは切り抜けない値を指定するとエラーになる
          input: await image
            .resize(width, height, { fit: "fill" })
            .extract({
              left: extractLeft,
              top: extractTop,
              width: extractWidth,
              height: extractHeight,
            })
            .toBuffer(),
          blend: base === canvas ? "over" : "atop",
          left: left,
          top: top,
        },
      ]);
    } else {
      return base;
    }
  };

  let base = canvas;

  for (const layer of q.canvas.layers ?? []) {
    base = await compositeLayers(base, layer);
  }

  const buffer = await base.toFormat(format).toBuffer();
  return by === "base64" ? buffer.toString("base64") : buffer;
};
