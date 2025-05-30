import requests

# SearXNG から検索結果を取得
query = "LangChain"
response = requests.get(
    "http://localhost:8080/search",
    params={"q": query, "format": "json"},
    headers={
        "User-Agent": "Mozilla/5.0"
    }
)

results = response.json().get("results", [])

# 必要な情報だけ抽出（タイトル & URL）
filtered_results = [
    {"title": item.get("title", ""), "url": item.get("url", "")}
    for item in results
]

# 確認
for item in filtered_results:
    print(f"- {item['title']}\n  {item['url']}\n")

