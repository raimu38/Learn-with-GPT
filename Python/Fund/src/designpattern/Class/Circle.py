import math

class Zukei():
    def __init__(self, name):
        self.name = name
        
    def area():
        raise NotImplementedError("Subclasses must implement the area() method")

    def perimeter():
        pass

    def display():
        s = self.area()
        long = self.perimeter()
        name = self.name
        print(f"s: {s}, long:{long}, name:{name}")


class Circle(Zukei):
    def __init__(self,name, radius):
        super.__init__(name)
        self.radius = radius

    def area(self):
        r = self.radius
        area = math.pi*r**2
        print(f"area:{area}")

    def perimeter(self):
        r = self.radius
        p = math.pi*2*r
        print(f"perimeter:{p}")


circle1 = Circle("circlekun", 2)
circle1.area()
circle1.perimeter()
circle1.display()

    




