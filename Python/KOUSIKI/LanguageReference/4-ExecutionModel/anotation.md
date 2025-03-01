## **🔍 アノテーションスコープとは？**

Python の **アノテーションスコープ（annotation scope）** とは、型ヒント（アノテーション）を評価するための特別なスコープです。通常の関数スコープに似ていますが、いくつかの違いがあります。

---

## **📌 アノテーションスコープの特徴をコードで説明**

以下の 3 つの特徴について、コードを使って解説します。

1. **外側のクラスの名前空間にアクセスできる**
2. **アノテーション内では `yield`, `await`, `:=`（代入式）が使えない**
3. **アノテーションスコープ内の変数は `nonlocal` で再束縛できない**

---

### **✅ 1. 外側のクラスの名前空間にアクセスできる**

通常のクラスメソッドでは、外側のクラスの変数にアクセスできませんが、アノテーションスコープでは可能です。

```python
class Outer:
    class_var = "クラスの変数"

    class Inner:
        x: Outer.class_var  # クラススコープの変数にアクセス可能

print(Outer.Inner.__annotations__)
# {'x': 'クラスの変数'}
```

🔹 **ポイント**

- `x: Outer.class_var` という型アノテーションの中で、`Outer.class_var` にアクセスできる。
- 通常の関数スコープではクラスの変数に直接アクセスできない。

---

### **✅ 2. アノテーション内では `yield`, `await`, `:=`（代入式）が使えない**

アノテーション内では、次のような **実行時の処理を伴う式（`yield`, `await`, `:=`）は使えない**。

#### **❌ `yield` を使うとエラー**

```python
def func() -> (yield 1):  # エラー: アノテーション内では yield は使えない
    pass
```

```
SyntaxError: 'yield' not allowed in type expressions
```

#### **❌ `await` を使うとエラー**

```python
async def func() -> (await some_coroutine()):  # エラー
    pass
```

```
SyntaxError: 'await' not allowed in type expressions
```

#### **❌ 代入式 `:=`（ウォルラス演算子）を使うとエラー**

```python
def func() -> (x := 10):  # エラー
    pass
```

```
SyntaxError: cannot use assignment expressions in type expressions
```

🔹 **ポイント**

- `yield`, `await`, `:=` は実行時の処理を行うため、アノテーション内では **構文エラー** になる。
- **アノテーションは「型の情報」なので、実行時の処理を含めることはできない**。

---

### **✅ 3. アノテーションスコープで定義した変数は `nonlocal` で再束縛できない**

アノテーションスコープで定義された変数は、通常の関数スコープとは異なり、`nonlocal` で再束縛できない。

```python
def outer():
    a = 10

    def inner() -> int:
        nonlocal a  # エラー: アノテーションスコープでは nonlocal は使えない
        return a
```

```
SyntaxError: no binding for nonlocal 'a' found
```

🔹 **ポイント**

- 通常のスコープでは `nonlocal` を使って外側の変数を変更できる。
- しかし、**アノテーションスコープでは `nonlocal` を使って変数を再束縛できない**。

---

## **📌 まとめ**

| 特徴                                                     | 例                                            |
| -------------------------------------------------------- | --------------------------------------------- |
| **外側のクラスの名前空間にアクセスできる**               | `class_var` を型アノテーションで参照できる    |
| **`yield`, `await`, `:=` を使えない**                    | `func() -> (await some_coroutine())` はエラー |
| **アノテーション内の変数は `nonlocal` で再束縛できない** | `nonlocal a` はエラー                         |

💡 **アノテーションスコープは「型ヒントの評価」のための特別なスコープだから、実行時の処理を含められないのがポイント！** 🚀
