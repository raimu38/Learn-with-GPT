#!/usr/dev/env python3
def sum(n,f):
    sum = 0
    for i in range(n+1):
        sum +=f(i)
    return sum


def makepower(k):
    def f(x):
        return x**k
    return f

normal = makepower(1)
square = makepower(2)

cube = makepower(3)
    

sumcube = sum(10,normal)
print(sumcube)


