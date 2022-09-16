import fs from "fs";
import { generateImage } from "../index";
import { Query } from "../types";

(async () => {
  const query: Query = {
    canvas: {
      width: 100,
      height: 50,
      color: { r: 255, g: 255, b: 0, alpha: 0.5 },
      layers: [
        {
          type: "jpeg",
          src: "https://note.affi-sapo-sv.com/img/composite-base.jpg",
          x: 10,
          y: 10,
        },
      ],
    },
    output: {
      format: "png",
      by: "buffer",
    },
  };
  const image = await generateImage(query);
  fs.writeFileSync("test.png", image);
})();
