import fs from "fs";
import { generateImage } from "../index";
import { Query } from "../types";

(async () => {
  const query: Query = {
    canvas: {
      width: 200,
      height: 200,
      color: { r: 0, g: 255, b: 255, alpha: 0.2 },
      layers: [
        {
          type: "png",
          src: "https://pbs.twimg.com/media/Fc1mmLraMAEEFzx?format=png&name=360x360",
          x: -50,
          y: -50,
          width: 300,
          height: 300,
          layers: [
            {
              type: "png",
              src: "https://pbs.twimg.com/media/Fc1mmtrakAAIKis?format=png&name=360x360",
              x: -50,
              y: -50,
              width: 300,
              height: 300,
            },
          ],
        },
      ],
    },
    output: {
      format: "png",
      by: "buffer",
    },
  };
  const image = await generateImage(query);
  fs.writeFileSync("src/test/test.png", image);
})();
