FROM node:18-alpine as builder

WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

COPY . /app/

# Next.js のビルドを実行
RUN npm run build

# シンプルに Nginx などで静的に配信するために out フォルダを作る
# (next.config.js で出力先を out に指定している前提)
FROM node:18-alpine as runner
WORKDIR /app

# builder からビルド済みファイルをコピー
COPY --from=builder /app/out /app/out

# 必要に応じて Node.js サーバとして起動したい場合はここで
# next start などのコマンドを書くが、今回は静的ファイルとして出力のみと想定
CMD ["npx", "serve", "out", "-l", "3000"]