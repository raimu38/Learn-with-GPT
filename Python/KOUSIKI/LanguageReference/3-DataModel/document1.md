以下は、英語版の「3. Data model」セクションをできるだけ漏れなく、かつ重要な点を強調しながら日本語に翻訳・解説したものです。各項目のポイントを理解しやすいよう、具体例やコード例も交えて説明します。

---

## 3. データモデル

### 3.1. オブジェクト、値、および型

**概要:**  
Python におけるすべてのデータは「オブジェクト」として表現され、オブジェクト同士の関係や参照によってプログラム内の情報が構成されます。これは、フォン・ノイマンの「プログラム記憶方式コンピュータ」のモデルに準じ、コードそのものもオブジェクトとして扱われるという考え方に基づいています。

**重要な 3 要素:**

- **同一性 (Identity):**  
  オブジェクトが生成された後、その同一性は変わりません。CPython では、`id(x)` はオブジェクトがメモリ上に存在するアドレスを返すため、同一性の比較は `is` 演算子を用いて行います。
  > **例:**
  >
  > ```python
  > a = [1, 2, 3]
  > b = a
  > print(a is b)  # True
  > ```
- **型 (Type):**  
  オブジェクトの型は、そのオブジェクトがどのような操作をサポートするかを決定し、取りうる値の範囲も定義します。`type()` 関数で取得でき、型自体もオブジェクトであり、生成後は変更されません。
  > **例:**
  >
  > ```python
  > a = 42
  > print(type(a))  # <class 'int'>
  > ```
- **値 (Value):**  
  オブジェクトが持つ実際のデータです。mutable（変更可能）なオブジェクトは値が変化し、immutable（不変）なオブジェクトは生成後その値が変わりません。
  > **例:**
  >
  > - 文字列やタプルは immutable
  > - リストや辞書は mutable

**注意:**  
たとえ immutable なコンテナ（例えばタプル）が mutable なオブジェクトを参照していた場合、参照先の mutable オブジェクトが変われば、見かけ上コンテナの「値」が変化します。しかし、コンテナ自体が保持する参照の集合（どのオブジェクトを含むか）は変わりません。

---

### 3.2. 標準型の階層

Python に最初から組み込まれている型（クラス）の一覧と、拡張モジュールで定義される追加の型について説明します。ここでは、各型の特徴と特別な属性についても言及されています。

#### 3.2.1. None

- **概要:**  
  唯一の値を持つ型で、組み込み名 `None` でアクセスされます。
- **用途:**  
  関数が明示的に値を返さないときの返り値や、値が存在しないことを示す場合に使用します。
- **真理値:**  
  `None` の真理値は `False`。

#### 3.2.2. NotImplemented

- **概要:**  
  数値演算やリッチ比較メソッドで、操作が実装されていない場合に返される特別な値です。
- **注意:**  
  ブール値の文脈では評価しないように設計されています。Python 3.9 以降、ブール値として評価すると DeprecationWarning、将来は TypeError になる予定です。

#### 3.2.3. Ellipsis

- **概要:**  
  リテラル `...` あるいは組み込み名 `Ellipsis` でアクセスされる唯一の値を持つ型です。
- **真理値:**  
  `True` として評価されます。
- **用途:**  
  スライスの省略記法や、未実装部分のプレースホルダーとして使われます。

#### 3.2.4. 数値型 (numbers.Number)

- **概要:**  
  数値リテラルや算術演算の結果として生成されるオブジェクト群です。
- **不変性:**  
  数値オブジェクトは immutable です。
- **文字列表現の特徴:**
  - 有効な Python の数値リテラルとして再現可能な文字列であること
  - 基本的に 10 進数表現（可能な場合）
  - 余分な先行ゼロや末尾ゼロは表示されず、負の場合のみ符号が表示される

**Python は以下の数値型を区別します:**

- **3.2.4.1. numbers.Integral (整数型):**
  - 例: `int`、`bool`（`bool` は `int` のサブクラスであり、`False` は 0、`True` は 1 として振る舞う）
  - 数値は無制限（利用可能なメモリが許す限り）、2 の補数表現（疑似的な無限長）で表現されます。
