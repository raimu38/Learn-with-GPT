from abc import ABC, abstractmethod
print(ABC.path)

#Strategy
class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount:float):
        pass

#具体的な戦略
class CreditCardPayment(PaymentStrategy):
    def __init__(self, card_number):
        self.card_number = card_number

    def pay(self, amount:float):
        print(f"クレジットカードで{amount}円を支払いました。カード番号{self.card_number}")

class PayPalPayment(PaymentStrategy):
    def __init__(self, email):
        self.email = email

    def pay(self, amount:float):
        print(f"PayPalで{amount}円支払いましt。メール：{self.email}")

#コンテキスト
class ShoppingCart:
    def __init__(self):
        self.items = []
        self.total = 0.0

    def add_item(self, item ,price):
        self.items.append(item)
        self.total += price

    def pay(self, strategy: PaymentStrategy):
        strategy.pay(self.total)

cart = ShoppingCart()
cart.add_item("魚", 900)
cart.add_item("お肉", 1300)

credit_card = CreditCardPayment("123456789")
cart.pay(credit_card)

paypal = PayPalPayment("paypal@example.com")
cart.pay(paypal)

