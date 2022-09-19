import fs from "fs";
import { generateImage } from "../index";
import { Query } from "../types";

(async () => {
  const query: Query = {
    canvas: {
      width: 200,
      height: 200,
      color: { r: 255, g: 255, b: 0, alpha: 0.2 },
      layers: [
        {
          type: "image",
          src: "https://pbs.twimg.com/media/Fc1mmLraMAEEFzx?format=png&name=360x360",
          x: -50,
          y: -50,
          width: 300,
          height: 300,
          layers: [
            {
              type: "image",
              src: "https://pbs.twimg.com/media/Fc1mmtrakAAIKis?format=png&name=360x360",
              x: -50,
              y: -50,
              width: 300,
              height: 300,
              layers: [
                {
                  type: "image",
                  src: "https://pbs.twimg.com/media/Fc1mojRacAEsySc?format=png&name=360x360",
                  x: 70,
                  y: 80,
                  width: 100,
                  height: 100,
                },
              ],
            },
          ],
        },
        {
          type: "image",
          src: "https://pbs.twimg.com/media/Fc1mnlyaEAEuRvj?format=png&name=360x360",
          x: 30,
          y: 50,
          width: 100,
          height: 100,
        },
        {
          type: "text",
          text: "A永あ\n👴😶‍🌫️🥰",
          width: 200,
          height: 200,
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
