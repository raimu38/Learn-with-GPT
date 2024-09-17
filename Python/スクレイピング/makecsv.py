import csv
import json

# gifu3.jsonからデータを読み込む
with open("./gifu3.json", "r", encoding="utf-8") as f:
    class_data = json.load(f)

# CSVに保存するファイル名
csv_file = './gifu4.csv'

# CSVファイルに書き込む
with open(csv_file, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)

    # ヘッダーを書き込む（JSONのキーを使用）
    headers = [
        "classid", "開講年度", "授業科目名", "授業科目名（英文）", "担当教員", "科目開講学部・学科", "科目区分", 
        "科目分類", "対象学年", "開講学期・時間割・教室", "授業の形態", "単位", "履修コード", 
        "備考1", "シラバスURL", "科目ナンバリング", "授業概要", "到達すべき目標", "授業計画と準備学習", "授業の特色", 
        "学生のアクティブ・ラーニングを促す取組", "使用言語", "TA，SA等配置予定", "基盤的能力専門的能力", 
        "授業時間外の学習", "成績評価の方法", "到達度評価の観点", "テキスト", "テキスト(詳細)", 
        "参考文献", "参考文献(詳細)", "担当教員実務経験内容または実践的教育内容", "実践的授業内容等", "備考"
    ]
    writer.writerow(headers)

    # 各授業データを書き込む
    for course in class_data:
        row = [course.get(header, "") for header in headers]
        writer.writerow(row)

print("gifu4.csv has been created.")

