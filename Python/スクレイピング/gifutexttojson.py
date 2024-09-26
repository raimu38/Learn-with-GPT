import json
import re

def text_to_json(input_file, output_file, remaining_output_file):
    data_list = []
    remaining_data_list = []
    
    # テキストファイルを読み込み
    with open(input_file, 'r', encoding='utf-8') as file:
        for line in file:
            # タブでデータを分割（IDと数字列）
            parts = line.strip().split("\t")
            if len(parts) == 2:
                entry = {
                    "ID": parts[0],       # ID部分
                    "Number": parts[1]    # 元の数字列
                }
                
                # 978で始まる13桁の数字を正規表現で検索
                isbns = re.findall(r'978\d{10}', parts[1])
                
                # ISBNが見つかったら、ISBN1, ISBN2として追加
                remaining_text = parts[1]  # 残ったテキストを処理するための変数
                for i, isbn in enumerate(isbns):
                    entry[f"ISBN{i+1}"] = isbn
                    # 見つかったISBNを元のテキストから取り除く
                    remaining_text = remaining_text.replace(isbn, '', 1)

                # 2000から2023までの数字列を正規表現で検索して削除
                remaining_text = re.sub(r'20[0-2][0-9]', '', remaining_text)

                # 先頭が1で次の文字が4なら、1を削除する
                if len(remaining_text) > 1 and remaining_text[0] == '1' and remaining_text[1] == '4':
                    remaining_text = remaining_text[1:]  # 先頭の "1" を削除

                # 加工後の残りのテキストから4で始まる10桁の数字を正規表現で検索
                isbn_10 = re.findall(r'4\d{9}', remaining_text)

                # ISBN(10)が見つかった場合
                if isbn_10:
                    for i, isbn in enumerate(isbn_10):
                        entry[f"ISBN(10):{i+1}"] = isbn
                        # 見つかったISBN(10)を元のテキストから取り除く
                        remaining_text = remaining_text.replace(isbn, '', 1)
                
                # output_fileに追加
                data_list.append(entry)

                # 残ったテキストが10文字以上の場合、それをremaining_output_fileに保存
                if len(remaining_text) >= 10:
                    remaining_entry = {
                        "ID": parts[0],
                        "RemainingNumber": remaining_text
                    }
                    remaining_data_list.append(remaining_entry)
    
    # 正規のISBNおよびISBN(10)を保存したJSONファイルに書き込み
    with open(output_file, 'w', encoding='utf-8') as json_file:
        json.dump(data_list, json_file, ensure_ascii=False, indent=4)

    # 残ったテキストを保存したJSONファイルに書き込み
    with open(remaining_output_file, 'w', encoding='utf-8') as json_file:
        json.dump(remaining_data_list, json_file, ensure_ascii=False, indent=4)

# ファイル名を指定
input_file = "gifutext.txt"
output_file = "gifutext.json"
remaining_output_file = "gifutext02.json"

# 関数を実行してJSONファイルに変換
text_to_json(input_file, output_file, remaining_output_file)
print(f"データを {output_file} に保存しました。")
print(f"残ったテキストは {remaining_output_file} に保存しました。")