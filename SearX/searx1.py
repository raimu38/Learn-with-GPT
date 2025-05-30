import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re

# SearXNG のエンドポイント（ローカルで動作している場合）
SEARXNG_URL = "http://localhost:8080/search"

# 1. SearXNG で「最新のAIニュース」を検索
params = {
    "q": "最新のAIニュース",
    "format": "json",
    "language": "ja",
    "categories": "news",
    "time_range": "day",
    "engines": "google,duckduckgo,brave"
}

headers = {
    "User-Agent": "Mozilla/5.0"
}

response = requests.get(SEARXNG_URL, params=params, headers=headers)
results = response.json().get("results", [])

if not results:
    print("検索結果が見つかりませんでした。")
    exit()

# 2. 上位1件の URL を取得
top_result = results[0]
title = top_result.get("title", "No Title")
url = top_result.get("url", "")

print(f"\n🔗 タイトル: {title}\n🌐 URL: {url}\n")

# 3. URL の HTML を取得
try:
    page = requests.get(url, headers=headers, timeout=10)
    page.raise_for_status()
except requests.RequestException as e:
    print(f"ページの取得中にエラーが発生しました: {e}")
    exit()

# 4. BeautifulSoup で本文テキストを抽出
soup = BeautifulSoup(page.text, "html.parser")
for script in soup(["script", "style", "noscript"]):
    script.decompose()

text = soup.get_text(separator="\n")
lines = [line.strip() for line in text.splitlines() if line.strip()]
content = "\n".join(lines)

# 5. 要点抽出（例として最初の5行を表示）
print("📝 要点抜粋:")
for line in lines[:5]:
    print(f"- {line}")

