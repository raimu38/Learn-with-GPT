import requests
from bs4 import BeautifulSoup
import re

# URLからデータを取得する
url = 'https://alss-portal.gifu-u.ac.jp/campusweb/slbssbdr.do?risyunen=2024&semekikn=1&kougicd=1ABA00010'
response = requests.get(url)

# ページのHTMLをパース
soup = BeautifulSoup(response.text, 'html.parser')

# 特定のクラス名やIDで必要な部分だけを選択
content = soup.find_all(class_='contents_1')

# 抽出した部分のテキストだけを取得
full_text = ""
for item in content:
    full_text += item.get_text(strip=True) + "\n"

# 項目ごとに分類するためのラベル
labels = [
    "開講年度", "授業科目名", "授業科目名（英文）", "担当教員", "科目開講学部・学科", "科目区分", 
    "科目分類", "対象学年", "開講学期・時間割・教室", "授業の形態", "単位", "履修コード", 
    "備考1", "シラバスURL", "科目ナンバリング", "授業概要", "到達すべき目標", "授業計画と準備学習", "授業の特色", 
    "学生のアクティブ・ラーニングを促す取組", "使用言語", "TA，SA等配置予定", "基盤的能力専門的能力", 
    "授業時間外の学習", "成績評価の方法", "到達度評価の観点", "テキスト", "テキスト(詳細)", 
    "参考文献", "参考文献(詳細)", "担当教員実務経験内容または実践的教育内容", "実践的授業内容等", "備考"
]

# 項目ごとに分類して取得
result = {}
start_index = 0  # 読み込み開始位置を管理

for i, label in enumerate(labels):
    # 次のラベルがあればその前までを取得する
    next_label = labels[i+1] if i + 1 < len(labels) else None

    if next_label:
        # ラベルから次のラベルの前までのテキストを取得
        pattern = re.compile(re.escape(label) + r'(.*?)' + re.escape(next_label), re.DOTALL)
    else:
        # 最後の項目の場合はその後全部をキャッチ
        pattern = re.compile(re.escape(label) + r'(.*)', re.DOTALL)
    
    # 現在のstart_index以降で検索
    match = re.search(pattern, full_text[start_index:])
    
    if match:
        # 見つかった部分のテキストを結果に格納
        value = match.group(1).strip()
        result[label] = value
        
        # 見つけた部分の終了位置を次の開始位置とする
        start_index += match.end()

# 結果を表示
for key, value in result.items():
    print(f"{key}: {value}\n")




#  python3 -u "/Users/raimumiwa/Desktop/DEVELOP/Learn-with-GPT/Python/スクレイピング/gifu.py"