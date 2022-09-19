import { Query, Layer } from "./types";
import sharp from "sharp";
import fs from "fs";

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
    layer: Layer,
    blend?: sharp.Blend
  ): Promise<sharp.Sharp> => {
    if (layer.type === "image" || layer.type === "text") {
      const src = "src" in layer ? layer.src : undefined;
      const x = "x" in layer ? layer.x ?? 0 : 0;
      const y = "y" in layer ? layer.y ?? 0 : 0;
      const width = "width" in layer ? layer.width : undefined;
      const height = "height" in layer ? layer.height : undefined;
      const layers = "layers" in layer ? layer.layers : undefined;
      const text = "text" in layer ? layer.text : undefined;
      const font = "font" in layer ? layer.font : undefined;
      const fontfile = "fontfile" in layer ? layer.fontfile : undefined;

      let image =
        layer.type === "image"
          ? sharp(
              new Uint8Array(
                (await fetch(src as string).then((res) =>
                  res.arrayBuffer()
                )) as ArrayBuffer
              ),
              {}
            )
          : sharp({
              text: {
                text: text as string,
                rgba: true,
                width: width,
                height: height,
                font: font,
                fontfile: fontfile,
              },
            }).toFormat("png");

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

      fs.writeFileSync(
        "src/test/test" + Date.now() + ".png",
        await image.toBuffer()
      );

      image = sharp(
        await image
          .resize(width, height, { fit: "fill" })
          .extract({
            left: extractLeft,
            top: extractTop,
            width: extractWidth,
            height: extractHeight,
          })
          .toBuffer()
      );

      for (const layer of layers ?? []) {
        image = await compositeLayers(image, layer);
      }

      return sharp(
        await base
          .composite([
            {
              input: await image.toBuffer(),
              blend: blend ?? "atop",
              left: left,
              top: top,
            },
          ])
          .toFormat("png")
          .toBuffer()
      );
    } else {
      return base;
    }
  };

  let base = canvas;

  for (const layer of q.canvas.layers ?? []) {
    base = await compositeLayers(base, layer, "over");
  }

  const buffer = await base.toFormat(format).toBuffer();
  return by === "base64" ? buffer.toString("base64") : buffer;
};
