以下は、提供された「8. Compound statements」章の日本語訳です。

---

# 8. 複合文

複合文は、他の文（文の集まり）を含み、それらの実行に影響や制御を与える文です。一般に、複合文は複数行にまたがりますが、簡単な場合は１行にすべて収まることもあります。

`if`、`while`、`for` 文は伝統的な制御フロー構文を実装しています。`try` 文は、一連の文に対する例外ハンドラや後始末コードを指定し、`with` 文はコードブロックの前後で初期化および後始末の処理を実行できるようにします。また、関数定義やクラス定義も構文上は複合文に分類されます。

複合文は１つ以上の「節（clause）」から構成されます。各節はヘッダーと「suite」（文の塊）からなります。ある複合文内のすべての節のヘッダーは同じインデントレベルにあり、各ヘッダーは固有のキーワードで始まり、コロン（:）で終わります。suite は、その節に制御される文の集まりです。suite は、ヘッダーのコロンに続く同じ行内の１つまたは複数のセミコロンで区切られた単純文か、または次行以降のインデントされた１つ以上の文として記述できます。後者の形だけが、入れ子になった複合文を含むことができます。たとえば、以下は不正な例です（どの `if` 文の `else` なのか不明確になるため）：

```python
if test1: if test2: print(x)
```

また、セミコロンはこの文脈でコロンよりも強く結合するため、以下の例ではすべての `print()` 呼び出しが実行されるか、またはどれも実行されないかのいずれかとなります：

```python
if x < y < z: print(x); print(y); print(z)
```

まとめると：

```
compound_stmt ::= if_stmt
                  | while_stmt
                  | for_stmt
                  | try_stmt
                  | with_stmt
                  | match_stmt
                  | funcdef
                  | classdef
                  | async_with_stmt
                  | async_for_stmt
                  | async_funcdef
suite         ::= stmt_list NEWLINE | NEWLINE INDENT statement+ DEDENT
statement     ::= stmt_list NEWLINE | compound_stmt
stmt_list     ::= simple_stmt (";" simple_stmt)* [";"]
```

なお、文は常に NEWLINE（改行）で終わり、その後に DEDENT（インデント解除）が続く場合もあります。また、オプションの継続節は、文を開始できないキーワードで始まるため曖昧さは生じません（Python では「dangling else」問題は、入れ子の `if` 文をインデントすることで解決されています）。

以下、各複合文の構文と意味について説明します。

---

## 8.1. if 文

`if` 文は条件付き実行のために使用されます。

```
if_stmt ::= "if" assignment_expression ":" suite
            ("elif" assignment_expression ":" suite)*
            ["else" ":" suite]
```

順に、`if` 文は以下のように動作します：

- 最初に、`if` に続く式（`assignment_expression`）を評価し、その値が真（Boolean の True と同等）であれば、対応する suite が実行され、他の節は実行・評価されません。
- 真となる式が見つからなかった場合、`else` 節が存在すればその suite が実行されます。

---

## 8.2. while 文

`while` 文は、式が真である限り繰り返し実行するために使用されます。

```
while_stmt ::= "while" assignment_expression ":" suite
               ["else" ":" suite]
```

動作は次の通りです：

- まず、条件式を評価し、その結果が真であれば suite（本体）が実行されます。
- その後、再び条件が評価され、真であれば同じ suite が繰り返し実行されます。
- 条件式が偽になった場合、`else` 節が存在すればその suite が実行され、ループが終了します。
- なお、`break` 文が実行されると、`else` 節は実行されません。
- `continue` 文が実行されると、残りの文はスキップされ、次の条件評価に戻ります。

---

## 8.3. for 文

`for` 文は、シーケンス（文字列、タプル、リストなど）やその他の反復可能オブジェクトの要素を反復するために使用されます。

```
for_stmt ::= "for" target_list "in" starred_list ":" suite
             ["else" ":" suite]
```

動作は次の通りです：

- まず、`starred_list` の式が１回評価され、反復可能オブジェクトが得られます。
- この反復可能オブジェクトからイテレータが作成され、最初の要素が取り出され、標準の代入規則に従って `target_list` に代入されます。
- 次に、suite（本体）が実行されます。
- 以降、イテレータから要素が次々に取り出され、同様に `target_list` に代入され、本体が実行されます。
- イテレータが尽きた場合、`else` 節が存在すればその suite が実行され、ループが終了します。
- なお、`break` 文が実行されると、`else` 節は実行されません。
- `continue` 文が実行されると、残りの文はスキップされ、次の要素の処理に移ります。

また、`for` 文は `target_list` に対して代入を行います。これにより、`for` 文内で行われた変数への代入はループ外でも有効ですが、シーケンスが空の場合は変数が代入されない点に注意してください。

_例:_

```python
for i in range(10):
    print(i)
    i = 5  # ここで i に値を設定しても、次の反復時には range() による新たな値で上書きされる
```

※ Python 3.11 以降、式リスト内での starred 要素が使用可能になりました。

---

## 8.4. try 文

`try` 文は、一連の文に対して例外ハンドラや後始末コードを指定するために使用されます。

```
try_stmt  ::= try1_stmt | try2_stmt | try3_stmt
```

以下、各形式について説明します。

### 8.4.1. except 節

`except` 節は１つ以上の例外ハンドラを指定します。

- もし、`try` 節内で例外が発生しなければ、いずれのハンドラも実行されません。
- 例外が発生した場合、`except` 節が上から順に評価され、例外とマッチするものがあればそのハンドラが実行されます。
- 式を伴わない `except` 節（何の例外型も指定しないもの）は最後に記述しなければならず、どの例外にもマッチします。