- **3.2.4.2. numbers.Real (実数型):**
  - 例: `float`
  - マシンレベルの倍精度浮動小数点数で表現され、単精度はサポートされません。
- **3.2.4.3. numbers.Complex (複素数型):**
  - 例: `complex`
  - 実数部と虚数部がそれぞれ倍精度浮動小数点数として保持され、`z.real` と `z.imag` で取得可能です。

#### 3.2.5. シーケンス型

- **概要:**  
  0 以上の整数でインデックス付けされた有限の順序集合を表現します。
- **基本操作:**
  - `len()` で要素数を取得
  - インデックス表記 `a[i]` で要素を取得
  - スライス `a[i:j]` で部分列を取得（スライスも同じ型のシーケンスとして返される）
  - 一部のシーケンスは負のインデックスをサポート（例: `a[-2]` は末尾から 2 番目）
- **分類:**
  - **Immutable シーケンス:** 例）文字列（`str`）、タプル（`tuple`）、バイト列（`bytes`）
  - **Mutable シーケンス:** 例）リスト（`list`）、バイト配列（`bytearray`）

**【実際にコードを書いてみましょう】**

```python
# immutable シーケンスの例
s = "こんにちは"
t = (1, 2, 3)
b = b"abc"

# mutable シーケンスの例
l = [1, 2, 3]
ba = bytearray(b"xyz")

# スライス例
print(s[1:4])   # "んにち"
print(l[0:2])   # [1, 2]
```

#### 3.2.6. 集合型

- **概要:**  
  ユニークな不変オブジェクトの順序のない集合。
- **用途:**  
  高速なメンバーシップテスト、重複排除、数学的演算（和・積・差・対称差）
- **組み込み:**
  - **set:** 変更可能な集合
  - **frozenset:** 変更不可能でハッシュ可能な集合

#### 3.2.7. マッピング型

- **概要:**  
  任意のキーによってインデックスされる有限のオブジェクト集合。
- **代表例:**
  - **辞書 (dict):** キーと値のペアを保持し、キーはハッシュ可能かつ不変なオブジェクトでなければならない。
  - 辞書は挿入順序を保持する（Python 3.7 以降の仕様）。

**【実際にコードを書いてみましょう】**

```python
# 辞書の例
d = {"apple": 1, "banana": 2}
print(d["apple"])  # 1

# 辞書の挿入順序
d["cherry"] = 3
for key in d:
    print(key)  # apple, banana, cherry の順で出力
```

#### 3.2.8. 呼び出し可能型

- **概要:**  
  関数呼び出しが可能なオブジェクト（つまり **call**() メソッドを実装している）です。
- **分類:**
  - ユーザ定義関数
  - 組み込み関数
  - 組み込みメソッド
  - クラス（呼び出すと新しいインスタンスを生成）
  - クラスのインスタンス（**call**() を定義することで関数のように振る舞う）

**【実際にコードを書いてみましょう】**

```python
def myfunc(x):
    return x * 2

print(myfunc(5))  # 10

# __call__() を実装した例
class Multiplier:
    def __init__(self, factor):
        self.factor = factor
    def __call__(self, x):
        return self.factor * x

times3 = Multiplier(3)
print(times3(4))  # 12
```

#### 3.2.9. モジュール

- **概要:**  
  Python コードの基本的な組織単位。
- **詳細:**  
  モジュールは名前空間を持つ辞書として実装され、属性アクセスはその辞書の参照に変換されます。  
  また、import システムによって作成される際、**spec**、**package**、**loader** などの属性が設定されます。
- **注意:**  
  **dict** はモジュール内部からグローバル変数として直接アクセスできないため、モジュール属性としてアクセスします。

---

### 3.2.10. カスタムクラス

**概要:**  
クラスは、ユーザ定義の型を作るためのものです。クラスには名前空間があり、属性アクセスはクラスの **dict** を参照し、見つからなければ継承元（基底クラス）を順に検索します。  
また、クラスは特殊な属性やメソッド（例えば **new**, **init**, **repr** など）を実装することで、オブジェクトの生成や振る舞いをカスタマイズできます。

