## **🔍 `yield` の使い方**

Python の `yield` は **「関数の途中で値を返し、次に呼び出されたときにその続きから実行を再開する」** ためのキーワードです。  
通常の `return` とは違い、`yield` を使うと **ジェネレーター（generator）** を作成できます。

---

## **✅ `yield` の基本的な使い方**

まずは `yield` を使った **簡単なカウンター** を例に説明します。

```python
def counter():
    i = 1
    while i <= 3:
        yield i  # 値を返すが、関数の状態は保持される
        i += 1

gen = counter()  # ジェネレーターオブジェクトを作成

print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3
# print(next(gen))  # StopIteration 発生
```

### **📌 `yield` の動作**

1. `next(gen)` を呼ぶと `yield i` の行まで実行され、**値を返して一時停止**。
2. 次の `next(gen)` を呼ぶと、一時停止した位置から再開し、**次の `yield` まで実行**。
3. すべての `yield` を処理したら、`StopIteration` 例外が発生して終了。

---

## **✅ `for` ループで `yield` を使う**

通常、`next()` ではなく **`for` ループ** で使うのが一般的。

```python
def counter():
    for i in range(1, 4):
        yield i

for num in counter():
    print(num)
```

🔹 **`for` ループは `next()` を内部的に呼び出すので、`StopIteration` を自動で処理** してくれる。

---

## **✅ `yield` を使った無限ループ**

`yield` を使えば、無限に続くジェネレーターも作れる。

```python
def infinite_counter():
    i = 1
    while True:
        yield i
        i += 1

gen = infinite_counter()
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3
# 永遠に続く
```

🔹 `while True` で **無限ループするジェネレーター** なので、`next(gen)` を呼び続ける限り `i` が増え続ける。

---

## **✅ `yield` と `send()` を組み合わせて値を受け取る**

通常の `yield` は値を返すだけだが、`send()` を使うと **外部から値を送れる**。

```python
def generator():
    value = 0
    while True:
        value = yield value  # 外部からの値を受け取る
        if value is None:
            value = 0  # 初回は None なので 0 に戻す

gen = generator()
print(next(gen))  # 0
print(gen.send(10))  # 10 を送って、次の yield で返す
print(gen.send(20))  # 20
```

🔹 **`gen.send(10)` で `yield` の位置に `10` を送る → `value = 10` に代入される。**

---

## **✅ `yield from` を使ってサブジェネレーターを呼び出す**

複数の `yield` を **一括で処理したいとき** は `yield from` を使う。

```python
def sub_generator():
    yield 1
    yield 2
    yield 3

def main_generator():
    yield from sub_generator()  # ここで sub_generator の値をすべて処理

for num in main_generator():
    print(num)
```

🔹 **通常の `yield` なら `for` ループが必要だが、`yield from` を使うと一発で処理できる！**

---

## **📌 まとめ**

| `yield` の使い方        | 説明                                   |
| ----------------------- | -------------------------------------- |
| **基本的な `yield`**    | `yield` で値を返し、関数の状態を保持   |
| **`for` ループで使用**  | `next()` なしでスムーズに処理          |
| **無限ループ**          | `while True` で `next()` し続けられる  |
| **`send()` で値を送る** | `yield` へ外部から値を渡す             |
| **`yield from`**        | **サブジェネレーターを簡単に呼び出す** |

💡 **`yield` は「処理を一時停止＆再開」できる強力な仕組み！** 🚀
