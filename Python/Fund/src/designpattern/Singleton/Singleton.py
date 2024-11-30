class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance
singleton1 = Singleton()
singleton2 = Singleton()
print(singleton1 is singleton2)
            
class Singleton2:
    _instance = None
    def __new__(cls,*args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

class Dog:
    def __init__(self,name):
        self.name = name

dog1 = Dog("Max")
dog2 = Dog("Buddy")

print(dog1.name)
print(dog2.name)
print(dog1 is dog2)

class Singleton3:
    _instance = None
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance
    
singleton1 = Singleton3()
singleton2 = Singleton3()

print(singleton1 is singleton2)

class Singleton4:
    _instance = None
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance
