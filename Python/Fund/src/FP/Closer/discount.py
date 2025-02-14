#!/usr/dev/env python3
def discount_calculator(discount_rate):
    
    def apply_discount(price):
        return price*(1-discount_rate)
    return apply_discount

discount_ten = discount_calculator(0.1)
discount_twenty = discount_calculator(0.2)

print(discount_ten(300))
print(discount_twenty(300))