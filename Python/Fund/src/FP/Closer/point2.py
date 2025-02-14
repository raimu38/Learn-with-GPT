#!/usr/dev/env python3
def create_conditional_calurator(base_rate, threshold=None, bonus_rate=None):
    def calculate_point(amount):
        point = amount * base_rate
        if threshold and amount > threshold:
            point += amount*bonus_rate
        return point
    return calculate_point

base_calcurator = create_conditional_calurator(0.01)
bonus_calcurator = create_conditional_calurator(0.01,threshold=10000, bonus_rate=0.1)

print(base_calcurator(5000))
print(base_calcurator(12000))
print(bonus_calcurator(5000))
print(bonus_calcurator(12000))