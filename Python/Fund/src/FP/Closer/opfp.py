#!/usr/bin/env python3

class Pipeline:
    def __init__(self,value):
        self.value = value

    def pipe(self,fn):
        self.value = fn(self.value)
        return self

    def result(self):
        return self.value


def add_five(x):
    return x + 5

def square(x):
    return x ** 2

def to_string(x):
    print(f"結果は:{x}")
    return x 


if __name__ == "__main__":
    result = (
        Pipeline(10)
        .pipe(add_five)
        .pipe(square)
        .pipe(add_five)
        .pipe(square)
        .pipe(to_string)
        .pipe(to_string)
        .pipe(square)
        .pipe(square)
        .result()
    )

    print(result)