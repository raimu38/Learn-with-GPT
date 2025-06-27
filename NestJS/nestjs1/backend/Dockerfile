# ベースイメージに Node.js（Alpine）を使用
FROM node:20-alpine

# 作業ディレクトリ
WORKDIR /usr/src/app

# 依存関係と型定義設定ファイルを先にコピーしてキャッシュ活用
COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./

# 全ての依存（devDependencies 含む）をインストール
RUN npm install

# アプリケーションコードをまとめてコピー
COPY . .

# 開発モード起動コマンド
# Nest CLI は devDependencies に含まれる @nestjs/cli で動きます
CMD ["npm", "run", "start:dev"]
