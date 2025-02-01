# SQL 基本文法ガイド

このガイドは、SQL の基本構文から応用的な内容までを体系的に学習できるようにまとめたものです。実際に pgAdmin などの GUI を利用して、SQL 文を入力しながら動作を確認してください。

## 目次

1. [はじめに](#はじめに)
2. [SQL の基本概念](#sql-の基本概念)
3. [基本構文](#基本構文)
   - [SELECT 文](#select-文)
   - [INSERT 文](#insert-文)
   - [UPDATE 文](#update-文)
   - [DELETE 文](#delete-文)
4. [テーブル定義（DDL）](#テーブル定義ddl)
5. [制約とキー](#制約とキー)
6. [条件指定とフィルタリング](#条件指定とフィルタリング)
7. [集約関数とグループ化](#集約関数とグループ化)
8. [結合（JOIN）の利用](#結合join-の利用)
9. [サブクエリ](#サブクエリ)
10. [ソートと制限](#ソートと制限)
11. [ビューとインデックス](#ビューとインデックス)
12. [トランザクション制御](#トランザクション制御)
13. [応用的なトピック](#応用的なトピック)
14. [PostgreSQL 固有の機能](#postgresql-固有の機能)
15. [まとめと練習問題](#まとめと練習問題)

---

## はじめに

SQL（Structured Query Language）は、リレーショナルデータベースを操作するための標準言語です。本ガイドでは、基本的な文法から始め、テーブル操作、データ操作、条件指定、結合、トランザクション、さらには応用的なトピックまでを学習します。

---

## SQL の基本概念

- **データベース**: データを整理・保管するためのシステム。
- **テーブル**: 行と列で構成されるデータの集合。
- **レコード（行）**: テーブル内の 1 件のデータ。
- **カラム（列）**: データの属性を示す項目。

---

## 基本構文

### SELECT 文

テーブルからデータを取得するための基本文です。

例:

    SELECT カラム1, カラム2
    FROM テーブル名
    WHERE 条件;

全件取得する場合:

    SELECT * FROM テーブル名;

### INSERT 文

テーブルに新しいデータを追加する文です。

例:

    INSERT INTO テーブル名 (カラム1, カラム2)
    VALUES ('値1', '値2');

### UPDATE 文

既存のレコードのデータを更新する文です。

例:

    UPDATE テーブル名
    SET カラム1 = '新しい値'
    WHERE 条件;

### DELETE 文

テーブルからレコードを削除する文です。

例:

    DELETE FROM テーブル名
    WHERE 条件;

---

## テーブル定義（DDL）

### CREATE TABLE 文

新しいテーブルを作成します。

例:

    CREATE TABLE 社員 (
        id SERIAL PRIMARY KEY,
        名前 VARCHAR(100) NOT NULL,
        年齢 INT,
        部署 VARCHAR(50)
    );

### ALTER TABLE 文

既存のテーブル構造を変更します。

例:

    ALTER TABLE 社員 ADD COLUMN 入社日 DATE;

### DROP TABLE 文

テーブルを削除します。

例:

    DROP TABLE IF EXISTS 社員;

---

## 制約とキー

テーブルにおけるデータの整合性を保つために制約を利用します。

- **PRIMARY KEY**: 各レコードを一意に識別するためのカラム。
- **FOREIGN KEY**: 他のテーブルのキーと関連付けるためのカラム。
- **UNIQUE**: 重複する値の入力を禁止する。
- **NOT NULL**: NULL 値の入力を禁止する。
- **CHECK**: 入力値が条件を満たしているかチェックする。

例:

    CREATE TABLE 注文 (
        注文ID SERIAL PRIMARY KEY,
        顧客ID INT NOT NULL,
        金額 DECIMAL(10,2) CHECK (金額 > 0)
    );

---

## 条件指定とフィルタリング

WHERE 句を使って特定の条件に合致するレコードを抽出します。  
主な演算子:

- =, <>, >, <, >=, <=
- BETWEEN … AND …
- IN (値 1, 値 2, …)
- LIKE （部分一致検索）
- IS NULL / IS NOT NULL

例:

    SELECT * FROM 社員
    WHERE 年齢 BETWEEN 30 AND 40;

    SELECT * FROM 社員
    WHERE 名前 LIKE '山%';

---

## 集約関数とグループ化

### 集約関数

複数のレコードに対して計算を行います。

- COUNT: 件数のカウント
- SUM: 合計値
- AVG: 平均値
- MIN / MAX: 最小値 / 最大値

例:

    SELECT COUNT(*) AS 社員数 FROM 社員;

### GROUP BY 句

特定のカラムでグループ化し、集約関数を利用します。

例:

    SELECT 部署, COUNT(*) AS 部署別社員数
    FROM 社員
    GROUP BY 部署;

HAVING 句はグループ化後の条件指定に使用します。

例:

    SELECT 部署, AVG(年齢) AS 平均年齢
    FROM 社員
    GROUP BY 部署
    HAVING AVG(年齢) > 30;

---

## 結合（JOIN）の利用

複数のテーブルから関連するデータを結合して取得します。

### 主な JOIN の種類

- **INNER JOIN**: 両方のテーブルで一致するレコードのみを取得。
- **LEFT JOIN（または LEFT OUTER JOIN）**: 左側のテーブルのすべてのレコードと、一致する右側のテーブルのレコード。
- **RIGHT JOIN（または RIGHT OUTER JOIN）**: 右側のテーブルのすべてのレコードと、一致する左側のテーブルのレコード。
- **FULL JOIN（または FULL OUTER JOIN）**: 両方のテーブルの全レコード。

例:

    SELECT 社員.名前, 部署.部署名
    FROM 社員
    INNER JOIN 部署 ON 社員.部署ID = 部署.部署ID;

---

## サブクエリ

クエリの中に別のクエリを埋め込むことで、複雑な条件を指定します。

### 単一行サブクエリ

例:

    SELECT 名前, 年齢
    FROM 社員
    WHERE 年齢 > (SELECT AVG(年齢) FROM 社員);

### 複数行サブクエリ

例:

    SELECT 名前
    FROM 社員
    WHERE 部署ID IN (SELECT 部署ID FROM 部署 WHERE 部署名 = '営業');

---

## ソートと制限

### ORDER BY 句

取得結果を特定のカラムでソートします。

例:

    SELECT * FROM 社員
    ORDER BY 年齢 DESC;

### LIMIT と OFFSET

取得するレコード数や開始位置を制限します。（PostgreSQL の場合）

例:

    SELECT * FROM 社員
    ORDER BY id
    LIMIT 10 OFFSET 20;

---

## ビューとインデックス

### ビュー（VIEW）

複雑なクエリを保存し、仮想テーブルとして扱います。

例:

    CREATE VIEW 営業社員 AS
    SELECT 名前, 年齢
    FROM 社員
    WHERE 部署ID = 1;

### インデックス（INDEX）

検索を高速化するための仕組みです。

例:

    CREATE INDEX idx_社員_名前 ON 社員(名前);

---

## トランザクション制御

複数の SQL 文を一括して実行し、処理の整合性を保つための仕組みです。

- BEGIN: トランザクションの開始
- COMMIT: 変更の確定
- ROLLBACK: 変更の取り消し

例:

    BEGIN;
    UPDATE 口座 SET 残高 = 残高 - 1000 WHERE 口座番号 = '123456';
    UPDATE 口座 SET 残高 = 残高 + 1000 WHERE 口座番号 = '654321';
    COMMIT;

---

## 応用的なトピック

### ストアドプロシージャと関数

データベースに保存されるプログラム（SQL や PL/pgSQL で記述）。

例（PostgreSQL の場合の簡単な関数）:

    CREATE OR REPLACE FUNCTION 加算(a INT, b INT)
    RETURNS INT AS $$
    BEGIN
        RETURN a + b;
    END;
    $$ LANGUAGE plpgsql;

### トリガー

特定のテーブル操作時に自動的に実行される処理を定義します。

例:

    CREATE TRIGGER 更新日時自動設定
    BEFORE UPDATE ON 社員
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();

---

## PostgreSQL 固有の機能

### シーケンスと SERIAL 型

自動連番の生成に利用します。  
例:

    CREATE TABLE 注文 (
        注文ID SERIAL PRIMARY KEY,
        顧客ID INT,
        金額 DECIMAL(10,2)
    );

### JSON データ型

JSON 形式のデータを格納・操作するためのデータ型。

例:

    CREATE TABLE ログ (
        id SERIAL PRIMARY KEY,
        データ JSONB
    );

### 拡張機能

PostgreSQL では多彩な拡張機能が利用可能です。  
例: PostGIS（地理空間データの管理）など。

---

## まとめと練習問題

### まとめ

- SQL はデータの取得、操作、定義、管理のための強力なツールです。
- 基本的な SELECT、INSERT、UPDATE、DELETE の理解は必須です。
- テーブル定義や制約、結合、サブクエリ、トランザクション制御など、各トピックを実際に手を動かして試してみることで理解が深まります。

### 練習問題

1. **基本操作の練習**

   - 自分用のテーブルを作成し、複数のレコードを INSERT してみよう。
   - INSERT 後、SELECT でデータが正しく取得できるか確認する。

2. **条件指定と集約**

   - 社員テーブルを作成し、部署ごとの平均年齢を計算するクエリを作成してみよう。
   - HAVING 句を用いて、平均年齢が 30 以上の部署のみを抽出してみる。

3. **結合の実践**

   - 2 つ以上のテーブルを作成し、INNER JOIN や LEFT JOIN を用いたクエリを実行して、正しくデータが結合されるか確認する。

4. **トランザクションの理解**
   - 2 つのテーブル間でデータの更新を行い、トランザクション制御（BEGIN, COMMIT, ROLLBACK）の効果を確認する。

このガイドに沿って、実際に SQL 文を入力しながら動作を確認することで、基礎から応用まで体系的に SQL を習得してください。
