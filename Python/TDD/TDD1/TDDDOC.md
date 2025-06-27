中級Pythonエンジニア向けハンズオンTDDドキュメント1. 非同期処理のTDD🎯 目的本章では、Pythonのasyncioライブラリを用いて非同期処理を行うHTTPクライアントモジュールをテスト駆動開発（TDD）の手法で開発します。非同期コードのテストにおける特有の課題と、その解決に必要となる技術を習得することを目的とします。📚 背景理論Pythonにおける非同期プログラミングは、asyncioライブラリによって実現されます。イベントループ、コルーチン、async/await構文といった概念は、I/Oバウンドな処理を効率的に行うために重要です。しかし、非同期コードのテストは、その非決定性な実行順序や、テスト内でのイベントループの管理など、同期的なコードのテストとは異なる課題を伴います。非同期コードのテストにおける一般的なパターンとベストプラクティスには、pytest-asyncioのようなライブラリを利用したイベントループの管理、非同期関数やメソッドのモック、そしてタイムアウトやエラーハンドリングのテスト戦略が含まれます。実際の非同期処理では、ネットワーク遅延などの要因も考慮する必要があり、テスト設計においてもこれらの要素を意識することが重要です。非同期処理のテストにおける主要な難点は、その実行順序が予測困難である点にあります。そのため、テストは潜在的な競合状態に対処し、予測可能な結果を保証するように設計されなければなりません。同期的なテスト手法では、非同期コードの順序不同な性質に対応できない可能性があり、結果として不安定なテストや誤った結果を生むことがあります。したがって、非同期環境を制御またはシミュレートするための特別な手法が必要となります。⚙️ ステップ実装リポジトリひな形deep_research_tdd/
├── http_client/
│   ├── __init__.py
│   └── client.py
└── tests/
    └── test_http_client.py
小タスク
非同期HTTPクライアントのインターフェースを定義します。例えば、URLを受け取りHTTP GETリクエストを行うfetchメソッドです。
fetchメソッドが指定されたURLに対してGETリクエストを行うことを検証する最初のテストケースを記述します。
http_client/client.pyにasyncioとaiohttp（またはデモンストレーション用の簡略化されたバージョン）を用いてfetchメソッドを実装します。
異なるHTTPメソッド（POSTなど）のためのテストを記述します。
ネットワークの問題や無効なレスポンスに対するエラーハンドリングを実装します。
テスト結果に基づいてコードを必要に応じてリファクタリングします。
コードスニペットPython# tests/test_http_client.py
import pytest
import asyncio
from unittest.mock import AsyncMock

from http_client.client import fetch

@pytest.mark.asyncio
async def test_fetch_returns_non_empty_string():
    mock_response = AsyncMock()
    mock_response.text.return_value = "Test response"
    mock_session = AsyncMock()
    mock_session.get.return_value = mock_response
    fetch.session = mock_session  # モックセッションを注入

    result = await fetch("http://example.com")
    assert result == "Test response"
    mock_session.get.assert_called_once_with("http://example.com")

@pytest.mark.asyncio
async def test_fetch_handles_error_status():
    mock_response = AsyncMock()
    mock_response.raise_for_status.side_effect = Exception("HTTP error")
    mock_session = AsyncMock()
    mock_session.get.return_value = mock_response
    fetch.session = mock_session  # モックセッションを注入

    with pytest.raises(Exception, match="HTTP error"):
        await fetch("http://example.com/error")

# http_client/client.py
import asyncio
import aiohttp

session = None

async def get_session():
    global session
    if session is None:
        session = aiohttp.ClientSession()
    return session

async def fetch(url: str) -> str:
    async with await get_session() as s:
        async with s.get(url) as response:
            response.raise_for_status()
            return await response.text()
応用演習
リクエストヘッダーとクエリパラメータを実装します。
JSONリクエストボディのサポートを追加します。
異なるHTTPステータスコードの適切な処理を保証するテストを記述します。
ヒント: pytest.mark.parametrizeを使用して、ヘッダーとパラメータの異なる組み合わせをテストします。レスポンスを制御するために、基盤となるHTTPライブラリをモックします。期待するテスト結果: すべてのテストが成功し、非同期HTTPクライアントの正しい機能とエラー処理が実証されること。ポイントまとめ
非同期コードのテストには、特別なツールとテクニックが必要です。
非同期操作のモックは、テスト対象のコードを分離するために不可欠です。
エラー条件とエッジケースの徹底的なテストは、堅牢な非同期アプリケーションにとって重要です。
pytest-asyncioを使用すると、イベントループを管理することで非同期コードのテストが簡素化されます。
関連英単語と日本語訳英単語 (English)日本語訳 (Japanese)Asynchronous非同期Event LoopイベントループCoroutineコルーチンMockingモックPlaceholderプレースホルダーError HandlingエラーハンドリングNetwork Latencyネットワーク遅延TimeoutタイムアウトRequest HeadersリクエストヘッダーQuery ParametersクエリパラメータJSON Request BodyJSONリクエストボディHTTP Status CodeHTTPステータスコード2. パラメータ化テスト＆境界値分析🎯 目的pytest.mark.parametrizeを用いたパラメータ化テストと、hypothesisを用いたプロパティベーステストの手法を習得し、複数の入力シナリオと境界値ケースを効率的に網羅することで、より効果的で包括的なテストを作成します。📚 背景理論パラメータ化テストは、異なる入力データセットを用いて同じテストロジックを実行することで、コードの重複を避け、テストカバレッジを向上させるための手法です。pytest.mark.parametrizeを使用すると、単一のテスト関数内で複数のテストケースを簡潔に定義できます。境界値分析は、入力ドメインの境界付近の値（最小値、最大値、境界の直前・直後の値など）に注目してテストケースを設計するテスト設計技法であり、潜在的なエラーを見つけやすくします。一方、hypothesisライブラリによるプロパティベーステストは、関数の特性（プロパティ）を定義することで、hypothesisがそのプロパティを満たす様々なテストケースを自動的に生成します。これにより、手動で考えられる範囲を超える広範な入力に対するテストが可能となり、予期せぬエッジケースの発見に役立ちます。パラメータ化されたテストは、複数の入力シナリオを効率的にテストするためにコードの重複を減らし、テストカバレッジを向上させます。プロパティベースのテストは、自動的にテストケースを生成し、予期しないエッジケースを見つける可能性を高めることで、さらに一歩進んでいます。⚙️ ステップ実装リポジトリひな形deep_research_tdd/
├── calculator/
│   ├── __init__.py
│   └── operations.py
└── tests/
    └── test_operations.py
