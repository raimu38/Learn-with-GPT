以下に、前回挙げた 50 個の組み込み関数・メソッドそれぞれの使い方を、実際にコピペして試せるコード例と簡単な説明付きで示します。これらを真似して書いて実行することで、使い方を体感してください。

---

## 【基本の 30 項目】

1. **print()**  
   出力する基本関数

   ```python
   print("Hello, World!")
   ```

2. **len()**  
   シーケンス（リスト、文字列など）の長さを返す

   ```python
   s = "Hello"
   print(len(s))  # 結果: 5
   ```

3. **type()**  
   オブジェクトの型を返す

   ```python
   x = 42
   print(type(x))  # 結果: <class 'int'>
   ```

4. **range()**  
   数値のシーケンス（イテレータ）を生成する

   ```python
   for i in range(5):
       print(i)  # 0, 1, 2, 3, 4 が順に出力される
   ```

5. **enumerate()**  
   イテレータから (インデックス, 要素) のタプルを生成する

   ```python
   fruits = ["apple", "banana", "cherry"]
   for index, fruit in enumerate(fruits):
       print(index, fruit)
   ```

6. **zip()**  
   複数のシーケンスを並行して反復する

   ```python
   names = ["Alice", "Bob", "Charlie"]
   ages = [25, 30, 35]
   for name, age in zip(names, ages):
       print(f"{name} is {age} years old")
   ```

7. **map()**  
   関数をシーケンスの各要素に適用する

   ```python
   numbers = [1, 2, 3, 4]
   squares = list(map(lambda x: x**2, numbers))
   print(squares)  # 結果: [1, 4, 9, 16]
   ```

8. **filter()**  
   条件に合致する要素だけを抽出する

   ```python
   numbers = [1, 2, 3, 4, 5, 6]
   evens = list(filter(lambda x: x % 2 == 0, numbers))
   print(evens)  # 結果: [2, 4, 6]
   ```

9. **sorted()**  
   シーケンスのソート済みコピーを返す

   ```python
   unsorted = [3, 1, 4, 1, 5, 9]
   sorted_list = sorted(unsorted)
   print(sorted_list)  # 結果: [1, 1, 3, 4, 5, 9]
   ```

10. **min()**  
    最小の要素を返す

    ```python
    values = [10, 2, 33, 4]
    print(min(values))  # 結果: 2
    ```

11. **max()**  
    最大の要素を返す

    ```python
    values = [10, 2, 33, 4]
    print(max(values))  # 結果: 33
    ```

12. **sum()**  
    数値の合計を返す

    ```python
    values = [1, 2, 3, 4]
    print(sum(values))  # 結果: 10
    ```

13. **list.append()**  
    リストの末尾に要素を追加する

    ```python
    lst = [1, 2, 3]
    lst.append(4)
    print(lst)  # 結果: [1, 2, 3, 4]
    ```

14. **list.extend()**  
    リストに複数の要素を一括追加する

    ```python
    lst = [1, 2, 3]
    lst.extend([4, 5])
    print(lst)  # 結果: [1, 2, 3, 4, 5]
    ```

15. **list.pop()**  
    リストの末尾（または指定位置）の要素を削除して返す

    ```python
    lst = [1, 2, 3, 4]
    last = lst.pop()  # 4 を削除
    print(last, lst)  # 結果: 4, [1, 2, 3]
    ```

16. **list.insert()**  
    指定位置に要素を挿入する

    ```python
    lst = [1, 3, 4]
    lst.insert(1, 2)  # インデックス1の位置に2を挿入
    print(lst)  # 結果: [1, 2, 3, 4]
    ```

17. **list.remove()**  
    指定の値を持つ最初の要素を削除する

    ```python
    lst = [1, 2, 3, 2, 4]
    lst.remove(2)  # 最初の2を削除
    print(lst)  # 結果: [1, 3, 2, 4]
    ```

18. **list.sort()**  
    リストをその場でソートする

    ```python
    lst = [3, 1, 4, 1, 5]
    lst.sort()
    print(lst)  # 結果: [1, 1, 3, 4, 5]
    ```

