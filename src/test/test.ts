import fs from "fs";
import { generateImage } from "../index";
import { Query } from "../types";

(async () => {
  const query: Query = {
    canvas: {
      width: 200,
      height: 200,
      layers: [
        {
          type: "png",
          src: "https://pbs.twimg.com/media/Fc1mmLraMAEEFzx?format=png&name=360x360",
          x: 150,
          y: -300,
          width: 100,
          height: 700,
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
