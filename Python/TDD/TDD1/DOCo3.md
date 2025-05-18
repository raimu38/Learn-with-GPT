**Considering TDD document format**

私は、Pythonの中級エンジニア向けのTDDハンズオンドキュメントを作成する必要があります。ユーザーの指示に従い、客観的・中立的なスタイルで、余計な賞賛や絵文字を使わないようにします。

また、文体は「です・ます」調にし、各回答には必ず英単語と日本語訳の表を含めます。研究結果を検索した際は、4列の表（タイトル、日付、要約、URL）を使用し、正規の資料やGitHubリポジトリを参照する訂正も行います。

**Considering documentation approach**

まず、asyncioやpytest、coverage.pyなどの最新ドキュメントリンクを検索すべきかもしれません。検索すると、「pytest documentation」や「coverage.py」などが候補です。ただし、内部知識に頼っても包括的な答えを出せる場合があります。ただし、ツールの指示に従うと、web.searchで得た情報には出典を明記する必要があります。このリクエストは技術的なドキュメントのため、トレンドに関するニュースではないので、最新バージョンのcoverage.py（例えば、7.x）を調べる方が良いかもしれません。


思考時間: 25 秒


### 章立て ＋ 各章冒頭の「目的」「背景理論」

| # | 章タイトル                   | 目的                                                              | 背景理論・落とし穴                                                                           |
| - | ----------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1 | **非同期処理のTDD**           | `asyncio` を用いた HTTP クライアントを TDD で実装し、非同期 I/O のテスト手法を習得します。      | イベントループ、`pytest‑asyncio`、テストダブル（`aresponses` など）での外部通信の疑似化。タイムアウトや Cancel に関する落とし穴。 |
| 2 | **パラメータ化テスト & 境界値分析**   | `pytest.mark.parametrize` と `hypothesis` による網羅的・プロパティベーステストの実践。 | 同値分割・境界値分析、生成ストラテジ、ケース爆発への対処（サンプル数制限、時間制限）。                                         |
| 3 | **依存関係とモジュール分割**        | DB や外部 API を `unittest.mock` / `pytest‑mock` で分離し、疎結合設計を体得します。  | ポリモーフィズム vs ダックタイピング、マジックモックの使い過ぎによる設計劣化。                                           |
| 4 | **DSL 風テスト記述**          | fixture・カスタムマーカでリーダブルなテスト DSL を作ります。                            | GIVEN‑WHEN‑THEN, テストデータビルダーパターン、フィクスチャのスコープ設計。                                      |
| 5 | **継承と Mixin によるテスト共通化** | ベーステストクラスと Mixin で重複コードを削減し、拡張性を高めます。                           | 継承階層の深さと可読性、DRY 原則とテストケース独立性のバランス。                                                  |
| 6 | **統合 & エンドツーエンドテスト**    | Docker Compose で Web サーバ + DB を起動し、HTTP 統合テストを構築します。            | コンテナ間依存、`wait-for-it` パターン、ヘルスチェックとフレーク対策。                                          |
| 7 | **カバレッジ基準とゲート**         | `coverage.py` と GitHub Actions で 80 %以上を自動ゲート。                  | ブランチ vs ステートメントカバレッジ、測定対象の除外設定。                                                     |
| 8 | **CI/CD パイプライン実装**      | テスト → ビルド → カバレッジ → セキュリティスキャンを自動化し、品質ゲートラインを確立します。             | キャッシュ利用による高速化、秘密情報の管理 (`GITHUB_TOKEN`, OIDC)。                                       |
| 9 | **リファクタリングパターン集**       | Strategy・Factory・Adapter をテスト駆動でリファクタリングする手順を体験します。             | テスト保護下での挙動保持、インターフェイス抽出とデータ構造移行。                                                    |

---

## 第1章 : 非同期処理のTDD

### 1. 目的

* `asyncio` ベースの軽量 HTTP クライアント (`GET` 専用) を TDD で開発し、非同期コードの書き方とテスト方法を身につけます。
* タイムアウト・リトライ・例外ハンドリングを含む中規模ロジックを安全に拡張できる設計を学びます。

### 2. 背景理論

* **イベントループ**: `asyncio.get_event_loop()` とタスクスケジューリング。
* **非同期テスト**: `pytest‑asyncio` により `async def test_*` を直接実行。
* **外部通信の疑似化**: `aresponses`（`aiohttp` 互換）で HTTP サーバをモック。
* **設計上の注意**:

  * 依存注入で `session`（`aiohttp.ClientSession`）を外部渡しにするとテストが容易。
  * タイムアウトは `asyncio.wait_for` でラップし、テストで短縮。

---

### 3. ステップ実装

#### 3‑1. リポジトリ初期化

```text
async-http-client-tdd/
├── app/
│   ├── __init__.py
│   └── http_client.py
├── tests/
│   ├── __init__.py
│   └── test_http_client.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── .github/
    └── workflows/
        └── ci.yml
```

`requirements.txt`

```text
aiohttp>=3.9
pytest>=8.2
pytest-asyncio>=0.23
aresponses>=2.2
coverage>=8.0
```

`Dockerfile`

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["pytest", "-q"]
```

`docker-compose.yml`（単一サービス）

```yaml
version: "3.9"
services:
  test:
    build: .
    volumes:
      - .:/app