19. **dict.get()**  
    辞書からキーに対応する値を取得（デフォルト値指定可）

    ```python
    d = {'a': 1, 'b': 2}
    print(d.get('a'))  # 結果: 1
    print(d.get('c', 0))  # 結果: 0（キー 'c' がなければ0を返す）
    ```

20. **dict.items()**  
    辞書の (キー, 値) ペアのビューを返す

    ```python
    d = {'a': 1, 'b': 2}
    for key, value in d.items():
        print(key, value)
    ```

21. **dict.keys()**  
    辞書のキーのビューを返す

    ```python
    d = {'a': 1, 'b': 2}
    print(list(d.keys()))  # 結果: ['a', 'b']
    ```

22. **dict.values()**  
    辞書の値のビューを返す

    ```python
    d = {'a': 1, 'b': 2}
    print(list(d.values()))  # 結果: [1, 2]
    ```

23. **str.split()**  
    文字列を分割してリストを返す

    ```python
    s = "one,two,three"
    parts = s.split(",")
    print(parts)  # 結果: ['one', 'two', 'three']
    ```

24. **str.join()**  
    反復可能なオブジェクトの要素を結合して文字列を作る

    ```python
    words = ['Hello', 'World']
    sentence = " ".join(words)
    print(sentence)  # 結果: "Hello World"
    ```

25. **str.format()**  
    文字列のフォーマットを行う

    ```python
    name = "Alice"
    age = 30
    s = "Name: {}, Age: {}".format(name, age)
    print(s)  # 結果: "Name: Alice, Age: 30"
    ```

26. **str.replace()**  
    文字列中の部分文字列を置換する

    ```python
    s = "Hello World"
    new_s = s.replace("World", "Python")
    print(new_s)  # 結果: "Hello Python"
    ```

27. **open()**  
    ファイルを開く（読み書きするためのハンドルを返す）

    ```python
    # 書き込みモードでファイルを作成・書き込み
    with open("example.txt", "w") as f:
        f.write("Hello, file!")
    # 読み込み
    with open("example.txt", "r") as f:
        content = f.read()
    print(content)
    ```

28. **input()**  
    ユーザーからの入力を取得する  
    ※Python 3 の場合

    ```python
    name = input("Enter your name: ")
    print("Hello,", name)
    ```

29. **isinstance()**  
    オブジェクトが特定の型かどうかをチェックする

    ```python
    x = 10
    if isinstance(x, int):
        print("x is an integer")
    ```

30. **abs()**  
    数値の絶対値を返す
    ```python
    print(abs(-42))  # 結果: 42
    ```

---

## 【さらに覚えておくと良い追加の 20 項目】

31. **chr()**  
    数値を対応する文字に変換する

    ```python
    print(chr(65))  # 結果: "A"
    ```

32. **ord()**  
    文字を対応する数値（Unicode コードポイント）に変換する

    ```python
    print(ord("A"))  # 結果: 65
    ```

33. **round()**  
    数値を四捨五入する

    ```python
    print(round(3.14159, 2))  # 結果: 3.14
    ```

34. **pow()**  
    累乗計算を行う  
    ※組み込みの `**` と同等

    ```python
    print(pow(2, 3))  # 結果: 8
    ```

35. **divmod()**  
    商と余りを同時に返す

    ```python
    quotient, remainder = divmod(10, 3)
    print(quotient, remainder)  # 結果: 3 1
    ```

36. **all()**  
    イテラブルの全要素が真なら True を返す

    ```python
    print(all([True, 1, "non-empty"]))  # 結果: True
    print(all([True, 0, "non-empty"]))   # 結果: False (0はFalse)
    ```

37. **any()**  
    イテラブルのいずれかの要素が真なら True を返す

    ```python
    print(any([0, None, ""]))  # 結果: False
    print(any([0, None, "hello"]))  # 結果: True
    ```

38. **iter()**  
    オブジェクトからイテレータを生成する

    ```python
    lst = [1, 2, 3]
    it = iter(lst)
    print(next(it))  # 結果: 1
    print(next(it))  # 結果: 2
    ```

39. **next()**  
    イテレータの次の要素を返す

    ```python
    it = iter([10, 20, 30])
    print(next(it))  # 結果: 10
    ```

