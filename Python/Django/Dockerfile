
# ベースイメージとして公式のPythonイメージを使用
FROM python:3.9-slim

# 環境変数の設定
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 作業ディレクトリの作成
WORKDIR /code

# 依存関係をインストールするためにrequirements.txtをコピー
COPY ./app/requirements.txt /code/

# pipのアップグレードと依存関係のインストール
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# アプリケーションコードをコピー
COPY ./app /code/
