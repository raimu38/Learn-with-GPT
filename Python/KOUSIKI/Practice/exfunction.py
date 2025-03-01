from functools import lru_cache
import time
import numpy as np

cache = []

def cache_function(n):
    if n in cache:
        return cache[n]

@lru_cache(maxsize=None)
def cache_function(n): 
    print(f"Calcurating{n}")
    time.sleep(1)
    return n * n


print(cache_function(3))
print(cache_function(3))
print(cache_function(2))
print(cache_function(3))


import socket 

socket.socket(socket.AF_INET, socket.SOCK_STREAM)