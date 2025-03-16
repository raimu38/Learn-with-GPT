import json
import aiohttp
import asyncio
from bs4 import BeautifulSoup

# gifu2.jsonからclassidを読み込む
with open("./gifu2.json", "r") as f:
    class_data = json.load(f)

# 処理する最大件数を設定
max_process_count = 500

# まだ処理されていないデータを最大max_process_count件取得
class_data_to_process = [item for item in class_data if item['checked'] is False][:max_process_count]

# URLテンプレート
url_template = 'https://alss-portal.gifu-u.ac.jp/campusweb/slbssbdr.do?risyunen=2024&semekikn=1&kougicd={}'

# gifuISBN.jsonの既存データを読み込む
try:
    with open("./gifuISBN.json", "r", encoding="utf-8") as f:
        data = f.read().strip()  # 空行も削除
        isbn_data_list = json.loads(data) if data else []  # 空のファイルならリストを初期化
except (FileNotFoundError, json.JSONDecodeError):
    isbn_data_list = []  # ファイルがない、またはJSONが壊れている場合は新しくリストを作成

# 非同期リクエストを使ってURLのデータを取得する関数
async def fetch_data(session, classid):
    url = url_template.format(classid)
    try:
        async with session.get(url) as response:
            if response.status == 200:  # ステータスコード200（成功）なら実行
                print(f"Fetching data for classid {classid} - Status: {response.status}")
                return await response.text()
            else:
                print(f"Failed to fetch data for classid {classid} - Status: {response.status}")
                return None
    except aiohttp.ClientError as e:
        print(f"Error fetching data for classid {classid}: {e}")
        return None

# HTMLをパースして複数のISBNとURLを抽出する関数
def extract_isbn(html, classid):
    if not html:
        print(f"No HTML content for classid {classid}")
        return None

    # BeautifulSoupでHTMLをパース
    soup = BeautifulSoup(html, 'html.parser')

    # <td>内の全ての<a>タグを探してISBNとURLを抽出
    isbn_entries = []
    cells = soup.find_all('td', class_='cell_border_y')
    for cell in cells:
        a_tags = cell.find_all('a', href=True)
        for a_tag in a_tags:
            if 'isbn' in a_tag['href']:  # 'isbn' がリンクに含まれているか確認
                isbn = a_tag.text.strip()  # ISBNを取得
                isbn_url = a_tag['href']  # URLを取得
                print(f"Found ISBN for classid {classid}: {isbn}, URL: {isbn_url}")  # 抽出されたISBNとURLを表示
                isbn_entries.append({
                    "isbn": isbn,
                    "isbn_url": isbn_url,  # 抽出したURLを保存
                })

    # ISBNが見つからなかった場合
    if not isbn_entries:
        print(f"No ISBN found for classid {classid}")
        return {"classid": classid, "isbn": "", "isbn_url": ""}  # 空のデータを返す

    return {"classid": classid, "isbn_data": isbn_entries}  # ISBNデータをリストで返す

# 非同期で複数のクラスデータを処理
async def process_class_data():
    async with aiohttp.ClientSession() as session:
        tasks = []
        for item in class_data_to_process:
            classid = item['classid']
            tasks.append(fetch_data(session, classid))

        # 全てのタスクを実行
        responses = await asyncio.gather(*tasks)

        # ISBNを抽出して結果を保存
        for html, item in zip(responses, class_data_to_process):
            classid = item['classid']
            if html is None:
                print(f"Skipping classid {classid} due to previous error.")
                continue

            isbn_entry = extract_isbn(html, classid)  # ISBN抽出
            isbn_data_list.append(isbn_entry)  # 空白の場合も含めてデータを追加

            # gifuISBN.jsonに1件ずつ保存していく
            with open("./gifuISBN.json", "w", encoding="utf-8") as f:
                json.dump(isbn_data_list, f, indent=4, ensure_ascii=False)

            # gifu2.jsonのcheckedをtrueに更新
            for obj in class_data:
                if obj['classid'] == classid:
                    obj['checked'] = True

            # gifu2.jsonの更新
            with open("./gifu2.json", "w", encoding="utf-8") as f:
                json.dump(class_data, f, indent=4, ensure_ascii=False)

            # 成功メッセージの表示
            print(f"classid {classid} success")

# 非同期の処理を開始
asyncio.run(process_class_data())

# 完了メッセージ
print("gifuISBN.json has been updated and gifu2.json has been saved.")