**【実際にコードを書いてみましょう】**

```python
class MyClass:
    """これはサンプルのカスタムクラスです。"""
    def __init__(self, value):
        self.value = value

    def __repr__(self):
        return f"MyClass(value={self.value})"

# インスタンス生成と表示
obj = MyClass(10)
print(obj)  # MyClass(value=10)
```

#### 特別な属性

- ****name****, ****qualname****: クラス名や修飾名
- ****module****: クラスが定義されたモジュール名
- ****bases****: 基底クラスのタプル
- ****dict****: クラスの名前空間の読み取り専用ビュー

#### 特別なメソッド

- ****new**():** インスタンス生成の際に呼ばれる静的メソッド
- ****init**():** 生成後の初期化メソッド
- ****del**():** オブジェクト破棄時に呼ばれる（注意：ガベージコレクションのタイミングは保証されません）

---

### 3.2.11. クラスのインスタンス

**概要:**  
クラスのインスタンスは、クラスを呼び出すことで生成され、インスタンス固有の属性はインスタンス辞書に格納されます。  
属性アクセスは、まずインスタンス辞書から検索し、なければクラスの属性から探します。  
また、クラス属性が関数の場合、呼び出し時に「バインド」され、最初の引数にインスタンスが渡されます。

**【実際にコードを書いてみましょう】**

```python
class Person:
    species = "Homo sapiens"  # クラス属性

    def __init__(self, name):
        self.name = name  # インスタンス属性

    def greet(self):
        return f"Hello, my name is {self.name}."

p = Person("Alice")
print(p.greet())  # Hello, my name is Alice.
print(Person.species)  # Homo sapiens
```

---

### 3.2.12. I/O オブジェクト (ファイルオブジェクト)

**概要:**  
ファイルオブジェクトは、open() などの組み込み関数や os モジュールの関数で作成される、開かれたファイルを表すオブジェクトです。  
また、sys.stdin、sys.stdout、sys.stderr はそれぞれ標準入力、標準出力、標準エラーに対応しています。  
これらはテキストモードで開かれ、 io.TextIOBase で定義されるインターフェースに従います。

**【実際にコードを書いてみましょう】**

```python
with open("example.txt", "w", encoding="utf-8") as f:
    f.write("Hello, world!")
```

→ with 文を使うと、ファイルは自動的に閉じられ、リソースが正しく解放されます。

---

### 3.2.13. 内部型

Python インタプリタ内部で使用される型のうち、ユーザにも公開されているものについて説明します。

#### 3.2.13.1. コードオブジェクト

**概要:**  
コードオブジェクトは、バイトコンパイルされた Python コード（＝バイトコード）を表します。  
関数オブジェクトとの違いは、関数オブジェクトはグローバル変数への参照やデフォルト引数を保持しているのに対し、コードオブジェクトはそのようなコンテキストを持たず、純粋に実行可能なバイトコードのみを保持します。  
コードオブジェクトは immutable です。

**重要な属性:**

- **co_name:** 関数名
- **co_code:** バイトコードのシーケンス
- **co_consts:** 使用されるリテラルのタプル
- **co_varnames:** ローカル変数の名前タプル
- **co_filename:** コンパイル元ファイル名
- **co_firstlineno:** 最初の行番号

**【実際にコードを書いてみましょう】**

```python
def sample(x, y):
    return x + y

code_obj = sample.__code__
print(code_obj.co_name)         # "sample"
print(code_obj.co_argcount)     # 2
print(code_obj.co_varnames)     # ('x', 'y')
```

#### 3.2.13.2. フレームオブジェクトとトレースバックオブジェクト

**概要:**  
フレームオブジェクトは、実行中の関数のコンテキストを表し、トレースバックオブジェクトは例外発生時のスタックトレース情報を提供します。  
デバッグや例外処理、トレース機能に利用されます。

**【実際にコードを書いてみましょう】**  
次のように例外を発生させ、`sys.exc_info()` でトレースバックオブジェクトにアクセスできます。

