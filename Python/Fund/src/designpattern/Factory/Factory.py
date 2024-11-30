from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return 'Woof!'
    
class Cat(Animal):
    def speak(self):
        return 'Meow!'
    
class AnimalFactory:
    @staticmethod
    def create_animal(animal_type:str) -> Animal:
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        else :
             raise ValueError(f"Unknown animal type: {animal_type}")


if __name__ == "__main__":
    factory = AnimalFactory()

    dog = factory.create_animal('dog')
    print(dog.speak())

    cat = factory.create_animal("cat")
    print(cat.speak())

    