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
          text: `AAAAAAAAAAAAAA&lt;b&gt;test&lt;/b&gt;<i>あ永A</i>👴😶‍🌫️🥰㋿`,
          width: 150,
          font: "メイリオ 20",
          justify: true,
          align: "center",
          spacing: 0.2,
          x: -2,
          y: 0,
          layers: [
            {
              type: "image",
              src: "https://pbs.twimg.com/media/FZz-B0eVsAAVKgW?format=jpg&name=large",
              width: 150,
              height: 50,
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