例外型を指定する場合、その式は例外型または例外型のタプルに評価されなければなりません。  
発生した例外が、指定された例外型（またはその非仮想基底クラス）のいずれかに該当すれば、その `except` 節が適用されます。

もしどの `except` 節も例外にマッチしなかった場合、例外ハンドラの検索は呼び出し元のコードや呼び出しスタックに向かって続きます。

また、`except` 節のヘッダーで例外型の式を評価中に別の例外が発生すると、元の例外のハンドラ探索は中止され、新たな例外が呼び出し元に伝播されます。

例外がハンドラにマッチした場合、もし `as` キーワードの後にターゲットが指定されていれば、発生した例外がその名前に代入されます。その後、`except` 節内の suite が実行され、終了時に例外はクリアされます（例：

```python
except E as N:
    foo
```

は、内部的には以下のように変換され、`N` は finally 節で削除される）：

```python
except E as N:
    try:
        foo
    finally:
        del N
```

これにより、例外にアクセスするには別の名前に代入する必要があります。  
例外オブジェクトにはトレースバックが付随しているため、例外が保持するスタックフレーム全体がガベージコレクションまで生存してしまうのを防ぐためです。

なお、`except` 節の suite の実行前に、例外は `sys` モジュールに保存され、`sys.exception()` で参照可能です。  
`except` 節を抜ける際、`sys` モジュール内の例外情報は元の値にリセットされます。

_例:_

```python
print(sys.exception())
# None
try:
    raise TypeError
except:
    print(repr(sys.exception()))
    try:
         raise ValueError
    except:
        print(repr(sys.exception()))
    print(repr(sys.exception()))

# 出力例:
# TypeError()
# ValueError()
# TypeError()
print(sys.exception())
# None
```

---

### 8.4.2. except\* 節

`except*` 節は、`ExceptionGroup`（例外グループ）を処理するために使用されます。  
例外型の評価は通常の `except` と同様に行われますが、例外グループの場合、グループ内の一部の例外に対して部分的にマッチすることが可能です。  
その結果、複数の `except*` 節が実行され、それぞれが例外グループの該当する部分を処理します。  
各 `except*` 節は最大１度だけ実行され、マッチするすべての例外をまとめて処理します。  
グループ内の各例外は、最初にマッチした `except*` 節によってのみ処理されます。

_例:_

```python
try:
    raise ExceptionGroup("eg", [ValueError(1), TypeError(2), OSError(3), OSError(4)])
except* TypeError as e:
    print(f'caught {type(e)} with nested {e.exceptions}')
except* OSError as e:
    print(f'caught {type(e)} with nested {e.exceptions}')
```

この場合、`TypeError` と `OSError` にそれぞれ対応する `except*` 節が実行され、残った例外は最後に再送出されます。  
もし再送出すべき例外が複数ある場合、それらはまとめて１つの例外グループとして送出されます。

なお、`except*` 節には必ずマッチする例外型の式が必要で、式を省略することはできません。また、その式内に例外グループ型を含むこともできません（意味が曖昧になるためです）。

さらに、同一の `try` 文内で `except` と `except*` を混在させることはできません。  
また、`break`、`continue`、`return` 文は `except*` 節内に記述できません。

---

### 8.4.3. else 節

オプションの `else` 節は、`try` 節の実行を終了したときに、例外が発生せず、かつ `return`、`continue`、`break` 文が実行されなかった場合に実行されます。  
なお、`else` 節内で発生した例外は、前の `except` 節では処理されません。

---

### 8.4.4. finally 節

`finally` 節が存在する場合、これは「後始末」ハンドラを指定します。  
`try` 節（および `except`、`else` 節）が実行された後、例外が発生していた場合、その例外は一時的に保存され、`finally` 節が必ず実行されます。  
その後、一時保存されていた例外があれば、`finally` 節の実行後に再送出されます。  
ただし、`finally` 節内で新たに例外が発生した場合は、元の例外はその例外のコンテキストとして設定されます。  
また、`finally` 節内で `return`、`break`、`continue` 文が実行された場合、一時保存された例外は破棄されます。

_例:_

```python
def f():
    try:
        1/0
    finally:
        return 42

f()  # 42
```

関数内で最後に実行された `return` 文が、関数の返り値を決定します。  
`finally` 節は必ず実行されるため、もし `finally` 節内で `return` 文が実行されれば、それが最終的な返り値となります。

※ Python 3.8 以降、以前は `finally` 節内で `continue` 文は実装上の問題から禁止されていましたが、現在は許可されています。

---

## 8.5. with 文

`with` 文は、コンテキストマネージャが定義するメソッドによって、あるコードブロックの実行前後に初期化および後始末の処理をラップするために使用されます（詳細は「With Statement Context Managers」を参照）。  
これにより、一般的な `try…except…finally` のパターンを再利用可能な形にカプセル化できます。

```
with_stmt          ::= "with" ( "(" with_stmt_contents ","? ")" | with_stmt_contents ) ":" suite
with_stmt_contents ::= with_item ("," with_item)*
with_item          ::= expression ["as" target]
```

`with` 文の実行は次の手順で進みます：

1. 各 `with_item` 内のコンテキスト式（`expression`）が評価され、コンテキストマネージャを得る。
2. コンテキストマネージャの `__enter__()` メソッドと `__exit__()` メソッドが取得される。
3. `__enter__()` メソッドが呼び出され、その戻り値があれば、`as` 節で指定されたターゲットに代入される。
   - ※ 注意: `__enter__()` がエラーなく返れば、必ず後で `__exit__()` が呼ばれる保証があります。もしターゲットへの代入中にエラーが発生した場合も、`__exit__()` は通常の例外発生時と同様に扱われます。
