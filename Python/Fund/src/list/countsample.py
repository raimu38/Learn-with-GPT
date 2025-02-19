samplefile = "./sample.txt"

try:
    with open(samplefile, "r",encoding="utf-8") as file:
        content  = file.read()
        print(content)
except FileNotFoundError:
    print("ファイルが見つからねえ")
except Exception as e:
    print(f"エラーが発生したぜ{e}")

tangos = []

text = content.replace("、"," ").replace("."," ").replace("\n"," ").replace("。"," ").replace("が"," が ").replace("に"," に ").replace("と"," と ").replace("を"," を ").replace("へ"," へ ").replace("は"," は ").lower()
words = text.split()
print(f"text:{text}")
print(f"words:{words}")

word_count = {}

for word in words:
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1

print(word_count)

for word, count in word_count.items():
    print(f"{word}: {count}")

    