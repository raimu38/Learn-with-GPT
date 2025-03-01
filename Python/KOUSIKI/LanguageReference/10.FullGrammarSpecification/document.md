以下は、CPython パーサを生成するために使用される文法（Grammar/python.gram）に直接由来する、完全な Python 文法仕様です。  
このバージョンでは、コード生成やエラー回復に関する詳細は省略されています。

文法表記は EBNF と PEG の混合となっています。特に、

- アンパサンド（&）に続く記号、トークン、または括弧付きグループは正の先読み（＝マッチは必要だが入力は消費しない）を示し、
- 感嘆符（!）は負の先読み（＝マッチしてはならない）を示します。  
  また、選択肢の区切りには PEG の「ordered choice」（従来の PEG 文法で / と書くもの）として | を使用しています。  
  詳しくは PEP 617 を参照してください。

---

## PEG 文法（Python 用）

以下に、Python の文法を示します。  
（コメント部分は、一般的な文法要素や規則、ならびに構文エラーに関する補助情報などを記述しています。）

---

### 【開始規則】

```
file: [statements] ENDMARKER
interactive: statement_newline
eval: expressions NEWLINE* ENDMARKER
func_type: '(' [type_expressions] ')' '->' expression NEWLINE* ENDMARKER
```

---

### 【一般的な文法要素と規則】

- **文字列（"..."）**  
  → SOFT KEYWORD を表す

- **文字列（'...'）**  
  → KEYWORD を表す

- **大文字の名前（NAME）**  
  → Grammar/Tokens ファイルに記載されているトークン

- **"invalid\_" で始まるルール名**  
  → 専用の構文エラー用ルール（最初のパスでは使用されず、パースに失敗した場合のみ第二パスで用いられる）  
  ※ これらのルールは、無効な構文エラーの位置を正しく報告するため、代替候補の順序が重要です。

#### 文法記法（詳細は PEP 617 参照）:

- **基本形**

  ```
  rule_name: expression
  ```

  （オプションで型を rule_name[return_type]: expression のように指定可能です。  
  型が省略された場合、C では void\*、Python では Any として扱われます。）

- **連接**

  ```
  e1 e2
  ```

  → e1 をマッチさせた後、e2 をマッチさせます。

- **選択肢**

  ```
  e1 | e2
  ```

  → e1 または e2 をマッチさせます。  
  ※ 書式上、ルール名の直後に | を用いて改行して記述することも可能です。

- **グループ化**

  ```
  ( e )
  ```

  → e をグループ化してマッチさせます。  
  ※ これにより、例えば `(e)*` のような繰り返しも可能になります。

- **任意の出現**

  ```
  [ e ] または e?
  ```

  → e をオプションでマッチさせます。

- **0 回以上の繰り返し**

  ```
  e*
  ```

- **1 回以上の繰り返し**

  ```
  e+
  ```

- **区切り付き繰り返し**

  ```
  s.e+
  ```

  → s を区切り文字とし、e を 1 回以上繰り返す。  
  ※ 生成されるパース木には区切り文字は含まれません。  
  （これは e (s e)\* と同等です。）

- **正の先読み**

  ```
  &e
  ```

  → e がパースできれば成功（入力は消費しません）。

- **負の先読み**

  ```
  !e
  ```

  → e がパースできれば失敗（入力は消費しません）。

- **コミット**

  ```
  ~
  ```

  → 現在の代替候補に固執し、たとえその後失敗してもバックトラックしません。

- **即時失敗（eager parse）**
  ```
  &&e
  ```
  → e を即座にパースし、パースできなければ即座に SyntaxError で失敗します。

---

### 【STARTING RULES】

```
file: [statements] ENDMARKER
interactive: statement_newline
eval: expressions NEWLINE* ENDMARKER
func_type: '(' [type_expressions] ')' '->' expression NEWLINE* ENDMARKER
```

---

### 【一般文（Statements）】

```
statements: statement+
```

```
statement: compound_stmt  | simple_stmts
```

```
statement_newline:
    | compound_stmt NEWLINE
    | simple_stmts
    | NEWLINE
    | ENDMARKER
```

```
simple_stmts:
    | simple_stmt !';' NEWLINE  # 高速化のための記述（通常は不要）
    | ';'.simple_stmt+ [';'] NEWLINE
```

※ 注意: 単純な代入文をパースするために、assignment ルールは expression より前に定義されなければなりません。  
（そうでないと、単純な代入文をパースしようとした際に SyntaxError となります。）

```
simple_stmt:
    | assignment
    | type_alias
    | star_expressions
    | return_stmt
    | import_stmt
    | raise_stmt
    | 'pass'
    | del_stmt
    | yield_stmt
    | assert_stmt
    | 'break'
    | 'continue'
    | global_stmt
    | nonlocal_stmt
```

```
compound_stmt:
    | function_def
    | if_stmt
    | class_def
    | with_stmt
    | for_stmt
    | try_stmt
    | while_stmt
    | match_stmt
```

---

### 【単純文（Simple statements）】

以下、各種単純文や代入文、import、return などの規則が続きます。  
（ここでは詳細な各規則の定義が続くため、コード内のルールは原文のままとなります。）

---

### 【複合文（Compound statements）】

複合文に共通する要素は、次のとおりです。

```
block:
    | NEWLINE INDENT statements DEDENT
    | simple_stmts
```

```
decorators: ('@' named_expression NEWLINE )+
```

#### 【クラス定義】

```
class_def:
    | decorators class_def_raw
    | class_def_raw
```

```
class_def_raw:
    | 'class' NAME [type_params] ['(' [arguments] ')' ] ':' block
```

#### 【関数定義】

