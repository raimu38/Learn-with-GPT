#!/usr/bin/env python3
import asyncio

class AsyncPipeline:
    """
    非同期パイプライン。初期値から始まり、awaitableな関数を順次適用する。
    エラー発生時はメッセージを出力し、以降の処理は None にする。
    """
    def __init__(self, value):
        self.value = value

    async def pipe(self, fn):
        """
        指定した非同期関数 fn を実行し、結果をパイプラインの値として更新する。
        エラーが発生した場合は None にして次の処理へ。
        """
        try:
            self.value = await fn(self.value)
        except Exception as e:
            print(f"[ERROR] {fn.__name__} failed: {e}")
            self.value = None
        return self

    async def tee(self, fn):
        """
        現在の値を関数 fn に渡して副作用（ログ出力等）を実行する。
        値は変更せずに次の処理に引き渡す。
        """
        try:
            await fn(self.value)
        except Exception as e:
            print(f"[ERROR] tee {fn.__name__} failed: {e}")
        return self

    async def result(self):
        """ 最終結果を返す """
        return self.value

# --- 非同期な純粋関数たち ---
async def multiply_by_two(x):
    await asyncio.sleep(1.1)  # 疑似的な非同期処理
    return x * 2

async def subtract_five(x):
    await asyncio.sleep(1.1)
    return x - 5

async def risky_divide(x):
    await asyncio.sleep(1.1)
    if x == 0:
        raise ValueError("Division by zero!")
    return 100 / x

async def print_value(x):
    await asyncio.sleep(0.05)
    print(f"Intermediate async value: {x}")
    return x

# --- メイン処理 ---
async def main():
    pipeline = AsyncPipeline(10)
    # 各ステップごとに await してチェーンする
    pipeline = await pipeline.pipe(multiply_by_two)   # 10 * 2 = 20
    pipeline = await pipeline.tee(print_value)          # ログ出力：20
    pipeline = await pipeline.pipe(subtract_five)        # 20 - 5 = 15
    pipeline = await pipeline.tee(print_value)          # ログ出力：15
    pipeline = await pipeline.pipe(risky_divide)         # 100 / 15 ≈ 6.67
    pipeline = await pipeline.tee(print_value)          # ログ出力：6.67
    result = await pipeline.result()
    print("Final async result:", result)

if __name__ == '__main__':
    asyncio.run(main())
