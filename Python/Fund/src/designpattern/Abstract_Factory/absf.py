import random
from typing import Type

class Pet:
    def __init__(self, name: str) -> None:
        self.name = name;

    def speak(self) -> None:
        raise NotImplementedError

    def __str__(self) -> str:
        raise NotImplementedError


class Dog(Pet):
    def speak(self) -> None:
        print("woof")

    def __str__(self) -> str:
        return f"Dog<{self.name}>"


class Cat(Pet):
    def speak(self) -> None:
        print("meow")

    def __str__(self) -> str:
        return f"Cat<{self.name}>"


class PetShop:
    def __init__(self, animal_factory: Type[Pet]) -> None:
        self.pet_factory = animal_factory

    def buy_pet(self, name: str) -> Pet:
        pet = self.pet_factory(name)
        print(f"Here is your lovely {pet}")
        return pet

def main() -> None:
    pass

if __name__ == "__main__":
    shop = PetShop(Dog)
    pet = shop.buy_pet("RIN")
    pet.speak()
    print(pet)

















































