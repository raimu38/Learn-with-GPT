import os
import sys

def combine_files(root_dir, output_file):
    """
    指定されたディレクトリ以下のすべてのファイルの内容を、
    ディレクトリ構造を維持した相対パスとともに一つのファイルに結合します。
    改行コードは Unix 形式に変換します。

    Args:
        root_dir (str): 検索を開始するルートディレクトリ。
        output_file (str): 出力ファイル名。
    """
    with open(output_file, 'w', encoding='utf-8', newline='\n') as outfile:
        for root, _, files in os.walk(root_dir):
            for file in files:
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, root_dir)
                outfile.write(f"==== {relative_path} ====\n")
                try:
                    with open(file_path, 'r', encoding='utf-8') as infile:
                        content = infile.read().replace('\r\n', '\n').replace('\r', '\n')
                        outfile.write(content)
                except UnicodeDecodeError:
                    print(f"警告: {file_path} はテキストファイルとして読み込めませんでした。スキップします。")
                outfile.write("\n\n")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("使い方: python combine_files_callable.py <検索ルートディレクトリ> <出力ファイル名>")
        sys.exit(1)

    root_directory = sys.argv[1]
    output_filename = sys.argv[2]
    combine_files(root_directory, output_filename)
    print(f"ディレクトリ '{root_directory}' 以下のすべてのファイルの内容を '{output_filename}' に出力しました (改行コードを処理済み)。")
