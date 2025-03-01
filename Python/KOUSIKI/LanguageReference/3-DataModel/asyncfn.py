class AsyncCounter:
    def __init__(self, start, end):
        self.current = start
        self.end = end
    def __aiter__(self):
        return self
    async def __anext__(self):
        if self.current >= self.end:
            raise StopAsyncIteration
        time.sleep(0.1)
        self.current += 1
        return self.current - 1

import asyncio
import time

async def main():
    async for i in AsyncCounter(0,10):
        print(i)



