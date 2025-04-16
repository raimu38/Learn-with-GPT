import math
from abc import ABC, abstractmethod

class Zukei(ABC):
    """図形の抽象基底クラス"""
    def __init__(self, name):
        """図形の名前を初期化

        Args:
            name (str):
        """
        self.name = name

    @abstractmethod
    def area(self) -> float:
        """図形の面積を計算
        
        Returns:
            float: 図形の面積
        """
        pass

    @abstractmethod
    def perimeter(self) -> float:
        """図形の周囲の長さを計算


        Returns:
            float: 図形の周囲帳
        """
        pass

    def display(self):
        area = self.area()
        perimeter = self.perimeter()
        name = self.name
        print(f"図形名:{name}, 面積:{area:.2f}, 周囲帳:{perimeter:.2f}")




class Circle(Zukei):
    def __init__(self,name, radius):
        super().__init__(name)
        self.radius = radius

    def area(self):
        r = self.radius
        return math.pi*r**2

    def perimeter(self):
        r = self.radius
        return 2*math.pi*r

circle1 = Circle("circlekun", 2)
circle1.display()

    