4. suite（ブロック）が実行される。
5. suite の実行が終了すると、コンテキストマネージャの `__exit__()` メソッドが呼び出される。
   - もし suite の実行中に例外が発生していた場合、その例外の型、値、トレースバックが `__exit__()` に渡される。
   - 例外がなければ、すべての引数に `None` が渡される。
6. もし suite の終了が例外によるもので、かつ `__exit__()` の戻り値が偽であれば、その例外は再送出されます。  
   逆に、`__exit__()` が真を返せば例外は抑制され、`with` 文の次の文に制御が移ります。
7. もし suite が例外以外の理由で終了した場合、`__exit__()` の戻り値は無視され、通常の制御に従います。

次のコード：

```python
with EXPRESSION as TARGET:
    SUITE
```

は、次のように意味的に展開されます：

```python
manager = (EXPRESSION)
enter = type(manager).__enter__
exit = type(manager).__exit__
value = enter(manager)
hit_except = False

try:
    TARGET = value
    SUITE
except:
    hit_except = True
    if not exit(manager, *sys.exc_info()):
        raise
finally:
    if not hit_except:
        exit(manager, None, None, None)
```

複数のアイテムがある場合、コンテキストマネージャは次のように入れ子になった `with` 文と同等に処理されます：

```python
with A() as a, B() as b:
    SUITE
```

は、次のように展開されます：

```python
with A() as a:
    with B() as b:
        SUITE
```

また、複数行にまたがる場合は、括弧で囲むこともできます。

```python
with (
    A() as a,
    B() as b,
):
    SUITE
```

※ Python 3.1 以降、複数のコンテキスト式がサポートされています。  
※ Python 3.10 以降、グループ化用の括弧を使用して複数行に分割することが可能になりました。

詳しくは PEP 343 を参照してください。

---

## 8.6. match 文

※ Python 3.10 以降で追加された文です。

`match` 文はパターンマッチングに使用されます。構文は以下の通りです：

```
match_stmt   ::= 'match' subject_expr ":" NEWLINE INDENT case_block+ DEDENT
subject_expr ::= star_named_expression "," star_named_expressions?
                 | named_expression
case_block   ::= 'case' patterns [guard] ":" block
```

※ この節では、ソフトキーワードをシングルクォートで示しています。

パターンマッチングは、`match` に続く主題の値（subject value）と、`case` に続くパターンを用いて行われます。  
マッチの結果は、パターンの成功（または失敗）および、場合によってはそのパターン内で名前へのバインディングが行われるかどうかとなります。  
これらのバインディングは後続のブロック内で有効となり、`match` 文の外でも使用可能です（ただし、実装上の最適化により、失敗したパターンのバインディングがどうなるかは保証されません）。

`match` および `case` はソフトキーワードです。

詳しくは PEP 634（Structural Pattern Matching: Specification）および PEP 636（Tutorial）を参照してください。

---

### 8.6.1. 概要

`match` 文の論理的な流れは以下の通りです：

1. 主題式（`subject_expr`）が評価され、その結果として主題の値が得られる。  
   もし主題式にコンマが含まれていれば、標準のルールに従ってタプルが生成される。

2. 各 `case` ブロック内のパターンが、主題の値に対して順に試される。  
   各パターンの成功・失敗のルールは後述の通りです。  
   マッチングの試行中、パターン内のスタンドアロンの名前へのバインディングも行われる場合があります。

3. もしパターンが成功した場合、`guard`（オプション）があるならそれが評価される。  
   ガードが真であれば、その `case` ブロックの中のコードが実行される。  
   ガードが偽であれば、その `case` は選択されず、次の `case` ブロックが試される。

4. すべての `case` ブロックに該当しなければ、`match` 文の実行は終了する。

※ 注意: マッチングが失敗した場合でも、部分的に成功するサブパターンがあることがあり、そのバインディングに依存してはいけません。また、失敗した場合に変数の値が変更されないとも限りません。これは実装依存であり、将来的に最適化のために変更される可能性があります。

_例:_

```python
flag = False
match (100, 200):
   case (100, 300):  # マッチしない：200 != 300
       print('Case 1')
   case (100, 200) if flag:  # マッチはするが、ガードが False のため実行されない
       print('Case 2')
   case (100, y):  # マッチし、y に 200 がバインドされる
       print(f'Case 3, y: {y}')
   case _:  # ここは試されない
       print('Case 4, I match anything!')
```

上記の場合、`flag` が False であるため「Case 3, y: 200」が出力されます。

---

### 8.6.2. ガード

ガードは `if` キーワードに続く式で表され、`case` ブロック内のコードを実行するためにはパターンのマッチに加え、ガードの評価も真でなければなりません。

```
guard ::= "if" named_expression
```

論理の流れは以下の通りです：

- まず、`case` ブロック内のパターンが評価され、成功しているかを確認する。  
  もしパターンが失敗していれば、ガードは評価されず、次の `case` ブロックへ移ります。

- パターンが成功していれば、ガードの式が評価される。  
  ガードが真であれば、その `case` ブロックが選択され、実行されます。  
  ガードが偽の場合は、その `case` ブロックは選択されません。  
  もしガードの評価中に例外が発生した場合、その例外は呼び出し元に伝播されます。

ガードは式であるため副作用を持つことが可能です。評価は上から順に実行され、最初にマッチした `case` ブロックで評価が停止します。

---

### 8.6.3. 必ずマッチする（irrefutable） case ブロック