小タスク
calculator/operations.pyに、単純な加算関数add(x: int, y: int) -> intを実装します。
tests/test_operations.pyで、pytest.mark.parametrizeを使用してadd関数に対するパラメータ化されたテスト関数を作成し、正の数、負の数、ゼロの様々な組み合わせをテストします。典型的なシナリオと境界値（例えば、可能な整数の最大値と最小値、またはゼロに近い値）を含めます。
divide(x: float, y: float) -> float関数を実装します。
境界値分析を用いて、divide関数の重要なテストケース、特にゼロ除算や非常に小さい数による除算に関するものを特定します。これらのケースに対してパラメータ化されたテストを記述します。
hypothesisライブラリをインストールします。
@given(st.integers(), st.integers())を使用して、add関数の可換性（add(a, b) == add(b, a)）をアサートするプロパティベースのテストを記述します。
add関数の結合性をアサートする別のプロパティベースのテストを記述します。
hypothesisがどのように自動的にテストケースを生成し、手動では考慮しなかった可能性のあるエッジケースを発見するかを観察します。
コードスニペットPython# calculator/operations.py
def add(x: int, y: int) -> int:
    return x + y

def divide(x: float, y: float) -> float:
    if y == 0:
        raise ValueError("Cannot divide by zero")
    return x / y

# tests/test_operations.py
import pytest
from hypothesis import given, strategies as st
from calculator.operations import add, divide

@pytest.mark.parametrize("x, y, expected", [
    (1, 2, 3),
    (-1, 2, 1),
    (0, 0, 0),
    (100, -50, 50),
])
def test_add_with_parametrize(x, y, expected):
    assert add(x, y) == expected

@pytest.mark.parametrize("x, y, expected", [
    (10.0, 2.0, 5.0),
    (-10.0, 2.0, -5.0),
    (5.0, 1.0, 5.0),
    (5.0, -1.0, -5.0),
    (1.0, 0.1, 10.0),
    (-1.0, -0.1, 10.0),
])
def test_divide_valid_inputs(x, y, expected):
    assert divide(x, y) == pytest.approx(expected)

@pytest.mark.parametrize("x, y", [
    (5.0, 0.0),
    (-5.0, 0.0),
    (0.0, 0.0),
])
def test_divide_by_zero(x, y):
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(x, y)

@given(st.integers(), st.integers())
def test_add_is_commutative(a, b):
    assert add(a, b) == add(b, a)

@given(st.integers(), st.integers(), st.integers())
def test_add_is_associative(a, b, c):
    assert add(a, add(b, c)) == add(add(a, b), c)
応用演習
文字列入力を受け取り、型変換を行う関数をテストします。hypothesisのst.text()戦略を使用して、様々な文字列入力を生成します。
正規表現を使用してメールアドレスや電話番号を検証する関数をテストします。
リスト、辞書、カスタムデータ型など、特定の種類のデータを生成するための様々なhypothesis戦略を探索します。
ヒント: 特定の種類のデータ（整数、浮動小数点数、文字列、リストなど）を生成するための様々なhypothesis戦略を探索します。期待するテスト結果: パラメータ化されたテストは、定義されたすべての入力セットに対して成功するはずです。hypothesisは、定義されたプロパティの違反を検出しないはずです。ポイントまとめ
パラメータ化テストは、テストの効率とカバレッジを向上させます。
境界値分析は、重要なテスト入力を選択するのに役立ちます。
hypothesisは、隠れたバグを発見できるプロパティベースのテストを可能にします。
hypothesisの戦略を理解することは、効果的なプロパティベースのテストの鍵です。
プロパティベースのテストは、複雑な入力ドメインや数学的特性を持つ関数をテストするのに特に有効です。
関連英単語と日本語訳英単語 (English)日本語訳 (Japanese)Parameterized Testingパラメータ化テストBoundary Value Analysis境界値分析Property-Based TestingプロパティベーステストEdge CasesエッジケースInput Domain入力ドメインCommutativity可換性Associativity結合性Strategies戦略Regular Expression正規表現Custom Data Typeカスタムデータ型3. 依存関係とモジュール分割🎯 目的unittest.mockとpytest-mockを使用して、データベースI/Oや外部API呼び出しなどの依存関係を分離し、より焦点を絞った信頼性の高いユニットテストを作成する方法を学びます。📚 背景理論ユニットテストにおいて依存関係を分離することの重要性について説明します。依存関係が密結合したコードをテストすることの欠点（例えば、テストの実行速度が遅い、外部システムへの依存、障害の特定が困難）について議論します。モックとスタブの概念を紹介し、それらの違いと使い分けを説明します。ここでは、モックを、依存関係を制御された代替物（「モックオブジェクト」）で置き換え、それが正しく呼び出されたことを検証するために検査できるものとして重点的に説明します。unittest.mockライブラリの詳細な紹介を行い、MagicMock、patch、return_value、side_effectなどの主要な機能と、モックオブジェクトとのインタラクションを検証するためのアサーション（例えば、assert_called_once()、assert_called_with()）について説明します。pytest-mockを、unittest.mockをより便利にラップしたpytestプラグインとして紹介し、pytestテスト内でのモックをより簡潔かつ統合的な方法で実行する方法を示します。pytest-mockが一般的なモックタスクをどのように簡素化するかを示します。データベースI/O操作、外部API呼び出し、アプリケーション内の他のモジュールやサービスとのインタラクションなど、さまざまな種類の依存関係を特定してモックするための戦略について議論します。モックを使用すると、依存関係の実際の動作に依存することなく、ユニットのロジックを単独でテストできます。これにより、テストの速度が向上し、予測可能性が高まり、外部要因の影響を受けにくくなります。⚙️ ステップ実装リポジトリひな形deep_research_tdd/
├── user_service/
│   ├── __init__.py
│   └── service.py
├── database/
│   └── db_operations.py
└── tests/
    └── test_user_service.py