```python
import sys

def f():
    raise ValueError("an error occurred")

try:
    f()
except Exception as e:
    exc_type, exc_value, tb = sys.exc_info()
    print("Exception occurred:", exc_value)
    # tb はトレースバックオブジェクト
```

---

### 3.3. 特殊メソッド名

**概要:**  
特殊メソッド名（**xxx** で囲まれる名前）は、Python の演算子オーバーロードや、組み込み関数（repr(), str(), len() など）の呼び出し時に自動的に利用される仕組みです。  
たとえば、`x[i]` は `x.__getitem__(i)`、`x + y` は `x.__add__(y)` として内部で処理されます。  
特殊メソッドはクラスの **dict** に定義される必要があり、インスタンスの **dict** に追加しても無視される場合があります。

**ポイント:**

- ****repr**()** は公式な文字列表現、主にデバッグ用。
- ****str**()** はユーザー向けの読みやすい表現。
- ****hash**()** はハッシュ値を返し、**eq**() と連動して動作する必要があります。
- **リッチ比較メソッド**（**lt**, **eq** など）は、等しさの判断や順序の比較を行います。

**【実際にコードを書いてみましょう】**

```python
class MyNumber:
    def __init__(self, n):
        self.n = n
    def __add__(self, other):
        if isinstance(other, MyNumber):
            return MyNumber(self.n + other.n)
        return NotImplemented
    def __repr__(self):
        return f"MyNumber({self.n})"

a = MyNumber(5)
b = MyNumber(10)
print(a + b)  # MyNumber(15)
```

---

### 3.4. コルーチンと非同期関連

#### 3.4.1. Awaitable オブジェクト

**概要:**  
awaitable オブジェクトは、`await` 式で使えるオブジェクトで、通常は `__await__()` メソッドを実装しています。  
`async def` で定義された関数は、呼び出すとコルーチンオブジェクトを返し、これは awaitable です。

**【実際にコードを書いてみましょう】**

```python
import asyncio

async def async_func():
    return "Hello, async!"

# コルーチンオブジェクトを取得
coro = async_func()

# イベントループで実行して結果を得る
result = asyncio.run(coro)
print(result)  # "Hello, async!"
```

#### 3.4.2. 非同期イテレータ

**概要:**  
非同期イテレータは、`async for` で使われるオブジェクトで、`__aiter__()` と `__anext__()` を実装します。  
`__anext__()` は awaitable を返し、値がなくなったら `StopAsyncIteration` を送出します。

**【実際にコードを書いてみましょう】**

```python
class AsyncCounter:
    def __init__(self, start, end):
        self.current = start
        self.end = end
    def __aiter__(self):
        return self
    async def __anext__(self):
        if self.current >= self.end:
            raise StopAsyncIteration
        self.current += 1
        return self.current - 1

import asyncio

async def main():
    async for i in AsyncCounter(0, 5):
        print(i)

asyncio.run(main())
```

#### 3.4.3. 非同期コンテキストマネージャ

**概要:**  
非同期コンテキストマネージャは、`async with` 文で使われ、`__aenter__()` と `__aexit__()` を実装します。これらは awaitable を返し、非同期処理中のリソース管理を行います。

**【実際にコードを書いてみましょう】**

```python
class AsyncCM:
    async def __aenter__(self):
        print("Entering async context")
        return self
    async def __aexit__(self, exc_type, exc, tb):
        print("Exiting async context")
        return False  # 例外は伝播させる

import asyncio

async def main():
    async with AsyncCM():
        print("Inside async with block")

asyncio.run(main())
```

---

### 3.3.5. ジェネリック型のエミュレーションと **class_getitem**

**概要:**

- ****class_getitem**():**  
  クラスに対してサブスクリプション（例: `list[int]`）を行うときに呼ばれ、型ヒントやジェネリック型のパラメータ化に使われます。  
  このメソッドは GenericAlias オブジェクトを返すことが一般的です。

**【実際にコードを書いてみましょう】**  
（Python 3.9 以降では標準型に組み込まれているため、実際に以下のように使えます。）

