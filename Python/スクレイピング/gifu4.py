import json
import requests
from bs4 import BeautifulSoup
import re
import time  # 処理を少し待つためのモジュール

# gifu2.jsonからclassidを読み込む
with open("./gifu2.json", "r", encoding="utf-8") as f:
    class_data = json.load(f)

# URLテンプレート
url_template = 'https://alss-portal.gifu-u.ac.jp/campusweb/slbssbdr.do?risyunen=2024&semekikn=1&kougicd={}'

# 項目ごとに分類するためのラベル
labels = [
    "開講年度", "授業科目名", "授業科目名（英文）", "担当教員", "科目開講学部・学科", "科目区分", 
    "科目分類", "対象学年", "開講学期・時間割・教室", "授業の形態", "単位", "履修コード", 
    "備考1", "シラバスURL", "科目ナンバリング", "授業概要", "到達すべき目標", "授業計画と準備学習", "授業の特色", 
    "学生のアクティブ・ラーニングを促す取組", "使用言語", "TA，SA等配置予定", "基盤的能力専門的能力", 
    "授業時間外の学習", "成績評価の方法", "到達度評価の観点", "テキスト", "テキスト(詳細)", 
    "参考文献", "参考文献(詳細)", "担当教員実務経験内容または実践的教育内容", "実践的授業内容等", "備考"
]

# classidごとに順番に処理
for item in class_data:
    if item['checked'] is False:  # checkedがfalseのものだけを処理
        classid = item['classid']
        url = url_template.format(classid)

        try:
            # URLからデータを取得
            response = requests.get(url)
            soup = BeautifulSoup(response.text, 'html.parser')

            # 特定のクラス名やIDで必要な部分だけを選択
            content = soup.find_all(class_='contents_1')

            # 抽出した部分のテキストだけを取得
            full_text = ""
            for elem in content:
                full_text += elem.get_text(strip=True) + "\n"

            # 項目ごとに分類して取得
            result = {"classid": classid}
            start_index = 0  # 読み込み開始位置を管理

            for i, label in enumerate(labels):
                next_label = labels[i+1] if i + 1 < len(labels) else None
                if next_label:
                    pattern = re.compile(re.escape(label) + r'(.*?)' + re.escape(next_label), re.DOTALL)
                else:
                    pattern = re.compile(re.escape(label) + r'(.*)', re.DOTALL)

                match = re.search(pattern, full_text[start_index:])
                if match:
                    value = match.group(1).strip()
                    result[label] = value
                    start_index += match.end()

            # 結果をgifu3.jsonに逐次的に保存
            try:
                with open("./gifu3.json", "r", encoding="utf-8") as f:
                    results = json.load(f)
            except FileNotFoundError:
                results = []

            results.append(result)

            with open("./gifu3.json", "w", encoding="utf-8") as f:
                json.dump(results, f, indent=4, ensure_ascii=False)

            # gifu2.jsonのcheckedをtrueに更新
            item['checked'] = True
            with open("./gifu2.json", "w", encoding="utf-8") as f:
                json.dump(class_data, f, indent=4, ensure_ascii=False)

            print(f"Processed {classid} successfully.")

            # 1秒待機（過剰なアクセスを防ぐ）
            time.sleep(1)

        except Exception as e:
            print(f"Error processing {classid}: {e}")
            continue
