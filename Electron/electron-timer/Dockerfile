# ビルドステージ
FROM node:22-bookworm-slim AS builder
WORKDIR /app

# system依存最小限（electron起動に必要なライブラリを含める）
RUN apt-get update && \
    apt-get install -y git libgtk-3-0 libx11-xcb1 libnss3 libasound2 libxss1 libxtst6 libxrandr2 libgbm1 x11-utils && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# 実行ステージ
FROM node:22-bookworm-slim
WORKDIR /app

# 依存するライブラリ群（Electron実行に必要）
RUN apt-get update && \
    apt-get install -y libgtk-3-0 libx11-xcb1 libnss3 libasound2 libxss1 libxtst6 libxrandr2 libgbm1 x11-utils && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /app ./

ENV DISPLAY=:0
CMD ["npx", "electron", "--no-sandbox", "dist/main.js"]