```python
print(list[int])   # <class 'types.GenericAlias'>
print(dict[str, float])
```

**ポイント:**

- 通常の **getitem**() はインスタンスのサブスクリプション用。
- クラスに対してのサブスクリプションの場合、**class_getitem**() が呼ばれます。

---

### 3.3.6. 特殊メソッドの暗黙の検索

**概要:**  
特殊メソッド（例えば **len**(), **hash**() など）は、通常の属性検索とは異なり、インスタンスの **dict** をバイパスして、クラス（型）の定義から直接取得されます。  
これにより、クラスやメタクラスに定義された基本的な振る舞いが確実に使われ、"metaclass confusion" を回避できます。

**【実際にコードを書いてみましょう】**

```python
class C:
    def __len__(self):
        return 5

c = C()
# __len__ をインスタンス属性として設定しても無視される
c.__len__ = lambda: 100
print(len(c))  # 結果は 5、クラス定義の __len__() が使われる
```

---

### 3.3.7. 数値型のエミュレーション

**概要:**  
数値型をエミュレートするためには、**add**(), **sub**() などの特殊メソッドを定義します。  
これらは演算子（+、-、\*、/ など）の動作を実装するもので、もし対応する演算がサポートされていなければ NotImplemented を返す必要があります。

**【実際にコードを書いてみましょう】**

```python
class MyInt:
    def __init__(self, value):
        self.value = value
    def __add__(self, other):
        if isinstance(other, MyInt):
            return MyInt(self.value + other.value)
        return NotImplemented
    def __repr__(self):
        return f"MyInt({self.value})"

a = MyInt(10)
b = MyInt(20)
print(a + b)  # MyInt(30)
```

---

### 3.3.8. その他の演算子特殊メソッド

**概要:**

- **単項演算子:** **neg**(), **pos**(), **abs**(), **invert**()  
  これらは -x, +x, abs(x), ~x の動作を実装します。
- **型変換系:** **int**(), **float**(), **complex**()、および **index**()  
  **index**() は、整数オブジェクトに変換する際に呼ばれ、例えば slicing や bin(), hex(), oct() で使われます。

**【実際にコードを書いてみましょう】**

```python
class MyNumber:
    def __init__(self, n):
        self.n = n
    def __neg__(self):
        return MyNumber(-self.n)
    def __int__(self):
        return int(self.n)
    def __index__(self):
        return int(self.n)

x = MyNumber(10)
print(-x)         # MyNumber(-10)（__repr__() が適切に定義されていれば）
print(int(x))     # 10
print(bin(x))     # bin() は __index__() を呼ぶ
```

---

### 3.3.9. With 文（コンテキストマネージャ）

**概要:**  
コンテキストマネージャは、with 文によって実行される特別なオブジェクトで、**enter**() と **exit**() メソッドを実装します。  
これにより、リソースの確実な解放や状態の復元が保証され、例外発生時にも安全に後処理が行われます。

**【実際にコードを書いてみましょう】**

```python
class FileOpener:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
    def __enter__(self):
        self.file = open(self.filename, self.mode, encoding="utf-8")
        return self.file
    def __exit__(self, exc_type, exc_value, traceback):
        self.file.close()
        return False  # 例外は伝播

with FileOpener("test.txt", "w") as f:
    f.write("Hello, World!")
```

---

### 3.3.10. クラスパターンマッチと **match_args**

**概要:**  
Python 3.10 で導入された構造的パターンマッチにおいて、クラスパターンで位置引数を使うには、クラスに **match_args** 属性を定義する必要があります。  
この属性にタプルで名前を指定すると、位置引数がキーワード引数に変換されます。

**【実際にコードを書いてみましょう】**

```python
class Point:
    __match_args__ = ("x", "y")
    def __init__(self, x, y):
        self.x = x
        self.y = y

pt = Point(10, 20)
# マッチパターン内で位置引数がキーワード引数に変換される
match pt:
    case Point(a, b):
        print(f"x={a}, y={b}")
```

---

### 3.3.11. バッファプロトコル