必ずマッチする case ブロック（match-all case ブロック）は、どんな主題値に対してもマッチするブロックです。  
`match` 文には、最大１つの必ずマッチする case ブロックのみが許され、かつそれは最後に記述されなければなりません。

ある case ブロックが必ずマッチすると判断されるためには、以下の条件を満たす必要があります：

- ガードがないこと
- パターン自体が必ず成功する（構文上から常に成功すると証明できる）ものであること

必ず成功するパターンとしては、以下のものが挙げられます：

- AS パターンで、左側のパターンが必ず成功する場合
- １つ以上の OR パターンのうち、少なくとも１つが必ず成功する場合
- キャプチャパターン
- ワイルドカードパターン
- 丸括弧で囲まれた必ず成功するパターン

---

### 8.6.4. パターン

※ この節では、標準 EBNF を超える文法表記法を使用しています。

- 記法 `SEP.RULE+` は、`RULE (SEP RULE)*` の省略形です。
- 記法 `!RULE` は、否定の先読みアサーションを意味します。

パターンのトップレベルの構文は次の通りです：

```
patterns       ::= open_sequence_pattern | pattern
pattern        ::= as_pattern | or_pattern
closed_pattern ::= literal_pattern
                   | capture_pattern
                   | wildcard_pattern
                   | value_pattern
                   | group_pattern
                   | sequence_pattern
                   | mapping_pattern
                   | class_pattern
```

以下、各パターンの種類とその意味について、（簡単な説明として）説明します。なお、これらの説明はあくまで理解を助けるためのものであり、内部実装の詳細を必ずしも反映しているわけではありません。また、有効なすべての形を網羅しているわけではありません。

---

#### 8.6.4.1. OR パターン

OR パターンは、縦線（`|`）で区切られた２つ以上のパターンです。構文は：

```
or_pattern ::= "|".closed_pattern+
```

※ 最後のサブパターンだけが必ずマッチする（irrefutable）可能性を持ち、各サブパターンは同じ名前のバインディングを行う必要があります（さもなければ曖昧になるため）。

OR パターンは、左から順に各サブパターンを主題値に対して試し、いずれかが成功すれば OR パターン全体が成功します。すべて失敗した場合、OR パターンは失敗します。

簡単に言えば、`P1 | P2 | ...` は、最初に `P1` を試し、失敗すれば `P2` を試し、どれかが成功すれば全体が成功する、という動作をします。

---

#### 8.6.4.2. AS パターン

AS パターンは、`as` キーワードの左側にある OR パターンを主題値に対してマッチさせ、成功した場合に右側の名前に主題値をバインドします。構文は：

```
as_pattern ::= or_pattern "as" capture_pattern
```

もし OR パターンが失敗すれば、AS パターン全体も失敗します。  
成功した場合、`as` の右側にある名前に主題値がバインドされ、マッチは成功します。  
なお、`capture_pattern` として単一のアンダースコア（`_`）は使用できません。

簡単に言えば、`P as NAME` は、`P` にマッチし、成功すれば `NAME` に主題値が代入されます。

---

#### 8.6.4.3. リテラルパターン

リテラルパターンは、Python のほとんどのリテラルに対応します。構文は：

```
literal_pattern ::= signed_number
                    | signed_number "+" NUMBER
                    | signed_number "-" NUMBER
                    | strings
                    | "None"
                    | "True"
                    | "False"
signed_number   ::= ["-"] NUMBER
```

ここで、`strings` やトークン `NUMBER` は標準の Python 文法で定義されています。  
トリプルクォート文字列、Raw 文字列、バイト文字列がサポートされますが、f-string はサポートされません。  
`+` や `-` を伴う形は複素数を表現するためのもので、左側に実数、右側に虚数が必要です（例: `3 + 4j`）。

簡単に言えば、リテラルパターンは、主題値がそのリテラルと等しい場合にのみ成功します。  
なお、`None`、`True`、`False` については、`is` 演算子が使用されます。

---

#### 8.6.4.4. キャプチャパターン

キャプチャパターンは、主題値を名前にバインドします。構文は：

```
capture_pattern ::= !'_' NAME
```

ここで、単一のアンダースコア `_` はキャプチャパターンとはならず、ワイルドカードパターンとして扱われます。

パターン内で同じ名前は１度しかバインドできません。たとえば、`case x, x: ...` は無効ですが、`case [x] | x: ...` は許されます。

キャプチャパターンは常に成功し、主題値がその名前にバインドされます。  
簡単に言えば、`NAME` は常に成功し、`NAME = <subject>` となります。

---

#### 8.6.4.5. ワイルドカードパターン

ワイルドカードパターンは、常に成功（何に対してもマッチ）し、名前のバインディングを行いません。構文は：

```
wildcard_pattern ::= '_'
```

`_` はパターン内ではソフトキーワードとして扱われ、常に識別子としての意味を持ちます（match の主題式やガード、case ブロック内では通常の識別子とは異なり、ワイルドカードとして機能します）。

簡単に言えば、`_` は何にでもマッチします。

---

#### 8.6.4.6. 値パターン

値パターンは、Python 内の名前付きの値を表します。構文は：

```
value_pattern ::= attr
attr          ::= name_or_attr "." NAME
name_or_attr  ::= attr | NAME
```

パターン内のドットで連結された名前は、標準の名前解決規則に従って参照されます。  
パターンは、見つかった値が主題値と等しい（`==` による比較）場合に成功します。

簡単に言えば、`NAME1.NAME2` は、主題値が `NAME1.NAME2` と等しい場合に成功します。  
※ 同じ値が複数回現れる場合、最初に見つかった値がキャッシュされ、再利用される可能性があります（キャッシュは各 `match` 文の実行にのみ有効です）。

