# template-node-ts-docker

Node.js、TypeScript、Docker のテンプレート

## 使い方

### 開発用に起動

```sh
yarn dev
```

実行されるファイルは`src/app.ts`です。

### 本番用に起動

```sh
yarn build
yarn start
```

### Docker で本番用に起動

コマンド例：

```sh
docker build -t project-name .
docker run --rm -it project-name
// とか
docker run -it -d --restart always --env-file .env -p 3000:3000 project-name
```

## 環境変数について

`.env`ファイルがあれば、`process.env.DATABASE_URL`のような書き方で値を読み込めます。