小タスク
user_service/service.pyに、ユーザーデータをデータベースに保存するためにDatabaseクラス（database/db_operations.pyで定義されていると仮定）に依存するUserServiceクラスを実装します。Databaseクラスには、fetch_one(query: str, params: dict)というメソッドがあると仮定します。
tests/test_user_service.pyに、get_user_by_idメソッドをテストするためのテスト関数を記述します。
unittest.mock.MagicMockを使用して、テスト内にモックのDatabaseオブジェクトを作成します。モックのfetch_oneメソッドが、予期されるクエリとパラメータで呼び出されたときに特定のユーザー辞書を返すように設定します。
モックのDatabaseオブジェクトを使用してUserServiceをインスタンス化し、get_user_by_idメソッドを呼び出します。メソッドが予期されるユーザーデータを返すことをアサートします。また、モックオブジェクトのアサーションを使用して、fetch_oneメソッドが正しい引数で正確に一度呼び出されたことを検証します。
より簡潔な構文（例えば、mocker.patch.objectを使用）で同じ結果を達成するために、pytest-mockのmockerフィクスチャを使用してテスト関数を書き直します。
別のメソッドをUserServiceに実装し、外部APIと対話します（例えば、追加のユーザー詳細を取得するため）。モックを使用してAPIレスポンスをシミュレートし、異なるAPIの結果（成功レスポンス、エラーレスポンス）に基づいてUserServiceのロジックをテストします。
コードスニペットPython# user_service/service.py
from database.db_operations import Database

class UserService:
    def __init__(self, db: Database):
        self.db = db

    def get_user_by_id(self, user_id: int):
        return self.db.fetch_one("SELECT * FROM users WHERE id = :user_id", {"user_id": user_id})

    def update_user_status(self, user_id: int, status: str):
        # 外部API呼び出しをシミュレート
        import requests
        response = requests.post(f"https://api.example.com/users/{user_id}/status", json={"status": status})
        response.raise_for_status()
        self.db.execute("UPDATE users SET status = :status WHERE id = :user_id", {"user_id": user_id, "status": status})

# database/db_operations.py
class Database:
    def fetch_one(self, query: str, params: dict):
        # 実際のデータベース操作はここでは省略
        pass

    def execute(self, query: str, params: dict):
        # 実際のデータベース操作はここでは省略
        pass

# tests/test_user_service.py
import pytest
from unittest.mock import MagicMock, patch
from user_service.service import UserService
from database.db_operations import Database

def test_get_user_by_id_with_unittest_mock():
    mock_db = MagicMock(spec=Database)
    mock_db.fetch_one.return_value = {"id": 1, "name": "Test User"}
    user_service = UserService(mock_db)
    user = user_service.get_user_by_id(1)
    assert user == {"id": 1, "name": "Test User"}
    mock_db.fetch_one.assert_called_once_with("SELECT * FROM users WHERE id = :user_id", {"user_id": 1})

def test_get_user_by_id_with_pytest_mock(mocker):
    mock_db = mocker.Mock(spec=Database)
    mock_db.fetch_one.return_value = {"id": 1, "name": "Test User"}
    user_service = UserService(mock_db)
    user = user_service.get_user_by_id(1)
    assert user == {"id": 1, "name": "Test User"}
    mock_db.fetch_one.assert_called_once_with("SELECT * FROM users WHERE id = :user_id", {"user_id": 1})

def test_update_user_status_mocks_external_api(mocker):
    mock_db = mocker.Mock(spec=Database)
    mock_api_post = mocker.patch("requests.post")
    mock_api_post.return_value.raise_for_status = mocker.Mock()

    user_service = UserService(mock_db)
    user_service.update_user_status(1, "active")

    mock_api_post.assert_called_once_with("https://api.example.com/users/1/status", json={"status": "active"})
    mock_db.execute.assert_called_once_with("UPDATE users SET status = :status WHERE id = :user_id", {"user_id": 1, "status": "active"})
応用演習
依存関係にあるメソッド呼び出しのチェーンをモックします（例：mock_db.connection.cursor().execute()）。
モックのスコープをより詳細に制御するために、コンテキストマネージャーまたはデコレーターとしてmock.patchを使用します。
依存関係によって発生した例外が、テスト対象のユニットによってどのように処理されるかをテストします。モックオブジェクトのside_effectを使用して例外をシミュレートします。
ヒント: モックオブジェクトで利用可能なさまざまなメソッド（例：return_value、side_effect、assert_called_with）を探索します。期待するテスト結果: テストは、依存関係の実際の状態や可用性に関係なく成功するはずです。テストは、テスト対象のユニットがモックされたレスポンスに基づいて正しく動作することを実証します。ポイントまとめ
モックは、より焦点を絞ったテストのためにコードのユニットを分離します。
unittest.mockとpytest-mockは、モックオブジェクトを作成および管理するための強力なツールです。
依存関係を適切にモックすることは、信頼性が高く保守可能なユニットテストを作成するために不可欠です。
モックする詳細レベルを検討してください。過剰なモックは避けてください。
pytest-mockは、標準のunittest.mockライブラリと比較して、より合理化されたPythonicなモック方法を提供することがよくあります。
関連英単語と日本語訳英単語 (English)日本語訳 (Japanese)Dependency依存関係Module Separationモジュール分割MockingモックStubbingスタブUnit TestユニットテストTight Coupling密結合MagicMockマジックモックPatchパッチReturn Value戻り値Side Effect副作用AssertionアサーションFixtureフィクスチャExternal API外部APIDatabase I/OデータベースI/OOver-Mocking過剰なモック4. DSL風テスト記述🎯 目的pytestフィクスチャとカスタムマーカーを使用して、より表現力豊かで読みやすいテストシナリオを作成するためのドメイン固有言語（DSL）風のテスト記述方法を学びます。📚 背景理論仕様やユーザーストーリーのように読めるテストを作成することの利点について説明します。pytestフィクスチャを、テスト環境のセットアップやデータの提供に使用する方法を紹介します。再利用可能なテストコンポーネントを作成するためのフィクスチャの使用について説明します。pytestカスタムマーカーを、テストのカテゴリ分けや実行制御に使用する方法を紹介します。特定のテストドメイン向けのDSLを構築するために、フィクスチャとマーカーを組み合わせる方法について説明します。適切に設計されたテストDSLは、テストコードの可読性と保守性を大幅に向上させ、開発者と非開発者の両方がシステムの意図された動作を理解しやすくします。⚙️ ステップ実装リポジトリひな形deep_research_tdd/
├── shopping_cart/
│   ├── __init__.py
│   └── cart.py
└── tests/
    ├── conftest.py  # For fixtures
    └── test_shopping_cart.py
