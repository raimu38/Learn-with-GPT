#!/usr/dev/env python3
def point_calculator(rate):
    def calculate_point(amount):
        return amount*(1-rate)
    return calculate_point

normal_point = point_calculator(0.01)
campain_point = point_calculator(0.05)

print(normal_point(1000))
print(campain_point(1000))
