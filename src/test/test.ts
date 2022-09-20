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
          font: "ぎゃーてーるみねっせんす 20",
          fontfile: "src",
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
        {
          type: "image",
          src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxvZ28iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyNDggMjA0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNDggMjA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnIGlkPSJMb2dvXzFfIj4KCTxwYXRoIGlkPSJ3aGl0ZV9iYWNrZ3JvdW5kIiBjbGFzcz0ic3QwIiBkPSJNMjIxLjk1LDUxLjI5YzAuMTUsMi4xNywwLjE1LDQuMzQsMC4xNSw2LjUzYzAsNjYuNzMtNTAuOCwxNDMuNjktMTQzLjY5LDE0My42OXYtMC4wNAoJCUM1MC45NywyMDEuNTEsMjQuMSwxOTMuNjUsMSwxNzguODNjMy45OSwwLjQ4LDgsMC43MiwxMi4wMiwwLjczYzIyLjc0LDAuMDIsNDQuODMtNy42MSw2Mi43Mi0yMS42NgoJCWMtMjEuNjEtMC40MS00MC41Ni0xNC41LTQ3LjE4LTM1LjA3YzcuNTcsMS40NiwxNS4zNywxLjE2LDIyLjgtMC44N0MyNy44LDExNy4yLDEwLjg1LDk2LjUsMTAuODUsNzIuNDZjMC0wLjIyLDAtMC40MywwLTAuNjQKCQljNy4wMiwzLjkxLDE0Ljg4LDYuMDgsMjIuOTIsNi4zMkMxMS41OCw2My4zMSw0Ljc0LDMzLjc5LDE4LjE0LDEwLjcxYzI1LjY0LDMxLjU1LDYzLjQ3LDUwLjczLDEwNC4wOCw1Mi43NgoJCWMtNC4wNy0xNy41NCwxLjQ5LTM1LjkyLDE0LjYxLTQ4LjI1YzIwLjM0LTE5LjEyLDUyLjMzLTE4LjE0LDcxLjQ1LDIuMTljMTEuMzEtMi4yMywyMi4xNS02LjM4LDMyLjA3LTEyLjI2CgkJYy0zLjc3LDExLjY5LTExLjY2LDIxLjYyLTIyLjIsMjcuOTNjMTAuMDEtMS4xOCwxOS43OS0zLjg2LDI5LTcuOTVDMjQwLjM3LDM1LjI5LDIzMS44Myw0NC4xNCwyMjEuOTUsNTEuMjl6Ii8+CjwvZz4KPC9zdmc+Cg==",
          x: 150,
          y: 0,
          width: 50,
          height: 40,
        },
        {
          type: "rect",
          x: 140,
          y: 110,
          width: 40,
          height: 30,
          fill: "#00004455",
          stroke: "red",
          strokeWidth: 3,
          rx: 100,
          ry: 10,
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
