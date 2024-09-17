import json
import requests
from bs4 import BeautifulSoup
import re

# gifu2.jsonからclassidを読み込む
with open("./gifu2.json", "r") as f:
    class_data = json.load(f)

# 処理する最大件数を設定
max_process_count = 1000

# まだ処理されていないデータを最大max_process_count件取得
class_data_to_process = [item for item in class_data if item['checked'] is False][:max_process_count]

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

# gifu3.jsonの既存データを読み込む
try:
    with open("./gifu3.json", "r", encoding="utf-8") as f:
        data = f.read().strip()  # 空行も削除
        results = json.loads(data) if data else []  # 空のファイルならリストを初期化
except (FileNotFoundError, json.JSONDecodeError):
    results = []  # ファイルがない、またはJSONが壊れている場合は新しくリストを作成

# classidごとに処理を実行
for item in class_data_to_process:
    classid = item['classid']
    url = url_template.format(classid)
    
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
    found_course_name = False  # 授業科目名を一度見つけたかどうかのフラグ

    for i, label in enumerate(labels):
        next_label = labels[i+1] if i + 1 < len(labels) else None

        if label == "開講年度":
            # 開講年度を取得
            pattern = re.escape(label) + r'\s*(\d{4})'
            match = re.search(pattern, full_text[start_index:], re.DOTALL)
            if match:
                result["開講年度"] = match.group(1).strip()
                start_index = match.end()
                continue  # 次に進む

        if label == "授業科目名" and not found_course_name:
            # 最初に授業科目名をキャッチ
            pattern = re.escape(label) + r'\s*(.*?)\s*(?=授業科目名)'
            match = re.search(pattern, full_text[start_index:], re.DOTALL)
            if match:
                result["授業科目名"] = match.group(1).strip()
                start_index = match.end()
                found_course_name = True  # 授業科目名を見つけたのでフラグを立てる
                continue  # 次に進む

        if label == "授業科目名（英文）" and found_course_name:
            # 2回目の授業科目名を英文としてキャッチ
            pattern = re.escape("授業科目名（英文）") + r'\s*(.*?)\s*(?=担当教員)'
            match = re.search(pattern, full_text[start_index:], re.DOTALL)
            if match:
                result["授業科目名（英文）"] = match.group(1).strip()
                start_index = match.end()
                continue  # 次に進む

        # 通常のラベルの処理
        if next_label:
            pattern = re.escape(label) + r'\s*(.*?)\s*' + re.escape(next_label)
        else:
            pattern = re.escape(label) + r'\s*(.*)'

        match = re.search(pattern, full_text[start_index:], re.DOTALL)
        if match:
            value = match.group(1).strip()
            result[label] = value
            # マッチした最後の位置までstart_indexを更新
            start_index = match.end()

    # 結果を保存
    results.append(result)

    # gifu3.jsonに1件ずつ保存していく
    with open("./gifu3.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=4, ensure_ascii=False)

    # gifu2.jsonのcheckedをtrueに更新
    for obj in class_data:
        if obj['classid'] == classid:
            obj['checked'] = True

    # gifu2.jsonの更新
    with open("./gifu2.json", "w", encoding="utf-8") as f:
        json.dump(class_data, f, indent=4, ensure_ascii=False)

    # 成功メッセージの表示
    print(f"classid {classid} success")

# 完了メッセージ
print("gifu3.json has been updated and gifu2.json has been saved.")