小タスク
shopping_cart/cart.pyに、アイテムの追加、削除、合計金額の計算を行う簡単なShoppingCartクラスを実装します。
空のショッピングカートを作成するpytestフィクスチャを定義します。
いくつかの事前定義されたアイテムを含むショッピングカートを作成する別のフィクスチャを定義します。
これらのフィクスチャをテスト関数で使用して、異なるテストシナリオを設定します。
統合テストをタグ付けするためのカスタムマーカー（例：@pytest.mark.integration）を作成します。
フィクスチャを組み合わせて、より複雑なテストセットアップを作成する方法を探索します。
フィクスチャとマーカーを効果的に使用するようにテストコードをリファクタリングし、よりDSL風のスタイルを目指します。
コードスニペットPython# shopping_cart/cart.py
class ShoppingCart:
    def __init__(self):
        self.items = {}

    def add_item(self, name: str, price: float, quantity: int = 1):
        if name in self.items:
            self.items[name]['quantity'] += quantity
        else:
            self.items[name] = {'price': price, 'quantity': quantity}

    def remove_item(self, name: str, quantity: int = 1):
        if name in self.items:
            if self.items[name]['quantity'] > quantity:
                self.items[name]['quantity'] -= quantity
            else:
                del self.items[name]

    def get_total_price(self) -> float:
        return sum(item['price'] * item['quantity'] for item in self.items.values())

# tests/conftest.py
import pytest
from shopping_cart.cart import ShoppingCart

@pytest.fixture
def empty_cart():
    return ShoppingCart()

@pytest.fixture
def populated_cart():
    cart = ShoppingCart()
    cart.add_item("apple", 1.0, 2)
    cart.add_item("banana", 0.5, 3)
    return cart

# tests/test_shopping_cart.py
import pytest

def test_empty_cart_total_price(empty_cart):
    assert empty_cart.get_total_price() == 0.0

def test_populated_cart_total_price(populated_cart):
    assert populated_cart.get_total_price() == 2 * 1.0 + 3 * 0.5

def test_add_item_to_empty_cart(empty_cart):
    empty_cart.add_item("apple", 1.0)
    assert "apple" in empty_cart.items
    assert empty_cart.items["apple"]["quantity"] == 1

def test_remove_item_from_populated_cart(populated_cart):
    populated_cart.remove_item("banana")
    assert "banana" in populated_cart.items
    assert populated_cart.items["banana"]["quantity"] == 2

@pytest.mark.integration
def test_integration_with_some_external_service(populated_cart):
    # 実際の統合テストのロジックはここに記述
    assert populated_cart.get_total_price() > 0
応用演習
他のフィクスチャに依存するフィクスチャを作成します。
フィクスチャのパラメータ化を使用して、テストセットアップの複数のバリエーションを作成します。
アプリケーションの動作の異なる側面を表す一連のカスタムマーカーを開発します。
ヒント: フィクスチャのライフタイム（関数、クラス、モジュール、セッションなど）を制御するために、scopeパラメータを活用します。期待するテスト結果: フィクスチャとカスタムマーカーの使用により、テストがより読みやすく、理解しやすくなるはずです。テストロジックは、セットアップとティアダウンのコードから明確に分離されるはずです。ポイントまとめ
pytestフィクスチャは、再利用可能なテストのセットアップとデータの提供を可能にします。
カスタムマーカーは、テストの整理と実行の制御に役立ちます。
フィクスチャとマーカーを組み合わせることで、強力なテスト用のDSLを作成できます。
適切に設計されたテストDSLは、テストの可読性と保守性を向上させます。
テストで使用する言語について考えることで、ドメインとアプリケーションの要件をより深く理解することができます。
関連英単語と日本語訳英単語 (English)日本語訳 (Japanese)Domain-Specific Language (DSL)ドメイン固有言語（DSL）FixtureフィクスチャCustom MarkerカスタムマーカーTest ScenarioテストシナリオTest SetupテストセットアップReusable再利用可能Test Environmentテスト環境Categorizeカテゴリ分けTest Executionテスト実行Integration Test統合テストScopeスコープLifetimeライフタイムTeardownティアダウン5. 継承とMixinによるテスト共通化🎯 目的継承とMixinパターンを使用してテストスイート内のコードの重複を減らし、より保守しやすいテスト構造を作成する方法を学びます。📚 背景理論テストコードの重複の問題について説明します。共通のセットアップとヘルパーメソッドを持つ基底テストクラスを作成するために継承を使用する方法について説明します。厳密な継承なしに特定の機能をテストクラスに追加するためにMixinを使用する方法について説明します。さまざまなテストシナリオに対して効果的な基底テストクラスとMixinを設計する方法について説明します。継承とMixinのどちらを選択するかについての考慮事項について説明します。テストコードの重複は、保守の労力を増大させ、不整合のリスクを高める可能性があります。継承とMixinは、共通のテストロジックとセットアップを共有するためのメカニズムを提供し、テストスイートをよりDRY（Don't Repeat Yourself）にします。⚙️ ステップ実装リポジトリひな形deep_research_tdd/
├── api_client/
│   ├── __init__.py
│   └── client.py
└── tests/
    ├── base_test.py
    └── test_api_client.py
