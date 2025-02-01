以下は、**SQL の書き順・実行順** の考え方を身につけながら学べる教材のサンプルドキュメントです。  
このドキュメントでは、あらかじめスーパーで販売される商品（肉、魚など）のリアルなデータを用意しているので、そのデータを使って SQL の各機能を学ぶことができます。

──────────────────────────────

# SQL ロジックを考えるためのドキュメント

**〜 正しい書き順・実行順を理解して、SQL を「ロジック」として組み立てよう！ 〜**

──────────────────────────────

## 1. はじめに

SQL は、単に文法を覚えるだけでなく、「どのデータをどう処理するか」という流れ（ロジック）で記述する言語です。  
そのため、**「書き順」**（実際にクエリを書くときの順番）と**「実行順」**（データベースが内部的に処理する順番）を理解することが非常に大切です。  
これを理解すると、複雑なクエリも「どの部分で何をやっているのか」が明確になり、自由に書けるようになります。

──────────────────────────────

## 2. サンプルデータの準備

ここでは、スーパーの商品データを題材としたテーブル `products` を作成します。  
このテーブルは、肉や魚といった生鮮食品のほか、価格、消費期限、賞味期限、国産・外国産の区別、割引率、バーコード情報など、できるだけ現実に近い形でデータを管理する想定です。

### 2.1 テーブル作成

以下の SQL で `products` テーブルを作成します。

```sql
CREATE TABLE products (
    id INT PRIMARY KEY,                  -- 商品ID
    product_name VARCHAR(100) NOT NULL,    -- 商品名
    category VARCHAR(50) NOT NULL,         -- カテゴリ（例: 肉、魚）
    price DECIMAL(10,2) NOT NULL,          -- 価格（円）
    discount DECIMAL(5,2) DEFAULT 0,       -- 割引率（%）
    country_of_origin VARCHAR(50) NOT NULL,-- 原産国（国産 / 外国産）
    expiration_date DATE,                  -- 消費期限
    best_before_date DATE,                 -- 賞味期限
    barcode VARCHAR(20) NOT NULL           -- バーコード番号
);
```

### 2.2 サンプルデータ挿入

次に、実際にいくつかの商品のデータを挿入します。

```sql
INSERT INTO products (id, product_name, category, price, discount, country_of_origin, expiration_date, best_before_date, barcode)
VALUES
  (1, '国産和牛ロース', '肉', 2500.00, 0.00, '国産', '2025-03-31', '2025-03-25', '4901234567890'),
  (2, '国産豚ロース', '肉', 1500.00, 10.00, '国産', '2025-02-28', '2025-02-20', '4901234567891'),
  (3, '輸入牛肉ステーキ', '肉', 3000.00, 5.00, '外国産', '2025-04-15', '2025-04-10', '4901234567892'),
  (4, 'サーモン切り身', '魚', 1200.00, 0.00, '外国産', '2025-01-20', '2025-01-18', '4901234567893'),
  (5, '国産鯛', '魚', 1800.00, 15.00, '国産', '2025-02-10', '2025-02-05', '4901234567894'),
  (6, '国産鶏もも', '肉', 800.00, 0.00, '国産', '2025-01-25', '2025-01-20', '4901234567895'),
  (7, '輸入エビ', '魚', 2000.00, 20.00, '外国産', '2025-03-10', '2025-03-05', '4901234567896'),
  (8, '国産鶏むね', '肉', 700.00, 0.00, '国産', '2025-01-30', '2025-01-25', '4901234567897');
```

このサンプルデータをもとに、さまざまな SQL のクエリを実践していきます。

──────────────────────────────

## 3. SQL の書き順と実行順

### 3.1 SQL の「書き順」

実際に SQL クエリを書くとき、下記のような順番で記述すると分かりやすいです。

1. **FROM**：どのテーブルのデータを扱うかを決定
2. **WHERE**：条件により、どの行（レコード）を選ぶかをフィルタリング
3. **GROUP BY**：必要なら、どの単位でデータをまとめるかを指定（集約処理用）
4. **SELECT**：最終的に取り出すカラムを指定
5. **ORDER BY**：（必要なら）結果をどのように並び替えるか

例として、**60 円以下の商品**の中で、カテゴリごとに件数を調べたい場合は、以下のように書きます。

```sql
SELECT category, COUNT(*)
FROM products
WHERE price <= 60
GROUP BY category
ORDER BY COUNT(*) DESC;
```

※ 上記は単なる例ですが、実際の数値（価格など）はサンプルデータに合わせてください。

### 3.2 SQL の「実行順」

