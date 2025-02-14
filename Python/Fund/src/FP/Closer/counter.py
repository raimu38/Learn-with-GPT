#!/usr/dev/env python3
#!/usr/bin/env python3
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

