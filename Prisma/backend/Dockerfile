# backend/Dockerfile
FROM node:20-buster-slim

# 作業ディレクトリを設定
WORKDIR /app

# ホスト側の package.json, tsconfig.json, package-lock.json をコピー
COPY package.json tsconfig.json  ./

# 依存パッケージをインストールする
RUN npm install

# Prisma のスキーマファイルをコピー
COPY prisma ./prisma

# ソースコードをコピー
COPY src ./src

# Prisma クライアントの生成
RUN npx prisma generate

# 3000番ポートを公開
EXPOSE 3000

# コンテナ起動時に TypeScript の実行（開発向け）
CMD ["npx", "ts-node", "src/index.ts"]
