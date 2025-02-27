import time
import sys
from functools import lru_cache
from math import sqrt
from decimal import Decimal, getcontext
import numpy as np

# 再帰の最大深度を増やす
sys.setrecursionlimit(1000000)  # 必要に応じて増やす

# 整数の桁数制限を解除
sys.set_int_max_str_digits(0)

# 浮動小数点の精度を設定（大きな N に対応）
getcontext().prec = 100000  # 必要に応じて増やす

@lru_cache(maxsize=None)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def fibonacci_dp(n):
    if n < 2:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]


def fibonacci_optimized(n):
    if n < 2:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b


# def fibonacci_matrix(n):
#     if n < 2:
#         return n
#     F = np.array([[1, 1], [1, 0]], dtype=object)
#     result = np.linalg.matrix_power(F, n - 1)
#     return result[0][0]

def fibonacci_golden(n):
    phi = Decimal(1 + sqrt(5)) / Decimal(2)  # 黄金比を Decimal に変換
    return round((phi**n - (-1/phi)**n) / Decimal(sqrt(5)))

from concurrent.futures import ProcessPoolExecutor

def fibonacci_parallel(n):
    if n < 2:
        return n
    with ProcessPoolExecutor() as executor:
        future1 = executor.submit(fibonacci_parallel, n - 1)
        future2 = executor.submit(fibonacci_parallel, n - 2)
        return future1.result() + future2.result()




N = 200000

start_time = time.time()
result = fibonacci(N)
end_time = time.time()

# print(f"Result: {result}")
print(f"Execution Time: {end_time - start_time:.10f} sec")
