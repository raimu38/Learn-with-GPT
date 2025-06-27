class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
        else:
            raise ValueError("生の値を入力しなよ")

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
        else:
            raise ValueError("金額が不正や")
    
    def transfer(self, other, amount):
        if 0 < amount <= self.__balance:
            other.deposit(amount)
            self.withdraw(amount)



