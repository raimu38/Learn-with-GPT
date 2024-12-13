def counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

counter_instance = counter()
print(counter_instance())
print(counter_instance())
print(counter_instance())