データベースエンジンは、**書いた順番**ではなく、内部で**以下の順序**に従ってクエリを実行します。

| **実行順** | **SQL 句**                  | **処理内容**                                   |
| ---------- | --------------------------- | ---------------------------------------------- |
| 1.         | `FROM products`             | まず対象のテーブルからすべてのデータを読み込む |
| 2.         | `WHERE ...`                 | 条件に基づいて行をフィルタリング               |
| 3.         | `GROUP BY category`         | フィルタ後のデータを指定したカラムでグループ化 |
| 4.         | `SELECT category, COUNT(*)` | 各グループから取り出すカラムを決定             |
| 5.         | `ORDER BY COUNT(*) DESC`    | 必要に応じて、最終結果を並び替える             |

この実行順を理解することで、たとえば「なぜ `WHERE` が先に処理されるのか」や「集約関数は `GROUP BY` 後に評価されるのか」などが明確になります。

──────────────────────────────

## 4. 例題クエリで学ぶ SQL の考え方

以下、サンプルデータ（`products` テーブル）に対していくつかのクエリ例を紹介します。

### 4.1 基本的な SELECT

**すべての商品情報を表示する**

```sql
SELECT * FROM products;
```

### 4.2 条件付きのフィルタリング

**国産の商品だけを抽出する**

```sql
SELECT product_name, category, price, country_of_origin
FROM products
WHERE country_of_origin = '国産';
```

**賞味期限が 2025-02-01 より後の商品を抽出する**

```sql
SELECT product_name, best_before_date
FROM products
WHERE best_before_date > '2025-02-01';
```

### 4.3 部分一致検索

**商品名に「鶏」が含まれるものを表示する**

```sql
SELECT product_name, category
FROM products
WHERE product_name LIKE '%鶏%';
```

### 4.4 集約とグループ化

**カテゴリごとの商品件数を調べる**

```sql
SELECT category, COUNT(*) AS product_count
FROM products
GROUP BY category;
```

**カテゴリごとの平均価格を計算する**

```sql
SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category;
```

### 4.5 並び替え

**価格が高い順に商品一覧を表示する**

```sql
SELECT product_name, price
FROM products
ORDER BY price DESC;
```

### 4.6 複数の条件を組み合わせる

**国産かつ割引率が 0% でない商品を表示する**

```sql
SELECT product_name, price, discount, country_of_origin
FROM products
WHERE country_of_origin = '国産'
  AND discount > 0;
```

──────────────────────────────

## 5. SQL を考えるときの思考プロセス

SQL クエリを書くときは、以下のステップで考えると効果的です。

1. **対象データの決定 (`FROM`)**  
   「どのテーブルから情報を取るのか？」  
   例：`FROM products`

2. **条件による絞り込み (`WHERE`)**  
   「どのレコードを対象にするのか？」  
   例：`WHERE price <= 1500`

3. **データの集約・グループ化 (`GROUP BY`)**  
   「どの単位でまとめて集計するのか？」  
   例：`GROUP BY category`

4. **取り出す項目の指定 (`SELECT`)**  
   「最終的にどの情報が必要か？」  
   例：`SELECT category, COUNT(*)`

