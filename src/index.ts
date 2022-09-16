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

      return base.composite([
        {
          input: await sharp(
            new Uint8Array(
              (await fetch(src).then((res) => res.arrayBuffer())) as ArrayBuffer
            ),
            {}
          )
            .resize(width, height)
            .extract({
              left: Math.max(-x, 0),
              top: Math.max(-y, 0),
              width:
                Number(await base.metadata().then((meta) => meta.width)) -
                Math.max(x, 0),
              height:
                Number(await base.metadata().then((meta) => meta.height)) -
                Math.max(y, 0),
            })
            .toBuffer(),
          blend: "atop",
          left: Math.max(x, 0),
          top: Math.max(y, 0),
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