小タスク
簡単なAPIクライアントを実装します。
APIクライアントの複数のテストケースで共通に必要なセットアップ手順とヘルパー関数を特定します。
この共通ロジックを含むBaseAPITestクラスを作成します。
BaseAPITestから継承して、異なるAPIエンドポイント用の特定のテストクラスを作成します。
JSONレスポンスに対して特定のasserterヘルパーメソッドを提供するMixinを実装します。
このMixinを関連するテストクラスに適用します。
このコンテキストでの継承とMixinの使用を比較対照します。
コードスニペットPython# api_client/client.py
import requests

class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url

    def get(self, path):
        response = requests.get(f"{self.base_url}/{path}")
        response.raise_for_status()
        return response.json()

    def post(self, path, data):
        response = requests.post(f"{self.base_url}/{path}", json=data)
        response.raise_for_status()
        return response.json()

# tests/base_test.py
import pytest
from api_client.client import APIClient

class BaseAPITest:
    @pytest.fixture
    def api_client(self):
        return APIClient("http://localhost:8080") # テスト用のベースURL

class JSONResponseAssertionsMixin:
    def assert_json_has_keys(self, response, keys):
        assert isinstance(response, dict)
        for key in keys:
            assert key in response

# tests/test_api_client.py
import pytest
from tests.base_test import BaseAPITest, JSONResponseAssertionsMixin

class TestGetUserEndpoint(BaseAPITest, JSONResponseAssertionsMixin):
    def test_get_user_returns_valid_json(self, api_client):
        user = api_client.get("/users/1")
        self.assert_json_has_keys(user, ["id", "username", "email"])
        assert user["id"] == 1

class TestCreateUserEndpoint(BaseAPITest):
    def test_create_user_returns_created_user(self, api_client):
        user_data = {"username": "newuser", "email": "newuser@example.com"}
        created_user = api_client.post("/users", data=user_data)
        assert created_user["username"] == "newuser"
        assert created_user["email"] == "newuser@example.com"
        assert "id" in created_user