5. **結果の整形（並び替え、フィルタリングの後処理など） (`ORDER BY` など）**  
   例：`ORDER BY COUNT(*) DESC`

この流れを意識すれば、複雑なクエリも論理的に分解して組み立てられます。

──────────────────────────────

## 6. まとめ

- **SQL の書き順**は「FROM → WHERE → GROUP BY → SELECT → ORDER BY」と記述しますが、  
  **実際の実行順**は上記の順序でデータが処理されます。
- サンプルデータ（スーパー商品データ）をもとに、実際にクエリを打ちながら学ぶことで、SQL のロジックや流れが身につきやすくなります。
- このドキュメントの例題やクエリを参考に、まずは自分で条件や集約のパターンを変えたクエリを作ってみましょう。  
  わからない部分があれば、実行結果と照らし合わせながら「なぜこの順序なのか？」を考えると、理解が深まります。

これらを繰り返し実践することで、SQL を「ロジック」として考えながら自由自在にクエリが書けるようになり、成長のスピードもぐんとアップするはずです！

Happy SQL Coding!

以下は、products テーブルを使って SQL を学ぶためのさまざまな例をまとめた md ファイルの内容です。基本的な SELECT 文から、集計、CASE、サブクエリ、CTE、ウィンドウ関数を活用した応用的なクエリまで、長めのコード例も含めています。各例を自分の環境で試して、SQL の理解を深めてください。

# SQL Examples for Products Table

## 1. Basic SELECT Queries

### 1.1. 全件取得

シンプルに全てのカラム・全レコードを取得する例です。

```sql
SELECT \* FROM products;
```

### 1.2. 特定のカラムだけを取得

必要なカラムだけを選択する例です。

```sql
SELECT product_name, category, price FROM products;
```

## 2. Filtering and Sorting

### 2.1. カテゴリ「肉」の商品を価格順に取得

肉カテゴリーの商品を、価格の昇順に並べ替えています。

```sql
SELECT product_name, price
FROM products
WHERE category = '肉'
ORDER BY price ASC;
```

## 3. Aggregations

### 3.1. カテゴリごとの商品数をカウント

各カテゴリ内の商品数を集計する例です。

```sql
SELECT category, COUNT(\*) AS product_count
FROM products
GROUP BY category;
```

### 3.2. カテゴリごとの平均価格を計算

各カテゴリ内の平均価格を算出します。

```sql
SELECT category, AVG(price) AS average_price
FROM products
GROUP BY category;
```

## 4. Advanced Filtering with CASE

### 4.1. 価格に応じて「Expensive」か「Affordable」かを判定

CASE 式を使って、価格が 2000 円を超える場合「Expensive」、それ以外は「Affordable」と表示します。

```sql
SELECT product_name,
price,
CASE
WHEN price > 2000 THEN 'Expensive'
ELSE 'Affordable'
END AS price_category
FROM products;
```

## 5. Using Subqueries

### 5.1. 平均価格より高い商品を抽出

サブクエリを使って、全体の平均価格より高い商品のみを取得する例です。

```sql
SELECT product_name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);
```

## 6. Common Table Expressions (CTEs)

### 6.1. 割引額を計算し、一定額以上のものを抽出

CTE を利用して、各商品の割引額 (price \* discount / 100) を計算し、その金額が 100 円以上の商品のみを取得します。

```sql
WITH discount_cte AS (
SELECT id, product_name, price, discount,
price \* discount / 100 AS discount_amount
FROM products
)
SELECT id, product_name, price, discount, discount_amount
FROM discount_cte
WHERE discount_amount > 100;
```

## 7. Window Functions

### 7.1. 商品 ID 順に累積合計を計算

ウィンドウ関数を使って、id 順に価格の累積合計 (running total) を計算する例です。

```sql
SELECT id, product_name, price,
SUM(price) OVER (ORDER BY id) AS running_total
FROM products;
```

### 7.2. カテゴリ内で価格の順位を付ける

各カテゴリ内で、価格の降順でランク (順位) を算出します。

```sql
SELECT id, product_name, category, price,
RANK() OVER (PARTITION BY category ORDER BY price DESC) AS price_rank
FROM products;
```

## 8. Combining Multiple Concepts in a Longer Query

### 8.1. CTE、サブクエリ、ウィンドウ関数を組み合わせた複雑な例

以下のクエリは、まずカテゴリごとの統計情報 (平均、最小、最大価格) を CTE で計算し、別の CTE で各商品の割引額とカテゴリ内での価格順位を算出します。その後、両者を JOIN して、割引額が 100 円以上の商品の情報とカテゴリ統計情報を一緒に表示します。

```sql
WITH category_stats AS (
SELECT category,
AVG(price) AS avg_price,
MIN(price) AS min_price,
MAX(price) AS max_price
FROM products
GROUP BY category
),
discount_info AS (
SELECT id, product_name, category, price, discount,
price \* discount / 100 AS discount_amount,
RANK() OVER (PARTITION BY category ORDER BY price DESC) AS price_rank
FROM products
)
SELECT di.id, di.product_name, di.category, di.price, di.discount, di.discount_amount,
cs.avg_price, cs.min_price, cs.max_price, di.price_rank
FROM discount_info di
JOIN category_stats cs ON di.category = cs.category
WHERE di.discount_amount > 100
ORDER BY di.category, di.price_rank;
```

## 9. Update and Delete Examples

### 9.1. 特定商品の割引率を更新する

id = 3 の商品の割引率を 5.00% に更新する例です。

```sql
UPDATE products
SET discount = 5.00
WHERE id = 3;
```

### 9.2. 期限切れの商品を削除する

消費期限 (expiration_date) が現在日付より前になっている商品の削除例です。

```sql
DELETE FROM products
WHERE expiration_date < CURRENT_DATE;
```

---

以上の例は、products テーブルをさまざまな観点から操作するためのものです。これらを実際に試しながら、SQL の基本から応用までの知識を身につけてください。
