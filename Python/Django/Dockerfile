# ベースイメージとして公式の Python 3.11 イメージを使用
FROM python:3.11-slim

# 環境変数を設定（バッファリングを無効化）
ENV PYTHONUNBUFFERED 1

# 作業ディレクトリを /app に設定
WORKDIR /app

# 必要なシステム依存パッケージをインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 依存関係をインストールするためのファイルをコピー
COPY requirements.txt /app/

# Python の依存関係をインストール
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# プロジェクトのソースコードをコピー
COPY src/ /app/

# ポート 8000 を開放
EXPOSE 8000

# コンテナ起動時に実行するコマンド
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

