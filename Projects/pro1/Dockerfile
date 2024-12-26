
#DOckerHubからイメージを取得
FROM python:3.11-slim

# コンテナ内での設定
WORKDIR /app

#ローカルの位app/requirements.txtをコンテナの　作業ディレクトリにコピー。　/app/requirements.txt
COPY app/requirements.txt .

#--nochace-dir キャッシュを残さない 
RUN pip install --no-cache-dir -r requirements.txt

# ローカルのappディレクトリ全体を コンテナの/appにコピー
COPY app /app

CMD ["uvicorn","main:app","--host","0.0.0.0","--port","8000"]