---

#### 8.6.4.7. グループパターン

グループパターンは、パターンを括弧で囲むことでグループ化を明示するためのものです。構文は：

```
group_pattern ::= "(" pattern ")"
```

簡単に言えば、`(P)` は単に `P` と同じ効果を持ちます。

---

#### 8.6.4.8. シーケンスパターン

シーケンスパターンは、シーケンスの各要素に対して複数のサブパターンをマッチさせるものです。構文はリストやタプルのアンパッキングに類似しています：

```
sequence_pattern       ::= "[" [maybe_sequence_pattern] "]"
                           | "(" [open_sequence_pattern] ")"
open_sequence_pattern  ::= maybe_star_pattern "," [maybe_sequence_pattern]
maybe_sequence_pattern ::= "," maybe_star_pattern+ ","?
maybe_star_pattern     ::= star_pattern | pattern
star_pattern           ::= "*" (capture_pattern | wildcard_pattern)
```

※ 括弧を使うか角括弧を使うかに違いはなく、ただし括弧で囲まれた１つのパターン（末尾のコンマがない場合）はグループパターンとみなされます。

シーケンスパターン内では、最多１つの starred サブパターンのみ許され、その位置は任意です。  
starred サブパターンがなければ、シーケンスパターンは固定長として扱われ、主題シーケンスの長さがパターンのサブパターンの数と一致しなければ失敗します。  
各サブパターンは、左から順に主題シーケンスの対応する要素に対してマッチします。  
すべてのサブパターンが成功すれば、シーケンスパターンは成功します。

starred サブパターンがある場合は、以下のように動作します：

1. 主題シーケンスの長さが、starred 以外のサブパターンの数以上でなければ、失敗します。
2. 最初の非-starred サブパターンは固定長パターンと同様に左から順にマッチします。
3. 次に、starred サブパターンは、残りの要素のうち、後続の非-starred サブパターンに対応する分を除いたリストにマッチします。
4. その後、残りの非-starred サブパターンが、主題シーケンスの末尾の要素に対してマッチします。

簡単に言えば、`[P1, P2, P3, …, P<N>]` は、以下の条件をすべて満たすときに成功します：

- 主題値がシーケンスであること
- `len(subject) == N`（固定長の場合）または条件を満たす（変動長の場合）
- 各 `Pi` が主題シーケンスの対応する要素にマッチすること

---

#### 8.6.4.9. マッピングパターン

マッピングパターンは、１つ以上のキーと値のパターンの組み合わせを含み、辞書の構築に類似した構文です。構文は：

```
mapping_pattern     ::= "{" [items_pattern] "}"
items_pattern       ::= key_value_pattern ("," key_value_pattern)* [","]
key_value_pattern   ::= (literal_pattern | value_pattern) ":" pattern
                        | double_star_pattern
double_star_pattern ::= "**" capture_pattern
```

マッピングパターン内では、最多１つの double star パターンのみ許され、それは最後のサブパターンでなければなりません。  
また、重複するキーは許されません。  
重複するリテラルキーは文法エラー（SyntaxError）となり、同一の値を持つ名前付きキーは実行時に ValueError となります。

マッピングパターンのマッチングの流れは次の通りです：

1. 主題値がマッピングでなければ失敗します。
2. マッピングパターンに指定されたすべてのキーが、主題マッピングに存在し、各キーに対するパターンが主題マッピングの該当する値にマッチすれば成功します。

簡単に言えば、`{KEY1: P1, KEY2: P2, ...}` は、以下の条件を満たす場合に成功します：

- 主題値がマッピングであること
- 各 `KEYi` が主題マッピングに存在し、その値に対して `Pi` がマッチすること

---

#### 8.6.4.10. クラスパターン

クラスパターンは、クラスとその位置引数およびキーワード引数（ある場合）を表します。構文は：

```
class_pattern       ::= name_or_attr "(" [pattern_arguments ","?] ")"
pattern_arguments   ::= positional_patterns ["," keyword_patterns]
                        | keyword_patterns
positional_patterns ::= pattern ("," pattern)+
keyword_patterns    ::= keyword_pattern ("," keyword_pattern)+
keyword_pattern     ::= NAME "=" pattern
```

同じキーワードが複数回現れてはなりません。

クラスパターンのマッチングの流れは次の通りです：

1. まず、`name_or_attr` がクラスオブジェクトであることを確認します。そうでなければ `TypeError` となります。
2. 主題値が、そのクラスのインスタンス（`isinstance()` によるチェック）でなければ、マッチは失敗します。
3. パターン引数がなければ、マッチは成功します。
4. パターン引数がある場合、位置引数のパターンがあるならば、クラスの `__match_args__` 属性を使用して、これらをキーワードパターンに変換します。
   - もし、`__match_args__` がタプルでなければエラーとなり、また位置引数の数が `len(__match_args__)` を超える場合もエラーです。
   - 変換後は、各位置パターンは対応するキーワードパターンとして処理されます。
5. キーワードパターンのみが存在する場合、各キーワードについて、対象の属性が存在し、その属性に対してパターンがマッチするかが順次評価され、すべて成功すればクラスパターンは成功します。

特に、以下の組み込み型では、位置引数の扱いが異なります：

- `bool`、`bytearray`、`bytes`、`dict`、`float`、`frozenset`、`int`、`list`、`set`、`str`、`tuple`

これらのクラスは、単一の位置引数を受け取り、そのパターンはオブジェクト全体に対してマッチします。  
たとえば、`int(0|1)` は整数 0 にマッチしますが、0.0 にはマッチしません。

簡単に言えば、`CLS(P1, attr=P2)` は、次の条件をすべて満たす場合にマッチします：

