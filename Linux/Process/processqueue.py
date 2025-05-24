from multiprocessing import Process, Queue
from queue import Empty

def add(x,y,q):
    result = x + y
   # q.put(("add", result))

def sub(x,y,q):
    result = x - y
   # q.put(("sub", result))

if __name__ == "__main__":
    q = Queue()

    p1 = Process(target=add, args=(10,5,q))
    p2 = Process(target=sub, args=(10,5,q))

    p2.start()
    p1.start()

    results = {}

    for i in range(2):
        try:
            name, value = q.get(timeout=5)
            results[name] = value
            print(f"nama{i}:{name}")
        except Empty:
            print("timeOut!)


    p1.join()
    p2.join()

    print(f"add result: {results['add']}")
    print(f"sub result: {results['sub']}")



