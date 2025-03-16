import json
import re

# gifuISBNdetail.json を読み込む
with open("./gifuISBNdetail.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# ISBNの後ろに余分な文字列がある場合、それを削除する関数
def clean_isbn_url(isbn_url):
    # ISBN部分だけ取得し、「-C」や「C」以降の部分を削除
    cleaned_isbn = re.sub(r"[-\s]*C.*$", "", isbn_url)
    return cleaned_isbn

# データ構造を再帰的に処理する関数
def clean_isbn_urls(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if key == "isbn_url" and isinstance(value, str):
                data[key] = clean_isbn_url(value)
            elif isinstance(value, (dict, list)):
                clean_isbn_urls(value)
    elif isinstance(data, list):
        for item in data:
            clean_isbn_urls(item)

# ISBN URL をクリーンアップする
clean_isbn_urls(data)

# 変更されたデータを gifuISBNdetail_cleaned.json として保存
with open("./gifuISBNdetail_cleaned.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print("ISBN URLs have been cleaned and saved to gifuISBNdetail_cleaned.json.")