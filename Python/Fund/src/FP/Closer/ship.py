#!/usr/dev/env python3
def create_shipping_calculator(base_fee, border_line_fee):
    def fee_calculator(amount):
        if(amount >= border_line_fee):
            return 0
        else:
            return base_fee
    return fee_calculator

default_shipping = create_shipping_calculator(500,3000)
supecial_shipping = create_shipping_calculator(500,5000)

print(default_shipping(300))
print(default_shipping(4000))
print(supecial_shipping(4000))
print(supecial_shipping(6000))