- 主題値が `isinstance(<subject>, CLS)` を満たすこと
- 位置パターン `P1` が、`CLS.__match_args__` に基づいて適切に変換され、主題値全体または対応する属性にマッチすること
- キーワード引数 `attr=P2` について、主題値が属性 `attr` を持ち、`P2` がその属性値にマッチすること

詳しくは「Customizing positional arguments in class pattern matching」を参照してください。

---

## 8.7. 関数定義

関数定義は、ユーザー定義関数オブジェクトを定義します（詳細は「The standard type hierarchy」を参照）。

```
funcdef ::= [decorators] "def" funcname [type_params] "(" [parameter_list] ")"
             ["->" expression] ":" suite
decorators                ::= decorator+
decorator                 ::= "@" assignment_expression NEWLINE
parameter_list            ::= defparameter ("," defparameter)* "," "/" ["," [parameter_list_no_posonly]]
                              | parameter_list_no_posonly
parameter_list_no_posonly ::= defparameter ("," defparameter)* ["," [parameter_list_starargs]]
                              | parameter_list_starargs
parameter_list_starargs   ::= "*" [star_parameter] ("," defparameter)* ["," [parameter_star_kwargs]]
                              | "*" ("," defparameter)+ ["," [parameter_star_kwargs]]
                              | parameter_star_kwargs
parameter_star_kwargs     ::= "**" parameter [","]
parameter                 ::= identifier [":" expression]
star_parameter            ::= identifier [":" ["*"] expression]
defparameter              ::= parameter ["=" expression]
funcname                  ::= identifier
```

関数定義は実行可能な文です。関数定義が実行されると、現在のローカル名前空間に関数名がバインドされ、関数オブジェクト（実行可能なコードへのラッパー）が生成されます。  
この関数オブジェクトは、関数呼び出し時に使用されるグローバル名前空間への参照も持ちます。  
関数定義自体は関数の本体を実行せず、呼び出されたときに初めて本体が実行されます。

関数定義は１つ以上のデコレータでラップすることが可能です。デコレータは、関数定義時に評価され、その結果として返された呼び出し可能なオブジェクトが、関数オブジェクトを引数として呼び出され、返り値が関数名にバインドされます。  
複数のデコレータがある場合は、入れ子状に適用されます。

例:

```python
@f1(arg)
@f2
def func(): pass
```

は、概ね以下と同等です：

```python
def func(): pass
func = f1(arg)(f2(func))
```

※ Python 3.9 以降、関数は任意の有効な `assignment_expression` でデコレートできるようになりました（以前は文法がより制限されていました；詳細は PEP 614 を参照）。

また、関数名とパラメータリストの開始括弧の間に、角括弧を用いた型パラメータリストを指定することができます。  
これは、関数がジェネリックであることを型チェッカーに示すためのものです。  
実行時には、関数オブジェクトの `__type_params__` 属性から型パラメータが取得できます。  
※ Python 3.12 からは型パラメータリストが新たに導入されました。

なお、パラメータにデフォルト値（`parameter = expression` の形）がある場合、そのパラメータは呼び出し時に省略可能となります。  
デフォルト値は、関数定義が実行されたときに左から順に評価され、その結果が各呼び出しで使い回されます。  
特に、デフォルト値が可変オブジェクトの場合は注意が必要です。

---

## 8.8. クラス定義

クラス定義は、クラスオブジェクトを定義します（詳細は「The standard type hierarchy」を参照）。

```
classdef    ::= [decorators] "class" classname [type_params] [inheritance] ":" suite
inheritance ::= "(" [argument_list] ")"
classname   ::= identifier
```

クラス定義は実行可能な文です。  
継承リストには、通常、基底クラス（高度な用途については「Metaclasses」を参照）が記述され、各項目はクラスオブジェクトに評価されなければなりません。  
継承リストがない場合、クラスは自動的に `object` を継承します。  
たとえば、

```python
class Foo:
    pass
```

は

```python
class Foo(object):
    pass
```

と同等です。

クラスの suite（本体）は、新たな実行フレームとローカル名前空間で実行され、実行後にそのローカル名前空間は保存されます。  
その後、基底クラスのリストと保存されたローカル名前空間を用いて、クラスオブジェクトが作成され、元のローカル名前空間にクラス名がバインドされます。

クラス本体内で定義された属性の順序は、クラスの `__dict__` に保持されますが、これはクラス作成直後のみ信頼できます。

クラス作成は、メタクラスを用いて大幅にカスタマイズ可能です。

また、クラスもデコレータで装飾することができます。  
たとえば、

```python
@f1(arg)
@f2
class Foo: pass
```

は、概ね以下と同等です：

```python
class Foo: pass
Foo = f1(arg)(f2(Foo))
```

※ Python 3.9 以降、クラスは任意の有効な `assignment_expression` でデコレート可能です（以前は文法がより制限されていました；詳細は PEP 614 を参照）。

また、クラス名の直後に角括弧を用いた型パラメータリストを指定することができます。  
これは、クラスがジェネリックであることを型チェッカーに示すためのものです。  
実行時には、クラスの `__type_params__` 属性から型パラメータが取得できます。  
※ Python 3.12 から型パラメータリストが導入されました。

プログラマへの注意点として、クラス定義内で定義された変数はクラス属性となり、すべてのインスタンスで共有されます。  
インスタンス属性は、メソッド内で `self.name = value` のように設定されます。  
同じ名前がクラス属性とインスタンス属性の両方に存在する場合、インスタンス属性が優先されます。  
クラス属性をデフォルトとして使うことは可能ですが、可変オブジェクトの場合は予期しない結果を招く恐れがあります。  
ディスクリプタを使うと、より柔軟な属性の実装が可能です。

