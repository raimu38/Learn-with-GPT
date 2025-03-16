import json

# gifu.jsonからclassidを1行ずつ読み込む
with open("./gifu.json", "r") as f:
    classids = f.read().splitlines()

# classidに対して checked: false を追加したリストを生成
class_data = [{"classid": classid, "checked": False} for classid in classids]

# gifu2.jsonファイルに保存
output_file_path_2 = "./gifu2.json"
with open(output_file_path_2, "w") as f:
    json.dump(class_data, f, indent=4)

# 完了メッセージ
print("gifu2.json has been created at", output_file_path_2)
