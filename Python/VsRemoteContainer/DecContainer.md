

# Python Dev Container 環境構築ドキュメント

このドキュメントは、VS Code Remote - Containers を用いて、Python 開発環境（numpy、matplotlib、pandas、fastapi などを含む）を Docker コンテナ上に構築するための設定ファイルと手順をまとめたものです。

## 1. プロジェクト構成

プロジェクトのディレクトリ構成は以下のようにします：

```
my-project/
├── docker-compose.yml
├── docker-compose.override.yml
├── Dockerfile
├── requirements.txt
├── .devcontainer/
│   └── devcontainer.json
└── src/
    └── main.py    // FastAPI アプリ等、実際のソースコード
```

## 2. 各ファイルの内容

### 2-1. Dockerfile

```dockerfile
# ベースイメージ（例: Python 3.12-slim）
FROM python:3.12-slim

# 必要なシェル環境を整えるため、bash をインストール
RUN apt-get update && apt-get install -y bash

# 作業ディレクトリの設定
WORKDIR /app

# 依存関係ファイルをコピーし、パッケージのインストール
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# プロジェクト全体をコピー
COPY . .

# （本番用 CMD 例：FastAPI アプリの場合）
# CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

※ 本番用の起動コマンドは必要に応じて変更してください。

---

### 2-2. requirements.txt

必要な Python パッケージを列挙します。例：

```txt
fastapi
pandas
numpy
matplotlib
uvicorn
```

※ 他に必要なパッケージがあれば追記してください。

---

### 2-3. docker-compose.yml

基本となる Compose ファイル。例として：

```yaml
version: '3'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    environment:
      - ENV=development
```

---

### 2-4. docker-compose.override.yml

開発用にオーバーライドする設定。VS Code Remote - Containers でシェル待機状態にするための設定例：

```yaml
version: '3'
services:
  backend:
    # コンテナが終了しないように、待機状態にする
    command: ["tail", "-f", "/dev/null"]
    # init オプションを有効にして、tini を利用（プロセス管理を改善）
    init: true
```

---

### 2-5. .devcontainer/devcontainer.json

VS Code Remote - Containers で使用する設定ファイル。docker-compose.yml と docker-compose.override.yml を両方指定して、backend サービスに接続します。

```json
{
  "name": "My Python Dev Container",
  "dockerComposeFile": [
    "../docker-compose.yml",
    "../docker-compose.override.yml"
  ],
  "service": "backend",
  "workspaceFolder": "/app",
  "remoteUser": "root",
  "customizations": {
    "vscode": {
      "settings": {
        "terminal.integrated.shell.linux": "/bin/bash",
        "python.pythonPath": "/usr/local/bin/python"
      },
      "extensions": [
        "ms-python.python",
        "ms-python.vscode-pylance"
      ]
    }
  },
  "postCreateCommand": "pip install -r requirements.txt"
}
```

**ポイント:**

- **dockerComposeFile:**  
  相対パスで基本の docker-compose.yml と開発用オーバーライドファイルを指定します。  
  ※ .devcontainer フォルダがプロジェクトルートのサブディレクトリにある場合、`"../"` を使って上位ディレクトリを参照します。

- **service:**  
  docker-compose.yml 内のサービス名（ここでは `"backend"`）を指定します。

- **workspaceFolder:**  
  コンテナ内で作業するディレクトリ。Dockerfile の WORKDIR と一致させます。

- **remoteUser:**  
  シェル環境や権限の問題を避けるため、`"root"` を指定しています。

- **customizations/vscode:**  
  VS Code の設定（ターミナルシェル、Python のパスなど）と、必要な拡張機能を指定します。

- **postCreateCommand:**  
  コンテナ作成後に依存パッケージをインストールするコマンドです。

---

## 3. 環境構築手順

1. **ファイルの配置**  
   上記の各ファイル（Dockerfile、docker-compose.yml、docker-compose.override.yml、requirements.txt、.devcontainer/devcontainer.json）をプロジェクトルートに配置します。

2. **VS Code でプロジェクトを開く**  
   VS Code を起動し、プロジェクトルートフォルダを開きます。

3. **Remote - Containers でコンテナを起動する**  
   - コマンドパレット（`Ctrl+Shift+P` または `F1`）を開き、「Remote-Containers: Reopen in Container」を実行します。  
   - VS Code は指定された docker-compose ファイルを使って、backend サービスを起動します。  
   - コンテナは docker-compose.override.yml の設定により `tail -f /dev/null` で待機状態となり、VS Code とのシェル接続が可能になります。

4. **開発開始**  
   コンテナ内で Python 環境が構築され、`pip install -r requirements.txt` により必要なパッケージがインストールされます。  
   VS Code の IntelliSense（コード補完）やデバッグ機能が有効になり、快適に開発が行えます。

5. **再ビルドやキャッシュクリアの必要がある場合**  
   コンテナ設定に変更があった場合、VS Code のコマンドパレットから「Remote-Containers: Rebuild Container」を実行してください。  
   また、Docker のキャッシュが原因の場合は `docker-compose down --volumes` や `docker system prune --all` で不要なキャッシュをクリアし、再ビルドを試みます。

---

## 4. 補足

- **複数コンテナ環境の場合**  
  複数のサービス（例：フロントエンドの Node.js、バックエンドの Python、データベースの MongoDB など）がある場合、各サービスごとに devcontainer.json を用意するか、あるいは必要なサービスにアタッチして開発を行います。  
  なお、VS Code は1つのコンテナにアタッチするため、複数サービスのうち開発中のものに接続する形になります。

- **環境変数やボリュームマウントの設定**  
  docker-compose.yml と docker-compose.override.yml の設定を適宜調整して、本番用と開発用の環境を分離できます。

---

## 5. まとめ

このドキュメントに沿ってファイルを用意し、VS Code Remote - Containers を使って再現すれば、同じ Python 開発環境を簡単に再構築できます。  
必要に応じて設定を変更することで、他のプロジェクトや複数コンテナ環境にも応用可能です。

---

