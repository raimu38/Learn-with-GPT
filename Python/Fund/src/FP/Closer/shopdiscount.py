#!/usr/dev/env python3
def create_shopping_discount_calculator(base_rate,bonus_rate=None, threshold=None, extradiscount=None):
    def calculate_discount(price):
        discount = price * base_rate
        if threshold and price > threshold:
            discount += price(bonus_rate or 0)
        if extradiscount:
            discount += extradiscount
        return price - discount
    return calculate_discount

default_discount = create_shopping_discount_calculator(0.1)
bonus_discount = create_shopping_discount_calculator(0.1, bonus_rate=0.05, threshold=10000)
special_discount = create_shopping_discount_calculator(0.1, extradiscount=500)

print(default_discount())