**概要:**  
バッファプロトコルは、Python オブジェクトが低レベルのメモリ配列への効率的なアクセスを提供する仕組みです。  
通常、bytes や memoryview などで実装され、**buffer**() と **release_buffer**() メソッドが定義されます。  
これにより、大容量データや共有メモリ操作が効率的に行われます。

**【実際にコードを書いてみましょう】**  
通常、memoryview オブジェクトを使った例：

```python
data = b"Hello, buffer!"
mv = memoryview(data)
print(mv[0])  # 72 (ASCII 'H')
```

---

### 3.3.12. 特殊メソッド検索

**概要:**  
特殊メソッドは、暗黙的に呼び出される際、インスタンスの **dict** を無視し、クラス（型）の **dict** から検索されます。  
これにより、インスタンス属性が上書きされても、基本的な動作が保証される仕組みになっています。  
たとえば、**len**() をインスタンス属性として定義しても、len() 関数はクラスに定義された **len**() を使用します。

**【実際にコードを書いてみましょう】**

```python
class C:
    def __len__(self):
        return 5

c = C()
c.__len__ = lambda: 100  # これは無視される
print(len(c))  # 5 が出力される
```

---

### 3.4. コルーチンと非同期関連

#### 3.4.1. Awaitable オブジェクトと **await**()

**概要:**  
awaitable オブジェクトは、await 式で使用可能なオブジェクトで、通常 **await**() メソッドを実装しており、イテレータを返します。  
これにより、async/await による非同期処理が可能になります。

**【実際にコードを書いてみましょう】**

```python
import asyncio

async def async_task():
    await asyncio.sleep(1)
    return "Done"

# コルーチンオブジェクトは awaitable
coro = async_task()
print(asyncio.run(coro))  # "Done" が出力される
```

#### 3.4.2. コルーチンオブジェクトの操作

**概要:**  
コルーチンオブジェクトは、**await**() によって制御可能なイテレータを返し、send(), throw(), close() などのメソッドで再開、例外送出、終了が制御されます。  
注意点として、同じコルーチンを複数回 await すると RuntimeError となります。

#### 3.4.3. 非同期イテレータ

**概要:**  
非同期イテレータは、`async for` 文で使用され、**aiter**() と **anext**() を実装します。  
**anext**() は awaitable を返し、終了時には StopAsyncIteration を送出します。

**【実際にコードを書いてみましょう】**  
（先ほどの AsyncCounter の例参照）

#### 3.4.4. 非同期コンテキストマネージャ

**概要:**  
非同期コンテキストマネージャは、async with 文で使用され、**aenter**() と **aexit**() が awaitable を返すことで、非同期処理中のリソース管理を実現します。

**【実際にコードを書いてみましょう】**  
（先ほどの AsyncCM の例参照）

---

## 補足・設計思想のポイント

- **オブジェクトの不変性と可変性:**  
  すべてのオブジェクトは同一性・型・値の 3 要素を持ち、immutable と mutable の区別は多くの挙動（ハッシュ可能性、比較、再利用）に影響します。

- **特殊メソッドの実装:**  
  演算子オーバーロードや組み込み関数の動作は、特殊メソッドによって実現されます。実装する際は、NotImplemented の返却や反射メソッドの順序など、詳細なルールを守る必要があります。

- **メタクラスとクラス生成:**  
  カスタムメタクラスや **init_subclass**()、**prepare**() などの仕組みを利用することで、クラス生成の段階で柔軟なカスタマイズが可能となります。これにより、フレームワークやライブラリでの一貫性ある振る舞いを実現できます。

- **非同期処理:**  
  コルーチン、awaitable、非同期イテレータ、非同期コンテキストマネージャなどの仕組みにより、I/O 処理などの待機時間を有効に活用できるプログラム設計が可能になります。

---

以上が、Python のデータモデルに関する主要な概念を日本語でまとめたものです。各セクションの重要なポイントを強調し、実際にコードを書いて確認できる例も含めています。公式ドキュメントは詳細で情報量が豊富ですが、まずはこれらの基本概念を実際に手を動かしながら理解することが、より深い学習につながります。