40. **set()**  
    集合（重複を持たないデータ構造）を生成する

    ```python
    s = set([1, 2, 2, 3])
    print(s)  # 結果: {1, 2, 3}
    ```

41. **frozenset()**  
    変更不可能な集合を生成する

    ```python
    fs = frozenset([1, 2, 2, 3])
    print(fs)  # 結果: frozenset({1, 2, 3})
    ```

42. **tuple()**  
    イテラブルからタプルを生成する

    ```python
    lst = [1, 2, 3]
    t = tuple(lst)
    print(t)  # 結果: (1, 2, 3)
    ```

43. **dict()**  
    新しい辞書を生成する

    ```python
    d = dict(a=1, b=2)
    print(d)  # 結果: {'a': 1, 'b': 2}
    ```

44. **help()**  
    オブジェクトや関数のヘルプ情報を表示する  
    ※対話型シェルで使うと便利

    ```python
    help(print)
    ```

45. **dir()**  
    オブジェクトの属性一覧を返す

    ```python
    print(dir([]))  # リスト型の属性一覧
    ```

46. **id()**  
    オブジェクトの一意な識別子を返す

    ```python
    x = "Hello"
    print(id(x))
    ```

47. **eval()**  
    文字列として渡された式を評価する  
    ※セキュリティに注意！

    ```python
    expr = "2 + 3 * 4"
    result = eval(expr)
    print(result)  # 結果: 14
    ```

48. **exec()**  
    文字列として渡された Python コードを実行する  
    ※セキュリティに注意！

    ```python
    code = "print('Executed code!')"
    exec(code)
    ```

49. **format()**  
    汎用のフォーマット関数（文字列以外もフォーマット可能）  
    ※これは str.format()と同様の働きですが、format 関数としても使える場合があります。

    ```python
    formatted = format(3.14159, ".2f")
    print(formatted)  # 結果: "3.14"
    ```

50. **complex()**  
    複素数オブジェクトを生成する
    ```python
    c = complex(2, 3)
    print(c)  # 結果: (2+3j)
    ```

---

これらの例を実際に自分で書いて、実行してみることで、Python の組み込み関数・メソッドの使い方に慣れることができます。  
ぜひ、試行錯誤しながら覚えてください！

以下に、あなたに取り組んでほしい 10 問の問題を示します。  
各問題の要件だけを伝えますので、どの組み込み関数やメソッドを使うかは自分で判断して実装してください。  
なお、解答はまだ出さないので、すべて解答した後に送ってくれたら採点します。

---

**問題 1:**  
与えられた整数のリストの中から、最小値と最大値を求め、それらの和を出力するプログラムを書いてください。

---

**問題 2:**  
文字列が入力されたとき、その文字列の各文字の Unicode コードポイント（整数値）のリストを出力するプログラムを書いてください。

---

**問題 3:**  
任意の文字列が与えられるので、その文字列を指定された区切り文字で分割し、得られた各部分のリストを出力するプログラムを書いてください。

---

**問題 4:**  
2 つのリストが与えられたとき、両方のリストに共通する要素だけからなる新しいリストを出力するプログラムを書いてください。

---

**問題 5:**  
浮動小数点数が入力されたとき、その値を小数点以下 2 桁に丸めた結果を出力するプログラムを書いてください。

---

**問題 6:**  
2 つの整数が与えられた場合、商と余りを同時に求め、それらをタプルとして出力するプログラムを書いてください。

---

**問題 7:**  
ユーザーからの入力として、複数の単語がスペースで区切られた文字列が与えられるので、その単語を逆順に並べ替えて、1 つの文字列として出力するプログラムを書いてください。

---

**問題 8:**  
与えられたリストの中から重複する要素を取り除き、残った要素を昇順に並べたリストを出力するプログラムを書いてください。

---

**問題 9:**  
ある文字列に含まれるすべての単語の出現回数を数え、その結果をキーが単語、値が出現回数である辞書として出力するプログラムを書いてください。

---

**問題 10:**  
与えられた文字列が、回文（前から読んでも後ろから読んでも同じ）かどうかを判定し、その結果を出力するプログラムを書いてください。

---

これらの問題に対するあなたの解答をすべて送ってください。採点してフィードバックします。頑張ってください！
