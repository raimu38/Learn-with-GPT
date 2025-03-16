import json
import csv

# gifuISBN.jsonを読み込み
with open('gifuISBN.json', 'r', encoding='utf-8') as f:
    isbn_data_list = json.load(f)

# 最大のISBN数をカウント（列数を決めるため）
max_isbn_count = max(len(entry['isbn_data']) if 'isbn_data' in entry else 0 for entry in isbn_data_list)

# CSV用のヘッダーを動的に作成
fieldnames = ['classid']  # まずは classid
for i in range(1, max_isbn_count + 1):
    fieldnames.append(f'isbn{i}')
    fieldnames.append(f'isbn_url{i}')

# gifuISBN.csvに書き込み
with open('gifuISBN.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()  # ヘッダーを書き込み

    # ISBNデータをCSVに変換
    for entry in isbn_data_list:
        classid = entry['classid']
        row = {'classid': classid}
        
        # isbn_dataが存在する場合、それぞれのISBNとURLを対応する列に書き込み
        if 'isbn_data' in entry:
            for idx, isbn_entry in enumerate(entry['isbn_data'], start=1):
                row[f'isbn{idx}'] = isbn_entry['isbn']
                row[f'isbn_url{idx}'] = isbn_entry['isbn_url']

        # 書き込み
        writer.writerow(row)

print("gifuISBN.csvに変換完了しました。")