---

## 8.9. コルーチン

※ Python 3.5 以降で追加されました。

### 8.9.1. コルーチン関数の定義

```
async_funcdef ::= [decorators] "async" "def" funcname "(" [parameter_list] ")"
                  ["->" expression] ":" suite
```

`async def` で定義された関数はコルーチン関数となり、実行中に中断・再開が可能です。  
これらの関数内では、`await` 式、`async for`、`async with` などが使用できます。  
コルーチン関数は、たとえ中で `await` や `async` を含まなくても、常にコルーチン関数として扱われます。  
また、コルーチン関数の本体内で `yield from` 式を使用することは構文エラーとなります。

例:

```python
async def func(param1, param2):
    do_stuff()
    await some_coroutine()
```

※ Python 3.7 以降、`await` と `async` はキーワードとなりました（以前はコルーチン関数内のみキーワード扱いでした）。

---

### 8.9.2. async for 文

```
async_for_stmt ::= "async" for_stmt
```

非同期イテラブルは、`__aiter__` メソッドを持ち、それが非同期イテレータを返します。  
非同期イテレータは、`__anext__` メソッド内で非同期コードを呼び出すことができます。

`async for` 文は、非同期イテラブルの要素を反復処理するための構文です。

たとえば、次のコード：

```python
async for TARGET in ITER:
    SUITE
else:
    SUITE2
```

は、概ね以下と同等です：

```python
iter = (ITER)
iter = type(iter).__aiter__(iter)
running = True

while running:
    try:
        TARGET = await type(iter).__anext__(iter)
    except StopAsyncIteration:
        running = False
    else:
        SUITE
else:
    SUITE2
```

※ コルーチン関数の本体外で `async for` 文を使うと構文エラーになります。

---

### 8.9.3. async with 文

```
async_with_stmt ::= "async" with_stmt
```

非同期コンテキストマネージャは、`__aenter__` および `__aexit__` メソッドを持ち、これらのメソッド内で実行の中断が可能です。

次のコード：

```python
async with EXPRESSION as TARGET:
    SUITE
```

は、概ね以下と同等です：

```python
manager = (EXPRESSION)
aenter = type(manager).__aenter__
aexit = type(manager).__aexit__
value = await aenter(manager)
hit_except = False

try:
    TARGET = value
    SUITE
except:
    hit_except = True
    if not await aexit(manager, *sys.exc_info()):
        raise
finally:
    if not hit_except:
        await aexit(manager, None, None, None)
```

※ コルーチン関数の本体外で `async with` 文を使うと構文エラーになります。

詳しくは PEP 492 を参照してください。

---

## 8.10. 型パラメータリスト

※ Python 3.12 以降で追加され、Python 3.13 からはデフォルト値のサポートも追加されました（PEP 696 参照）。

```
type_params  ::= "[" type_param ("," type_param)* "]"
type_param   ::= typevar | typevartuple | paramspec
typevar      ::= identifier (":" expression)? ("=" expression)?
typevartuple ::= "*" identifier ("=" expression)?
paramspec    ::= "**" identifier ("=" expression)?
```

関数（コルーチン含む）、クラス、型エイリアスは、型パラメータリストを持つことができます。  
たとえば、

```python
def max[T](args: list[T]) -> T:
    ...
```

```python
async def amax[T](args: list[T]) -> T:
    ...
```

```python
class Bag[T]:
    def __iter__(self) -> Iterator[T]:
        ...
    def add(self, arg: T) -> None:
        ...
```

```python
type ListOrSet[T] = list[T] | set[T]
```

これらは、対象の関数、クラス、または型エイリアスが、型変数に対してジェネリックであることを示します。  
この情報は主に静的型チェック用であり、実行時にはジェネリックなオブジェクトは非ジェネリックなオブジェクトとほぼ同様に振る舞います。  
型パラメータは、対象の名前の直後に角括弧 `[]` で宣言され、ジェネリックオブジェクトのスコープ内でのみ参照可能です。  
型パラメータは、`__type_params__` 属性にリストされます。

型パラメータには３種類があります：

- **typing.TypeVar:** 単一の型を表します。例: `T`
- **typing.TypeVarTuple:** 単一のアスタリスク（`*Ts`）で導入され、任意数の型のタプルを表します。
- **typing.ParamSpec:** 二重のアスタリスク（`**P`）で導入され、呼び出し可能オブジェクトのパラメータを表します。

`typing.TypeVar` の宣言では、コロン（:）に続く式で境界や制約を指定できます。

- 単一の式は境界を示し、タプルは制約の集合を示します。  
  制約のある型変数は、指定された型のいずれかにのみマッチします。  
  これらの境界や制約は、型パラメータの `__bound__` や `__constraints__` 属性でアクセスされるまで評価されません。  
  `TypeVarTuple` や `ParamSpec` には境界や制約は設定できません。

また、すべての型パラメータは、`=` 記号に続く式でデフォルト値を指定することもできます。  
デフォルト値は、型パラメータが明示的に指定されなかった場合に使用され、`__default__` 属性でアクセスされるまで評価されません。  
デフォルト値が指定されていない場合、`__default__` は特別な sentinel オブジェクト `typing.NoDefault` に設定されます。

_例:_

```python
def overly_generic[
   SimpleTypeVar,
   TypeVarWithDefault = int,
   TypeVarWithBound: int,
   TypeVarWithConstraints: (str, bytes),
   *SimpleTypeVarTuple = (int, float),
   **SimpleParamSpec = (str, bytearray),
](
   a: SimpleTypeVar,
   b: TypeVarWithDefault,
   c: TypeVarWithBound,
   d: Callable[SimpleParamSpec, TypeVarWithConstraints],
   *e: SimpleTypeVarTuple,
): ...
```