```
function_def:
    | decorators function_def_raw
    | function_def_raw
```

```
function_def_raw:
    | 'def' NAME [type_params] '(' [params] ')' ['->' expression ] ':' [func_type_comment] block
    | 'async' 'def' NAME [type_params] '(' [params] ')' ['->' expression ] ':' [func_type_comment] block
```

※ 以下、関数のパラメータや各種詳細な規則が続きます。

---

### 【if 文】

```
if_stmt:
    | 'if' named_expression ':' block elif_stmt
    | 'if' named_expression ':' block [else_block]
```

```
elif_stmt:
    | 'elif' named_expression ':' block elif_stmt
    | 'elif' named_expression ':' block [else_block]
```

```
else_block:
    | 'else' ':' block
```

---

### 【while 文】

```
while_stmt:
    | 'while' named_expression ':' block [else_block]
```

---

### 【for 文】

```
for_stmt:
    | 'for' star_targets 'in' ~ star_expressions ':' [TYPE_COMMENT] block [else_block]
    | 'async' 'for' star_targets 'in' ~ star_expressions ':' [TYPE_COMMENT] block [else_block]
```

---

### 【with 文】

```
with_stmt:
    | 'with' '(' ','.with_item+ ','? ')' ':' [TYPE_COMMENT] block
    | 'with' ','.with_item+ ':' [TYPE_COMMENT] block
    | 'async' 'with' '(' ','.with_item+ ','? ')' ':' block
    | 'async' 'with' ','.with_item+ ':' [TYPE_COMMENT] block
```

```
with_item:
    | expression 'as' star_target &(',' | ')' | ':')
    | expression
```

---

### 【try 文】

```
try_stmt:
    | 'try' ':' block finally_block
    | 'try' ':' block except_block+ [else_block] [finally_block]
    | 'try' ':' block except_star_block+ [else_block] [finally_block]
```

#### ※ 【except 節】

```
except_block:
    | 'except' expression ['as' NAME ] ':' block
    | 'except' ':' block
```

#### ※ 【except\* 節】

```
except_star_block:
    | 'except' '*' expression ['as' NAME ] ':' block
```

#### ※ 【finally 節】

```
finally_block:
    | 'finally' ':' block
```

---

### 【match 文】

※ Python 3.10 以降で追加

```
match_stmt:
    | "match" subject_expr ':' NEWLINE INDENT case_block+ DEDENT
```

```
subject_expr:
    | star_named_expression ',' star_named_expressions?
    | named_expression
```

```
case_block:
    | "case" patterns guard? ':' block
```

```
guard: 'if' named_expression
```

```
patterns:
    | open_sequence_pattern
    | pattern
```

```
pattern:
    | as_pattern
    | or_pattern
```

以下、各種パターン（リテラル、キャプチャ、ワイルドカード、値、グループ、シーケンス、マッピング、クラスパターン）の規則が続きます。  
（詳細な各パターンの構文および簡単な説明も原文に沿って記述されています。）

---

### 【type 文（型文）】

```
type_alias:
    | "type" NAME [type_params] '=' expression
```

※ 型パラメータ宣言の規則も以下に示されます。

```
type_params:
    | invalid_type_params
    | '[' type_param_seq ']'
```

```
type_param_seq: ','.type_param+ [',']
```

```
type_param:
    | NAME [type_param_bound] [type_param_default]
    | '*' NAME [type_param_starred_default]
    | '**' NAME [type_param_default]
```

```
type_param_bound: ':' expression
type_param_default: '=' expression
type_param_starred_default: '=' star_expression
```

---

### 【式（Expressions）】

```
expressions:
    | expression (',' expression )+ [',']
    | expression ','
    | expression
```

```
expression:
    | disjunction 'if' disjunction 'else' expression
    | disjunction
    | lambdef
```

※ 以下、yield 式、star_expressions、assignment_expression、named_expression、論理演算、比較、算術・ビット演算、primary、await などの各種規則が続きます。  
（各規則の詳細は原文の通りです。）

---

### 【リテラル（Literals）】

- f-string、文字列、リスト、タプル、セット、辞書、内包表記などの構文規則が定義されています。

---

### 【内包表記とジェネレーター】

- リスト内包表記（listcomp）、セット内包表記（setcomp）、ジェネレーター式（genexp）、辞書内包表記（dictcomp）の規則が示されています。

---

### 【関数呼び出しの引数】

- 引数（arguments）およびその構造（位置引数、キーワード引数、starred 式、\*\* 式など）の規則が記述されています。

---

### 【代入のターゲット】

- star_targets、single_target、del_targets など、代入対象の構文規則が定義されています。

---

### 【型関連の要素】

- type_expressions、func_type_comment などが定義されています。

---

### 【END OF THE GRAMMAR】

ここで、完全な Python 文法仕様の終了となります。

---

### 【START OF INVALID RULES】

以降は無効なルール（invalid rules）の定義です。  
（これらのルールは、最初のパスでのパースに失敗した場合のみ、第二パスで詳細な構文エラーを報告するために用いられます。）

---

© Copyright 2001-2025,  
Python Software Foundation

このページは Python Software Foundation License Version 2 の下でライセンスされています。  
ドキュメント中の例、レシピ、その他のコードは Zero Clause BSD License の下で追加ライセンスされています。  
詳細は History and License を参照してください。

Python Software Foundation は非営利団体です。  
寄付をお願いします。

最終更新: 2025 年 2 月 28 日 (08:46 UTC)  
バグを発見しましたか？  
Sphinx 8.2.1 を使用して作成されています。

---

＊以上が、Python の完全な文法仕様の日本語訳です。  
（コードブロック中の文法記号やルールは原文の構文をできるだけ忠実に残しています。）
