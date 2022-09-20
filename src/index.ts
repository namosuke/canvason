import { Query, Layer } from "./types";
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
    layer: Layer,
    blend?: sharp.Blend
  ): Promise<sharp.Sharp> => {
    if (
      layer.type === "image" ||
      layer.type === "text" ||
      layer.type === "rect"
    ) {
      const x = layer.x ?? 0;
      const y = layer.y ?? 0;
      const width = layer.width;
      const height = layer.height;
      const layers = layer.layers;

      const svgSanitize = (text: string | undefined): string | undefined => {
        return text?.replace("'", "").replace('"', "");
      };

      let image =
        layer.type === "image"
          ? sharp(
              new Uint8Array(
                (await fetch(layer.src).then((res) =>
                  res.arrayBuffer()
                )) as ArrayBuffer
              ),
              {}
            )
          : layer.type === "text"
          ? sharp({
              text: {
                text: layer.text,
                rgba: true,
                width: width,
                height: height,
                font: layer.font,
                fontfile: layer.fontfile,
                align: layer.align,
                justify: layer.justify,
                spacing: layer.spacing,
              },
            }).toFormat("png")
          : sharp(
              Buffer.from(`
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
              <rect width="100%" height="100%" fill="${svgSanitize(
                layer.fill
              )}" stroke="${svgSanitize(layer.stroke)}" stroke-width="${
                layer.strokeWidth
              }" rx="${layer.rx}" ry="${layer.ry}"/>
            </svg>
          `)
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
