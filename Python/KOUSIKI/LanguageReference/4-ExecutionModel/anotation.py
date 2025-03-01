def outer():
    a = 10

    def inner() -> int:
        return a

    return inner()

result = outer()
print(result)


