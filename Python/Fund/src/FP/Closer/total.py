# # 手続き型プログラム
# def calculate_total(order_amount):
#     # 割引計算
#     discount = 0
#     if order_amount > 10000:
#         discount = order_amount * 0.1  # 10% 割引
#     elif order_amount > 5000:
#         discount = order_amount * 0.05  # 5% 割引

#     # 割引後の金額
#     discounted_amount = order_amount - discount

#     # 送料計算
#     shipping = 500  # 初期送料
#     if discounted_amount > 3000:
#         shipping = 0  # 3000円以上で送料無料

#     # 最終支払額
#     total = discounted_amount + shipping
#     return total

# # 使用例
# print(calculate_total(12000))  # 10800 (割引10% + 送料0)
# print(calculate_total(8000))   # 7600 (割引5% + 送料0)
# print(calculate_total(2000))   # 2500 (割引なし + 送料500)


# def create_totaprice_calcurator(base_rate,base_line,extra_rate,extra_line, base_fee, base_fee_line):
#     def calcurate_totalprice(price):
#         discount = 0
#         if (price > extra_line):
#             discount += price*extra_rate
#         elif (price > base_line):
#             discount += price*base_rate
#         else:
#             discount = discount 

#         discounted_price = price - discount

#         shipping = base_fee
#         if(discounted_price > base_fee_line):
#             shipping = 0
        
#         total_price = discounted_price + shipping
#         return total_price
#     return calcurate_totalprice
    

# calcurate = create_totaprice_calcurator(0.05,5000,0.1,10000,500,3000)

# print(calcurate(12000))
# print(calcurate(8000))
# print(calcurate(2000))

def create_discount_calculator(base_rate, base_line, extra_rate, extra_line):
    def calculate_discount(price):
        if(price > extra_line):
            return price * extra_rate
        elif(price > base_line):
            return price * base_rate
        else:
            return price * 0
    return calculate_discount

def create_shipping_calculator(base_fee, base_fee_line):
    def calculate_shipping(price):
        return 0 if price > base_fee_line else base_fee
    return calculate_shipping


def create_total_price_calculator(discount_calculator, shipping_calculator):
    def calculate_total(price):
        discount = discount_calculator(price)
        discountded_price = price - discount
        shipping = shipping_calculator(discountded_price)
        total_price = discountded_price + shipping
        return total_price
    return calculate_total


discount_calculator = create_discount_calculator(0.05,5000,0.1,10000)
shipping_calculator = create_shipping_calculator(500,3000)

total_calculator = create_total_price_calculator(discount_calculator,shipping_calculator)

print(total_calculator(12000))
print(total_calculator(8000))
print(total_calculator(2000))
