# canvason

## Overview

JSON を引数にとり、画像を生成するライブラリです。  
開発中のため、まだ使用することはできません。

## Installation

```sh
yarn add canvason
```

## Usage

```ts
import { generateImage } from "canvason";

const query = {
  canvas: {
    w: 1980,
    h: 1080,
    layers: [
      {
        format: "png",
        src: "https://.../bg.png",
        x: 0,
        y: 0,
        w: 1920,
        h: 1080,
      },
      {
        format: "png",
        src: "https://.../stage_bg.png",
        x: 100,
        y: 100,
        w: 800,
        h: 450,
        masks: [
          {
            format: "rect",
            x: 100,
            y: 100,
            w: 800,
            h: 450,
            rounded: 40,
          },
        ],
      },
      {
        format: "otf",
        src: "https://.../font.otf",
        text: "Hello World",
        color: "#000000",
        size: 100,
        x: 100,
        y: 100,
      },
    ],
  },
};

const base64 = generateImage(query, { output: "base64" });
```
