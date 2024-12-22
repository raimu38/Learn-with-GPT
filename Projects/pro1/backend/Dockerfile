FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

# 本番想定: --reload はつけない (必要に応じて付け替え)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]