応用演習
データベースインタラクションをテストするための基底テストクラスを設計します。
APIテストでの認証処理用のMixinを作成します。
テスト契約を定義するための抽象基底クラスの使用を検討します。
ヒント: 各テストメソッドの前後で実行する必要があるセットアップとティアダウンのロジックには、基底テストクラスのsetUpメソッドとtearDownメソッドの使用を検討してください。期待するテスト結果: テストコードが大幅に削減され、テスト構造がより整理され、理解しやすくなるはずです。共通のテストロジックへの変更は、すべての継承テストクラスまたはMixinを使用するテストクラスに反映されるはずです。ポイントまとめ
継承とMixinは、テストコードの重複を減らすのに役立ちます。
基底テストクラスは、共通のセットアップとヘルパーメソッドを提供します。
Mixinは、特定の機能をテストクラスに追加するための柔軟な方法を提供します。
基底クラスとMixinの慎重な設計は、保守にとって重要です。
Mixinは単一継承よりも柔軟性が高く、テストクラスは複数の機能源から継承できます。
関連英単語と日本語訳英単語 (English)日本語訳 (Japanese)Inheritance継承MixinMixinCode Duplicationコードの重複Base Test Class基底テストクラスHelper MethodヘルパーメソッドTest SuiteテストスイートDRY (Don't Repeat Yourself)DRY（同じことを繰り返さない）Test Contractテスト契約Abstract Base Class抽象基底クラスSetupセットアップTeardownティアダウンAssertion Helperアサーションヘルパー6. 統合テスト＆エンドツーエンドテスト🎯 目的Docker Composeを使用して、Webサーバーとデータベースを含む現実的な環境をセットアップし、HTTPテストを実行することで、統合テストとエンドツーエンドテストを作成する方法を学びます。📚 背景理論ユニットテスト、統合テスト、エンドツーエンドテストの違いについて説明します。さまざまなコンポーネント間のインタラクションを検証するための統合テストとエンドツーエンドテストの重要性について説明します。分離された再現可能なテスト環境を作成するためのDockerとDocker Composeの使用について説明します。PythonでHTTPテストを実行するためのテクニック（例：requestsまたはhttpxの使用）について説明します。統合環境でのテストデータのセットアップとテスト後のクリーンアップの戦略について説明します。統合テストはアプリケーション内の異なるモジュールまたはサービス間のインタラクションを検証し、エンドツーエンドテストはユーザーの視点からアプリケーション全体の流れをテストすることで、実際のユーザーシナリオをシミュレートします。Docker Composeは、複数の依存関係を持つ複雑なテスト環境のセットアップを簡素化します。⚙️ ステップ実装リポジトリひな形deep_research_tdd/
├── web_app/
│   ├── app.py
│   └── requirements.txt
├── database/
│   └── init.sql
├── tests/
│   └── test_integration.py
├── docker-compose.yml
└── Dockerfile
小タスク
データベースと対話する簡単なFlaskまたはFastAPI Webアプリケーションを作成します。
Webアプリケーションとデータベースサービスをセットアップするためのdocker-compose.ymlファイルを定義します。
pytestとrequestsまたはhttpxのようなライブラリを使用して、実行中のWebアプリケーションにHTTPリクエストを送信し、レスポンスを検証する統合テストを記述します。
異なるAPIエンドポイントとデータベースインタラクションのテストを実装します。
各テストの前にテストデータが適切にセットアップされ、テスト後にクリーンアップされることを保証します。
Docker Composeでサービスが起動するのを待つためのさまざまな戦略を検討します。
コードスニペットYAML# docker-compose.yml
version: '3.8'
services:
  web:
    build:./web_app
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/app_db
    depends_on:
      - db
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: app_db
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:

# web_app/Dockerfile
FROM python:3.9-slim-buster
WORKDIR /app
COPY requirements.txt.
RUN pip install -r requirements.txt
COPY..
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

# web_app/app.py
from fastapi import FastAPI
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "postgresql://user:password@db:5432/app_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

Base.metadata.create_all(bind=engine)
app = FastAPI()

@app.get("/items/{item_id}")
def read_item(item_id: int):
    db = SessionLocal()
    item = db.query(Item).filter(Item.id == item_id).first()
    db.close()
    return {"name": item.name} if item else {"error": "Item not found"}

# tests/test_integration.py
import pytest
import requests
import time

BASE_URL = "http://localhost:8000"

def test_read_existing_item():
    # データベースにテストデータを投入する処理は省略
    time.sleep(5) # データベースとWebサーバーが起動するのを待つ
    response = requests.get(f"{BASE_URL}/items/1")
    assert response.status_code == 200
    assert response.json() == {"name": "Test Item"}

def test_read_non_existent_item():
    time.sleep(5) # データベースとWebサーバーが起動するのを待つ
    response = requests.get(f"{BASE_URL}/items/999")
    assert response.status_code == 200
    assert response.json() == {"error": "Item not found"}
応用演習
複数のユーザーインタラクションをカバーするエンドツーエンドテストを実装します。
環境変数を使用して、Docker Composeのテスト環境を構成します。
テストセットアップの一部としてデータベースのマイグレーションを実行するための手法を検討します。
ヒント: docker-compose.ymlファイルのdepends_onを使用して、サービスの起動順序を指定します。期待するテスト結果: 統合テストとエンドツーエンドテストは成功し、Webアプリケーションとデータベースが正しく連携していることを実証します。テストは、外部からのアプリケーションの期待される動作を検証します。ポイントまとめ
統合テストとエンドツーエンドテストは、システムレベルの動作を検証するために不可欠です。
Docker Composeは、複雑なテスト環境のセットアップを簡素化します。
requestsやhttpxのようなHTTPテストライブラリは、Webアプリケーションとの対話に使用されます。
信頼性の高い統合テストには、適切なテストデータ管理が重要です。
Docker Composeを使用すると、テスト環境がさまざまな開発マシンやCI/CDパイプライン全体で一貫して再現可能になります。
関連英単語と日本語訳英単語 (English)日本語訳 (Japanese)Integration Test統合テストEnd-to-End TestエンドツーエンドテストDocker ComposeDocker ComposeWeb ServerWebサーバーDatabaseデータベースHTTP TestHTTPテストTest Environmentテスト環境Reproducible再現可能API EndpointAPIエンドポイントTest DataテストデータClean UpクリーンアップServiceサービスContainerコンテナ7. カバレッジ基準とゲート🎯 目的coverage.pyを使用してコードカバレッジを測定し、GitHub Actionsと統合して、カバレッジが定義された閾値（例：80%）を満たしているかどうかを自動的にチェックする方法を学びます。📚 背景理論コードカバレッジの概念と、さまざまなメトリクス（ステートメントカバレッジ、ブランチカバレッジなど）について説明します。Pythonプロジェクトでコードカバレッジを測定するためのcoverage.pyの使用について説明します。カバレッジレポートを解釈し、カバーされていないコードを特定する方法について説明します。CI/CDパイプラインでカバレッジの閾値を品質ゲートとして設定する方法について説明します。テスト中にシームレスなカバレッジレポートを作成するために、coverage.pyをpytestと統合する方法について説明します。プルリクエストでカバレッジチェックを自動化するためのGitHub Actionsの使用について説明します。コードカバレッジは、テストによってコードベースのどの程度が実行されたかを定量的に測定するものです。カバレッジの閾値を設定し、CI/CDパイプラインでそれを強制することで、一定レベルのテストの徹底性を保証し、回帰のリスクを軽減するのに役立ちます。⚙️ ステップ実装リポジトリひな形deep_research_tdd/
├── your_project/
│   ├──... (あなたのプロジェクトファイル)
│   └── __init__.py
└── tests/
    └──... (あなたのテストファイル)
├──.coveragerc
└──.github/workflows/ci.yml
小タスク
coverage.pyをインストールし、プロジェクト用に構成します（例：特定のディレクトリを除外するために.coveragercファイルを使用）。
coverage runコマンドでテストを実行します。
coverage reportまたはcoverage htmlを使用してカバレッジレポートを生成します。
カバレッジレポートを分析して、カバーされていないコードを特定します。
カバレッジを向上させるために追加のテストを記述します。
テストを実行し、コードカバレッジをチェックするGitHub Actionsワークフロー（ci.yml）を作成します。
カバレッジが指定された閾値（例：80%）を下回った場合にワークフローが失敗するように構成します。
コードスニペットIni, TOML#.coveragerc
[run]
omit =
    tests/*
    */migrations/*

[report]
fail_under = 80
show_missing = true
YAML#.github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up Python 3.9
      uses: actions/setup-python@v3
      with:
        python-version: "3.9"
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install pytest pytest-cov coverage
    - name: Run tests and get coverage
      run: |
        coverage run -m pytest
        coverage report -m
    - name: Check coverage
      run: |
        coverage fail --omit="tests/*"
応用演習
さまざまなカバレッジメトリクス（例：ブランチカバレッジ）を検討します。
カバレッジバッジを使用して、リポジトリにカバレッジのステータスを表示します。
特定のファイルまたはディレクトリのカバレッジが低い場合にカバレッジが失敗するように構成します。
ヒント: coverage reportで--fail-underオプションを使用すると、カバレッジがある割合を下回った場合に自動的に失敗します。期待するテスト結果: GitHub Actionsワークフローはテストを正常に実行し、コードカバレッジを報告する必要があります。カバレッジの閾値が満たされない場合、ワークフローは失敗するはずです。ポイントまとめ
コードカバレッジは、コードがどの程度テストされているかを測定します。
coverage.pyは、Pythonでコードカバレッジを測定するためのツールです。
カバレッジの閾値を設定することで、望ましいレベルのテスト品質を維持できます。
カバレッジチェックをCI/CDパイプラインに統合することで、品質保証が自動化されます。
高いが現実的なコードカバレッジを目指しましょう。100%のカバレッジを目指すと、重要な価値を追加しない些細なテストを作成することにつながる場合があります。コードベースの重要な部分と複雑な部分をカバーすることに焦点を当ててください。
関連英単語と日本語訳英単語 (English)日本語訳 (Japanese)Code CoverageコードカバレッジCoverage Criteriaカバレッジ基準Coverage GateカバレッジゲートStatement CoverageステートメントカバレッジBranch CoverageブランチカバレッジThreshold閾値Quality Gate品質ゲートCI/CD PipelineCI/CDパイプラインGitHub ActionsGitHub ActionsWorkflowワークフローOmit除外Fail Under下回ったら失敗Missing Code未カバーコードCoverage Badgeカバレッジバッジ8. CI/CDパイプライン実装🎯 目的GitHub Actionsを使用して、テストの実行、プロジェクトのビルド、コードカバレッジのチェック、セキュリティスキャンの実行を自動化する完全なCI/CDパイプラインを実装する方法を学びます。📚 背景理論継続的インテグレーション（CI）と継続的デリバリー/デプロイメント（CD）の概念について説明します。ソフトウェア開発プロセスを自動化するためのCI/CDパイプラインを使用する利点について説明します。GitHub Actionsとそのワークフロー構文を紹介します。Pythonプロジェクトの典型的なCI/CDパイプライン（テスト、ビルド、カバレッジ、セキュリティスキャン）の設計について説明します。さまざまなツールやサービスをCI/CDパイプラインに統合する方法について説明します。適切に実装されたCI/CDパイプラインは、テストの実行、アプリケーションのビルド、本番環境へのデプロイなど、ソフトウェア開発に関わる多くの反復的なタスクを自動化します。これにより、フィードバックサイクルが高速化され、コード品質が向上し、リリースがより効率的になります。⚙️ ステップ実装リポジトリひな形deep_research_tdd/
├── your_project/
│   ├──... (あなたのプロジェクトファイル)
│   └── requirements.txt
└── tests/
    └──... (あなたのテストファイル)
├──.github/workflows/ci.yml
小タスク
プッシュイベントとプルリクエストイベントでトリガーされるGitHub Actionsワークフロー（ci.yml）を作成します。
テスト（pytestを使用）、ビルド（必要な場合）、コードカバレッジのチェック（coverage.pyを使用）、基本的なセキュリティスキャン（例：banditまたはsafetyを使用）のためのジョブを定義します。
各ジョブが隔離された環境（例：特定のPythonバージョンを使用）で実行されるように構成します。
成果物（例：カバレッジレポート）が適切に処理されることを保証します。
他のセキュリティスキャンツールやサービスとの統合オプションを検討します。
リンティングとコードフォーマット（例：flake8とblackを使用）のためのステップを追加することを検討します。
コードスニペットYAML#.github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.8", "3.9", "3.10"]

    steps:
    - uses: actions/checkout@v3
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v3
      with:
        python-version: ${{ matrix.python-version }}
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install pytest pytest-cov coverage bandit safety
    - name: Lint with flake8
      run: |
        pip install flake8
        # 必要に応じてflake8の構成を追加
        flake8. --count --select=E9,F63,F7,F82 --show-source --statistics
    - name: Format with black
      run: |
        pip install black
        black --check.
    - name: Run tests and get coverage
      run: |
        coverage run -m pytest
        coverage report -m
    - name: Check coverage
      run: |
        coverage fail --omit="tests/*" --fail-under=80
    - name: Run security scan with bandit
      run: |
        bandit -r./your_project -s B101 # 例：パスワードのハードコーディングをチェック
    - name: Run security check with safety
      run: |
        safety check --full-report
応用演習
Dockerイメージをビルドして公開するためのジョブを追加します。
ステージング環境または本番環境へのデプロイパイプラインを実装します。
環境シークレットを使用して、APIキーなどの機密情報を安全に保存します。
ヒント: 一般的なCI/CDタスクには、GitHub Marketplaceで利用可能なさまざまなアクションを検討してください。期待するテスト結果: CI/CDパイプラインは正常に実行され、定義されたすべてのジョブ（テスト、ビルド、カバレッジ、セキュリティスキャン）を実行し、結果を報告する必要があります。いずれかのチェックが失敗した場合、パイプラインは失敗するはずです。ポイントまとめ
CI/CDパイプラインは、ソフトウェア開発ライフサイクルを自動化します。
GitHub Actionsは、CI/CDワークフローを実装するためのプラットフォームを提供します。
典型的なパイプラインには、テスト、ビルド、カバレッジチェック、セキュリティスキャンが含まれます。
自動化により、コード品質が向上し、リリースサイクルが短縮されます。
CI/CDパイプラインで使用される特定の手順とツールは、プロジェクトの性質とチームの要件によって異なります。パイプラインをアプリケーションの特定のニーズに合わせて調整することが重要です。
関連英単語と日本語訳英単語 (English)日本語訳 (Japanese)CI/CD PipelineCI/CDパイプラインContinuous Integration (CI)継続的インテグレーション（CI）Continuous Delivery/Deployment (CD)継続的デリバリー/デプロイメント（CD）GitHub ActionsGitHub ActionsWorkflowワークフローJobジョブStepステップBuildビルドCode CoverageコードカバレッジSecurity ScanセキュリティスキャンLintingリンティングCode FormattingコードフォーマットEnvironment Secret環境シークレットDeploymentデプロイメント9. リファクタリングパターン集🎯 目的一般的なリファクタリングパターン（Strategy、Factory、Adapter）と、TDDが安全かつ効果的なリファクタリングをどのように促進するかについて学びます。📚 背景理論リファクタリングの定義とその重要性について説明します。TDDがテストのセーフティネットを提供することで、安全なリファクタリングをどのように可能にするかについて説明します。交換可能なアルゴリズムをカプセル化するためのStrategyパターンの紹介。作成する正確なクラスを指定せずにオブジェクトを作成するためのFactoryパターンの紹介。互換性のないインターフェースを持つオブジェクトが連携できるようにするためのAdapterパターンの紹介。これらのリファクタリングパターンをいつ、どのように適用するかの例。リファクタリングは、コードの設計、可読性、保守性を向上させるためのソフトウェア開発プロセスに不可欠な部分です。TDDは、変更後も既存の機能が維持されることを保証することで、リファクタリングをより安全にします。⚙️ ステップ実装リポジトリひな形deep_research_tdd/
├── report_generator/
│   ├── __init__.py
│   ├── generator.py
│   └── formatters.py
└── tests/
    └── test_generator.py
小タスク
リファクタリングの恩恵を受ける可能性のあるコードから始めます（例：ハードコードされたフォーマットロジックを持つレポートジェネレーター）。
既存のコードに対して包括的なユニットテストを記述して、ベースラインを確立します。
Strategyパターンを適用して、フォーマットロジックをプラグイン可能にします。
テストを実行して、リファクタリングによって機能が壊れていないことを確認します。
異なるコード例でFactoryパターンとAdapterパターンに対してプロセスを繰り返します。
テストがどのようにリファクタリングプロセスをガイドし、変更への信頼を提供するかに焦点を当てます。
コードスニペットPython# report_generator/generator.py
class ReportGenerator:
    def generate(self, data, format_type):
        if format_type == "plain":
            return self._generate_plain_report(data)
        elif format_type == "csv":
            return self._generate_csv_report(data)
        elif format_type == "json":
            return self._generate_json_report(data)
        else:
            raise ValueError(f"Unsupported format: {format_type}")

    def _generate_plain_report(self, data):
        return "\n".join([f"{key}: {value}" for key, value in data.items()])

    def _generate_csv_report(self, data):
        keys = ",".join(data.keys())
        values = ",".join(map(str, data.values()))
        return f"{keys}\n{values}"

    def _generate_json_report(self, data):
        import json
        return json.dumps(data)

# report_generator/formatters.py
from abc import ABC, abstractmethod
import json

class ReportFormatter(ABC):
    @abstractmethod
    def format(self, data):
        pass

class PlainTextFormatter(ReportFormatter):
    def format(self, data):
        return "\n".join([f"{key}: {value}" for key, value in data.items()])

class CSVFormatter(ReportFormatter):
    def format(self, data):
        keys = ",".join(data.keys())
        values = ",".join(map(str, data.values()))
        return f"{keys}\n{values}"

class JSONFormatter(ReportFormatter):
    def format(self, data):
        return json.dumps(data)

# report_generator/generator.py (リファクタリング後)
class ReportGenerator:
    def __init__(self, formatter):
        self.formatter = formatter

    def generate(self, data):
        return self.formatter.format(data)

# tests/test_generator.py
import pytest
from report_generator.generator import ReportGenerator
from report_generator.formatters import PlainTextFormatter, CSVFormatter, JSONFormatter

def test_report_generator_plain_text():
    data = {"name": "Product A", "price": 100}
    generator = ReportGenerator(PlainTextFormatter())
    report = generator.generate(data)
    assert "name: Product A" in report
    assert "price: 100" in report

def test_report_generator_csv():
    data = {"name": "Product B", "price": 200}
    generator = ReportGenerator(CSVFormatter())
    report = generator.generate(data)
    assert "name,price" in report
    assert "Product B,200" in report

def test_report_generator_json():
    data = {"name": "Product C", "price": 300}
    generator = ReportGenerator(JSONFormatter())
    report = generator.generate(data)
    assert '{"name": "Product C", "price": 300}' == report
応用演習
既存のコードベースでリファクタリングの機会を特定します。
他の一般的なリファクタリングパターン（例：Extract Method、Move Method）を適用します。
テストなしでコードをリファクタリングしてからテストを追加し、信頼性と安全性の違いを確認する練習をします。
ヒント: 重複したコード、長いメソッド、または不適切な命名を探します。期待するテスト結果: 各リファクタリングステップの後もテストが成功し続け、コードの動作が維持されながら内部構造が改善されたことを実証します。ポイントまとめ
リファクタリングは、コードの品質と保守性を向上させます。
TDDは、テストのセーフティネットを提供することで、リファクタリングをより安全にします。
Strategy、Factory、Adapterは、一般的で有用なリファクタリングパターンです。
段階的にリファクタリングを行い、頻繁にテストを実行します。
一般的なリファクタリングパターンを理解することで、コード設計を改善するための語彙と実績のあるテクニックのセットが提供されます。これらのパターンをいつ、どのように適用するかを認識することは、経験豊富な開発者にとって重要なスキルです。
関連英単語と日本語訳英単語 (English)日本語訳 (Japanese)RefactoringリファクタリングRefactoring PatternリファクタリングパターンStrategy PatternStrategyパターンFactory PatternFactoryパターンAdapter PatternAdapterパターンCode Qualityコード品質Maintainability保守性Safety NetセーフティネットAlgorithmアルゴリズムEncapsulateカプセル化InterfaceインターフェースImplementation実装Extract Methodメソッドの抽出Move Methodメソッドの移動結論本ドキュメントでは、中級レベルのPythonエンジニアを対象に、テスト駆動開発（TDD）の中級から応用までのパターンを、手を動かしながら習得するためのハンズオン形式の解説を行いました。非同期処理のテストから始まり、パラメータ化テスト、依存関係の管理、DSL風のテスト記述、テストコードの共通化、統合テスト、カバレッジ基準、CI/CDパイプラインの実装、そしてリファクタリングパターンまで、実践的な内容を幅広くカバーしました。各章で紹介したステップ実装とコードスニペットは、読者が実際に手を動かしながらTDDの概念を理解し、実践的なスキルを習得することを支援します。応用演習を通じて、さらに高度な課題に取り組むことで、実務プロジェクトで即戦力となる設計・実装力を身につけることができるでしょう。TDDは、単にテストコードを書くという行為に留まらず、より良い設計、より保守性の高いコード、そしてより高い品質のソフトウェアを生み出すための開発プロセスです。本ドキュメントが、読者の皆様のTDDスキル向上の一助となれば幸いです。
