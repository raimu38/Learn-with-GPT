from abc import ABC, abstractmethod

class Character(ABC):
    @abstractmethod
    def attack(self):
        pass

class Warrior(Character):
    def attack(self):
        return "斧で攻撃"
    
class Mage(Character):
    def attack(self):
        return "魔法で攻撃!"
    
class CharacterFacrtory:
    @staticmethod
    def create_character(character_type:str) -> Character:
        if character_type == 'warrior':
            return Warrior()
        elif character_type == 'mage':
            return Mage()
        else:
            raise ValueError(f"未知のキャラクタータイプ: {character_type}")
        

factory = CharacterFacrtory()
warrior = factory.create_character("warrior")
mage = factory.create_character("mage")
print(warrior.attack())
print(mage.attack())