import requests

res = requests.get("http://0.0.0.0:8000")

print(res.status_code)
print(res.text)

res = requests.get("http://0.0.0.0:8000/items/?skip=1&limit=20")
print(res.status_code)
print(res.text)

res = requests.post("http://0.0.0.0:8000/items/", json={"name":"Tシャツ", "price":3000, "description":"期間限定!!"},
                    )
print(res.status_code)
print(res.text)