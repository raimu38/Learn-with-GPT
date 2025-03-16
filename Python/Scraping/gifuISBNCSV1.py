import json
import csv

# gifuISBN.jsonを読み込み
with open('gifuISBN.json', 'r', encoding='utf-8') as f:
    isbn_data_list = json.load(f)

# gifuISBN.csvに書き込み
with open('gifuISBN1.csv', 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['classid', 'isbn', 'isbn_url']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()  # ヘッダーを書き込み

    # ISBNデータをCSVに変換
    for entry in isbn_data_list:
        classid = entry['classid']
        if 'isbn_data' in entry:
            for isbn_entry in entry['isbn_data']:
                writer.writerow({
                    'classid': classid,
                    'isbn': isbn_entry['isbn'],
                    'isbn_url': isbn_entry['isbn_url']
                })
        else:
            writer.writerow({
                'classid': classid,
                'isbn': '',
                'isbn_url': ''
            })

print("gifuISBN.csvに変換完了しました。")