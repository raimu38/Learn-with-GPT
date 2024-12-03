from abc import ABC, abstractmethod

class Coffee(ABC):
    @abstractmethod
    def cost(self) -> float:
        pass

#具体的なコンポーネント
class SimpleCoffee(Coffee):
    def cost(self) -> float:
        return 2.0
    
#デコレーター
class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee):
        self._coffee = coffee

    def cost(self) -> float:
        return self._coffee.cost()
    
class MilkDecorator(CoffeeDecorator):
    def cost(self) -> float:
        return self._coffee.cost() + 0.5

class SugarDecorator(CoffeeDecorator):
    def cost(self) -> float:
        return self._coffee.cost() + 0.2
    
originalcoffee = SimpleCoffee()
print(f"シンプルコーヒー: {originalcoffee.cost()}ドル")

milkcoffee = MilkDecorator(originalcoffee)
print(f"ミルク追加: {milkcoffee.cost()}ドル")

sugarcoffee = SugarDecorator(milkcoffee)
print(f"砂糖追加: {sugarcoffee.cost()}ドル")
print(f"シンプルコーヒー: {originalcoffee.cost()}ドル")