---

### 8.10.1. ジェネリック関数

ジェネリック関数は次のように定義されます：

```python
def func[T](arg: T): ...
```

これは概ね以下と同等です：

```python
annotation-def TYPE_PARAMS_OF_func():
    T = typing.TypeVar("T")
    def func(arg: T): ...
    func.__type_params__ = (T,)
    return func
func = TYPE_PARAMS_OF_func()
```

ここで `annotation-def` は注釈スコープを示し、実際のキーワードではありません。  
関数のデフォルト値やデコレータは、型パラメータの注釈スコープの外側で評価されます。

_例:_

```python
@decorator
def func[T: int, *Ts, **P](*args: *Ts, arg: Callable[P, T] = some_default):
    ...
```

これは内部的には次のように変換されます：

```python
DEFAULT_OF_arg = some_default

annotation-def TYPE_PARAMS_OF_func():
    annotation-def BOUND_OF_T():
        return int
    T = typing.TypeVar("T", bound=BOUND_OF_T())
    Ts = typing.TypeVarTuple("Ts")
    P = typing.ParamSpec("P")
    def func(*args: *Ts, arg: Callable[P, T] = DEFAULT_OF_arg):
        ...
    func.__type_params__ = (T, Ts, P)
    return func
func = decorator(TYPE_PARAMS_OF_func())
```

※ 大文字の名前（例: DEFAULT_OF_arg）は実際にはバインドされません。

---

### 8.10.2. ジェネリッククラス

ジェネリッククラスは次のように定義されます：

```python
class Bag[T]: ...
```

これは概ね以下と同等です：

```python
annotation-def TYPE_PARAMS_OF_Bag():
    T = typing.TypeVar("T")
    class Bag(typing.Generic[T]):
        __type_params__ = (T,)
        ...
    return Bag
Bag = TYPE_PARAMS_OF_Bag()
```

こちらも、`annotation-def` は注釈スコープを示し、実際には名前にバインドされません。  
ジェネリッククラスは暗黙のうちに `typing.Generic` を継承します。  
デコレータは型パラメータのスコープの外側で評価されます。

_例:_

```python
@decorator
class Bag(Base[T], arg=T): ...
```

は概ね以下と同等です：

```python
annotation-def TYPE_PARAMS_OF_Bag():
    T = typing.TypeVar("T")
    class Bag(Base[T], typing.Generic[T], arg=T):
        __type_params__ = (T,)
        ...
    return Bag
Bag = decorator(TYPE_PARAMS_OF_Bag())
```

---

### 8.10.3. ジェネリック型エイリアス

`type` 文を用いて、ジェネリック型エイリアスも作成できます：

```python
type ListOrSet[T] = list[T] | set[T]
```

これは概ね以下と同等です：

```python
annotation-def TYPE_PARAMS_OF_ListOrSet():
    T = typing.TypeVar("T")
    annotation-def VALUE_OF_ListOrSet():
        return list[T] | set[T]
    return typing.TypeAliasType("ListOrSet", VALUE_OF_ListOrSet(), type_params=(T,))
ListOrSet = TYPE_PARAMS_OF_ListOrSet()
```

ここでも `annotation-def` は注釈スコープを示し、大文字の名前は実際にはバインドされません。

---

_脚注_

[1] 例外は、`finally` 節が別の例外を発生させない限り、呼び出しスタックに伝播されます。もし `finally` 節で新たな例外が発生すれば、元の例外は失われます。

[2] パターンマッチングにおいて、シーケンスとは、以下のいずれかに該当するものです：

- `collections.abc.Sequence` を継承するクラス
- `collections.abc.Sequence` として登録された Python クラス
- 組み込みクラスで、（CPython の）`Py_TPFLAGS_SEQUENCE` フラグが設定されたもの
- 上記のいずれかを継承するクラス  
  標準ライブラリのシーケンスとしては、`array.array`、`collections.deque`、`list`、`memoryview`、`range`、`tuple` などがあります。  
  ※ ただし、`str`、`bytes`、`bytearray` はシーケンスパターンにはマッチしません。

[3] パターンマッチングにおいて、マッピングとは、以下のいずれかに該当するものです：

- `collections.abc.Mapping` を継承するクラス
- `collections.abc.Mapping` として登録された Python クラス
- 組み込みクラスで、（CPython の）`Py_TPFLAGS_MAPPING` フラグが設定されたもの
- 上記のいずれかを継承するクラス  
  標準ライブラリのマッピングとしては、`dict` や `types.MappingProxyType` などがあります。

[4] 関数本体の最初の文として現れる文字列リテラルは、その関数の `__doc__` 属性に変換され、ドックストリングとなります。

[5] クラス本体の最初の文として現れる文字列リテラルは、そのクラスの名前空間の `__doc__` 項目に変換され、クラスのドックストリングとなります。

---

© Copyright 2001-2025, Python Software Foundation  
このページは Python Software Foundation License Version 2 の下でライセンスされています。  
ドキュメント中の例、レシピ、その他のコードは Zero Clause BSD License の下で追加ライセンスされています。  
詳細は History and License を参照してください。

Python Software Foundation は非営利団体です。寄付をお願いします。

最終更新: 2025 年 2 月 28 日 (08:46 UTC)  
バグを発見しましたか？  
Sphinx 8.2.1 を使用して作成されています。

---

以上が、提供された「8. 複合文」章の日本語訳です。
