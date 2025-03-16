import json
import aiohttp
import asyncio
from bs4 import BeautifulSoup

# gifuISBNdetail.jsonの読み込み
with open("./gifuISBNdetail.json", "r", encoding="utf-8") as f:
    class_data = json.load(f)

# 非同期リクエストを使ってURLのデータを取得する関数
async def fetch_data(session, url):
    try:
        async with session.get(url) as response:
            if response.status == 200:  # ステータスコード200（成功）なら実行
                return await response.text()
            else:
                print(f"Failed to fetch data from {url} - Status: {response.status}")
                return None
    except aiohttp.ClientError as e:
        print(f"Error fetching data from {url}: {e}")
        return None

# HTMLをパースして画像URL、AmazonのURL、タイトルを抽出する関数
def extract_details(html):
    soup = BeautifulSoup(html, 'html.parser')

    # 画像のURLを取得
    coverart_div = soup.find('div', id='xc-search-full-left')
    image_url = ""
    amazon_url = ""
    title = ""

    if coverart_div:
        a_tag = coverart_div.find('a', href=True)
        if a_tag:
            image_url = a_tag['href']  # 画像のURL
            title = a_tag['title']  # タイトル

    # AmazonのURLを取得
    amazon_a_tag = soup.find('a', href=True, text=">> Amazon.co.jp")
    if amazon_a_tag:
        amazon_url = amazon_a_tag['href']

    return {
        "ImageURI": image_url,
        "AmazonURL": amazon_url,
        "Title": title
    }

# 非同期で複数のクラスデータを処理
async def process_class_data():
    async with aiohttp.ClientSession() as session:
        tasks = []
        # isbn_urlがあるものを対象に処理を行う
        for item in class_data:
            if "isbn_data" in item:
                for isbn_entry in item["isbn_data"]:
                    isbn_url = isbn_entry.get("isbn_url")
                    if isbn_url:  # isbn_urlが存在する場合
                        tasks.append(fetch_data(session, isbn_url))

        # 全てのタスクを実行
        responses = await asyncio.gather(*tasks)

        # 取得したデータを元にgifuISBNdetail.jsonに付け足す
        idx = 0
        for item in class_data:
            if "isbn_data" in item:
                for isbn_entry in item["isbn_data"]:
                    isbn_url = isbn_entry.get("isbn_url")
                    if isbn_url and idx < len(responses) and responses[idx]:
                        details = extract_details(responses[idx])
                        # 取得したデータを追記
                        isbn_entry.update(details)
                        idx += 1

        # 更新後のデータを保存
        with open("./gifuISBNdetail_updated.json", "w", encoding="utf-8") as f:
            json.dump(class_data, f, indent=4, ensure_ascii=False)

# 非同期の処理を開始
asyncio.run(process_class_data())

# 完了メッセージ
print("gifuISBNdetail.json has been updated and saved as gifuISBNdetail_updated.json.")