```

GitHub Actions `.github/workflows/ci.yml`

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python: ["3.12"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python }}
      - run: pip install -r requirements.txt
      - run: pytest --cov=app --cov-report=xml
      - uses: codecov/codecov-action@v4
        with:
          files: coverage.xml
      - run: |
          python - << 'PY'
          import xml.etree.ElementTree as ET, sys
          root = ET.parse("coverage.xml").getroot()
          rate = float(root.attrib["line-rate"])
          if rate < 0.80:
              sys.exit("Coverage < 80%")
          PY
```

#### 3‑2. **Red** — テストを先に書く

`tests/test_http_client.py`

```python
import asyncio
import aiohttp
import pytest
import aresponses

from app.http_client import AsyncHttpClient, HttpError


@pytest.mark.asyncio
async def test_success(aresponses: aresponses.ResponsesMockServer):
    aresponses.get("example.com", "/", status=200, text="OK")
    async with aiohttp.ClientSession() as session:
        client = AsyncHttpClient(session, timeout=1.0)
        text = await client.get("https://example.com/")
    assert text == "OK"


@pytest.mark.asyncio
async def test_timeout(aresponses: aresponses.ResponsesMockServer):
    async def slow(_):
        await asyncio.sleep(2)
        return aresponses.Response(text="slow")
    aresponses.get("example.com", "/", slow)
    async with aiohttp.ClientSession() as session:
        client = AsyncHttpClient(session, timeout=0.1)
        with pytest.raises(asyncio.TimeoutError):
            await client.get("https://example.com/")


@pytest.mark.asyncio
async def test_http_error(aresponses):
    aresponses.get("example.com", "/", status=500)
    async with aiohttp.ClientSession() as session:
        client = AsyncHttpClient(session)
        with pytest.raises(HttpError) as e:
            await client.get("https://example.com/")
    assert e.value.status == 500
```

#### 3‑3. **Green** — 実装

`app/http_client.py`

```python
from __future__ import annotations
import asyncio
from dataclasses import dataclass

import aiohttp


class HttpError(Exception):
    """HTTP ステータス 4xx/5xx を例外化"""

    def __init__(self, status: int, url: str):
        super().__init__(f"{status} {url}")
        self.status = status
        self.url = url


@dataclass
class AsyncHttpClient:
    session: aiohttp.ClientSession
    timeout: float = 5.0
    retries: int = 0

    async def get(self, url: str) -> str:
        for attempt in range(self.retries + 1):
            try:
                return await asyncio.wait_for(self._fetch(url), self.timeout)
            except (asyncio.TimeoutError, HttpError) as e:
                if attempt >= self.retries:
                    raise
                await asyncio.sleep(2 ** attempt)  # back‑off

    async def _fetch(self, url: str) -> str:
        async with self.session.get(url) as resp:
            if resp.status >= 400:
                raise HttpError(resp.status, url)
            return await resp.text()
```

#### 3‑4. **Refactor** — 設計改善ポイント

* **再試行ポリシーの注入**: バックオフ関数をコンストラクタ引数で受け取り、テスト容易化。
* **抽象化**: `HttpClientProtocol` (PEP 544) を定義して依存側を型安全に。
* **タイムアウト短縮**: テストでは秒単位をミリ秒へスケールダウンし、CI 時間を抑制。

---

### 4. 応用演習

| # | 課題                                                   | ヒント                                 | 期待されるテスト結果                                          |
| - | ---------------------------------------------------- | ----------------------------------- | --------------------------------------------------- |
| 1 | POST メソッド対応 (`json`/`data`) を追加し、ステータス 201 を正常扱いとする。 | `_fetch` をジェネリックに (`method="GET"`)。 | `await client.post(url, json=…)` が `"created"` を返す。 |
| 2 | セマフォで同時接続数 (`max_concurrency`) を制限。                  | `asyncio.Semaphore` をコンストラクタ注入。     | 100 件並列取得しても `pending <= max_concurrency` をアサート。    |
| 3 | `Retry‑After` ヘッダを尊重するリトライ実装。                        | `resp.headers.get("Retry-After")`.  | モックで `Retry-After: 2` を返し、次回呼び出しが \~2 秒後。           |

---

### 5. ポイントまとめ

* **非同期テスト**は `pytest‑asyncio` が最も簡潔。イベントループを直接扱う必要はありません。
* **外部依存の疑似化**により、ネットワーク不要で高速・安定したテストが実現します。
* タイムアウトとリトライは **実装前** にテストで仕様を固定しておくと、リファクタリング耐性が大幅に向上します。

---

### 6. 関連英単語 10 語

| 英単語              | 日本語訳    |
| :--------------- | :------ |
| Asynchronous     | 非同期     |
| Event Loop       | イベントループ |
| Semaphore        | セマフォ    |
| Back‑off         | バックオフ   |
| Timeout          | タイムアウト  |
| Fixture          | フィクスチャ  |
| Coverage         | カバレッジ   |
| Integration Test | 統合テスト   |
| Mock Server      | モックサーバ  |
| Retry Policy     | 再試行ポリシー |

---

次のメッセージ以降で第2章以降を順次展開いたします。

