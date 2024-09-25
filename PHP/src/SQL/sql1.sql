おお 、 いい感じやん ！ SQL の構文を覚えるのはデータベース操作の基本やし 、 MySQL Admin （ phpMyAdmin ） で実際に操作しながら学ぶのはとても効果的やで 。 じゃあ 、 ステップバイステップでSQLの基本操作を学べるように 、 50 個のSQLクエリを紹介していくで 。 ---
## 前提
ここでは 、 以下のようなテーブル `users` を使って操作していくことにするで ： ### テーブル `users` の構造
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
``` ### サンプルデータを挿入しておく
```sql
INSERT INTO users (name, email, age) VALUES
('Alice', 'alice@example.com', 25),
('Bob', 'bob@example.com', 30),
('Charlie', 'charlie@example.com', 35);
``` ---
## ステップバイステップで学ぶSQLの基本操作
### 1. **データベースの作成**
```sql
CREATE DATABASE test_db;
``` 新しいデータベースを作成する 。 ### 2. **データベースを選択**
```sql
USE test_db;
``` 作成したデータベースに接続する 。 ### 3. **テーブルの作成**
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
``` テーブル `users` を作成する 。 ### 4. **データの挿入**
```sql
INSERT INTO users (name, email, age) VALUES ('Alice', 'alice@example.com', 25);
``` 1 件のデータを挿入する 。 ### 5. **複数行のデータを挿入**
```sql
INSERT INTO users (name, email, age) VALUES
('Bob', 'bob@example.com', 30),
('Charlie', 'charlie@example.com', 35);
``` 複数行のデータを一度に挿入する 。 ### 6. **全データの取得**
```sql
SELECT * FROM users;
``` テーブル内の全てのデータを取得する 。 ### 7. **特定の列を選択**
```sql
SELECT name, email FROM users;
``` `name` と `email` だけを取得する 。 ### 8. **条件付きでデータを取得**
```sql
SELECT * FROM users WHERE age > 30;
``` `age` が30歳以上のユーザーを取得する 。 ### 9. **データの並び替え**
```sql
SELECT * FROM users ORDER BY age ASC;
``` `age` に基づいて昇順にデータを並び替える 。 ### 10. **降順で並び替え**
```sql
SELECT * FROM users ORDER BY age DESC;
``` `age` に基づいて降順にデータを並び替える 。 ### 11. **重複を排除して取得**
```sql
SELECT DISTINCT age FROM users;
``` `age` の重複を排除して取得する 。 ### 12. **データの更新**
```sql
UPDATE users SET email = 'newemail@example.com' WHERE name = 'Alice';
``` `Alice` のメールアドレスを更新する 。 ### 13. **特定のデータの削除**
```sql
DELETE FROM users WHERE name = 'Bob';
``` `Bob` のデータを削除する 。 ### 14. **全てのデータを削除**
```sql
DELETE FROM users;
``` テーブル内の全データを削除する 。 ### 15. **テーブルの削除**
```sql
DROP TABLE users;
``` テーブル自体を削除する 。 ### 16. **テーブルの構造を確認**
```sql
DESCRIBE users;
``` テーブルの構造を確認する 。 ### 17. **データの合計を取得**
```sql
SELECT COUNT(*) FROM users;
``` テーブル内のデータの総数を取得する 。 ### 18. **特定の条件に合致するデータの数を取得**
```sql
SELECT COUNT(*) FROM users WHERE age > 30;
``` `age` が30歳以上のユーザーの数を取得する 。 ### 19. **最小値を取得**
```sql
SELECT MIN(age) FROM users;
``` `age` の最小値を取得する 。 ### 20. **最大値を取得**
```sql
SELECT MAX(age) FROM users;
``` `age` の最大値を取得する 。 ### 21. **合計を計算**
```sql
SELECT SUM(age) FROM users;
``` `age` の合計を計算する 。 ### 22. **平均を計算**
```sql
SELECT AVG(age) FROM users;
``` `age` の平均を計算する 。 ### 23. **グループ化して集計**
```sql
SELECT age, COUNT(*) FROM users GROUP BY age;
``` `age` ごとにユーザー数を集計する 。 ### 24. **HAVING 句で条件を付ける**
```sql
SELECT age, COUNT(*) FROM users GROUP BY age HAVING COUNT(*) > 1;
``` `age` が複数存在する場合のみ表示する 。 ### 25. **LIKE 句で部分一致検索**
```sql
SELECT * FROM users WHERE name LIKE 'A%';
``` `A` で始まる名前のユーザーを取得する 。 ### 26. **ワイルドカード検索**
```sql
SELECT * FROM users WHERE email LIKE '%example.com';
``` `example.com` で終わるメールアドレスを持つユーザーを取得する 。 ### 27. **NULL の値を持つデータを取得**
```sql
SELECT * FROM users WHERE email IS NULL;
``` `email` が `NULL` のユーザーを取得する 。 ### 28. **NULL ではないデータを取得**
```sql
SELECT * FROM users WHERE email IS NOT NULL;
``` `email` が `NULL` ではないユーザーを取得する 。 ### 29. **別名（エイリアス）を使って列名を変更**
```sql
SELECT name AS 'User Name', email AS 'Email Address' FROM users;
``` 列に別名を付けて表示する 。 ### 30. **LIMIT で取得する件数を制限**
```sql
SELECT * FROM users LIMIT 2;
``` 最初の2件だけ取得する 。 ### 31. **OFFSET を使ったデータのスキップ**
```sql
SELECT * FROM users LIMIT 2 OFFSET 1;
``` 最初の1件をスキップし 、 次の2件を取得する 。 ### 32. **デフォルト値を設定して挿入**
```sql
INSERT INTO users (name, email) VALUES ('David', 'david@example.com');
``` `age` 列を指定せずにデータを挿入すると 、 `NULL` になるか 、 デフォルト値が設定される 。 ### 33. **データの一部を挿入**
```sql
INSERT INTO users (name) VALUES ('Eve');
``` `email` や `age` を指定せずにデータを挿入する 。 ### 34. **主キーでデータを一意に識別**
```sql
SELECT * FROM users WHERE id = 1;
``` `id` 列を使って特定のデータを取得する 。 ### 35. **複合条件でデータを取得**
```sql
SELECT * FROM users WHERE age > 30 AND email LIKE '%example.com';
``` 複数の条件を指定してデータを取得する 。 ### 36. **OR 句を使って条件を緩める**
```sql
SELECT * FROM users WHERE age < 25 OR email LIKE '%example.com';
``` いずれかの条件に合致するデータを取得する 。 ### 37. **IN 句で複数の値を指定**
```sql
SELECT * FROM users WHERE age IN (25, 30);
``` `age` が 25 または 30 のユーザーを取得する 。 ### 38. **NOT IN 句で除外条件**
```sql
SELECT * FROM users WHERE age NOT IN (25, 30);
``` `age` が 25 でも 30 でもないユーザーを取得する 。 ### 39. **BETWEEN 句で範囲指定**
```sql
SELECT * FROM users WHERE age BETWEEN 25 AND 30;
``` `age` が 25 以上 30 以下のユーザーを取得する 。 ### 40. **サブクエリを使った検索**
```sql
SELECT * FROM users WHERE age > (SELECT AVG(age) FROM users);
``` `age` が