# ベースイメージ: DebianベースのC++環境
FROM ubuntu:22.04

# パッケージの更新と必要なツールのインストール
RUN apt-get update && apt-get install -y \
    g++ \
    cmake \
    make \
    git \
    wget \
    libsfml-dev \
    && apt-get clean

# 作業ディレクトリを設定
WORKDIR /app

# ソースコードをコンテナにコピー
COPY . .

# ビルド用のコマンドを指定（CMakeまたはMakefileを使用）
CMD ["make"]
