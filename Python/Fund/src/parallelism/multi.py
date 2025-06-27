import concurrent.futures
import time


if __name__ == "__main__":
    pow_list = [i for i in range(10, 16)]

    print("Starting...")
    start = time.time()

    with concurrent.futures.ProcessPoolExecutor() as executor:
        futures = {executor.submit(pow, i, i): i for i in pow_list} # Futureオブジェクトと元の数値の対応を保持

    for f in concurrent.futures.as_completed(futures):
        try:
            result = f.result()
            original_number = futures[f] # 対応する元の数値を取得
            print(f"計算完了: {original_number}^{original_number} = {result}")
        except Exception as e:
            original_number = futures[f]
            print(f"エラー発生: {original_number}^{original_number} - {e}")

    end = time.time()
    print(f"Time to complete: {round(end - start,40)}")
