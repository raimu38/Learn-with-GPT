from abc import ABC, abstractmethod

class ChatRoom:
    def __init__(self):
        self.participants = []
        self.message = ""

    def join(self, participant):
        self.participants.append(participant)

    def leave(self, participant):
        self.participants.remove(participant)

    def send_message(self, message: str):
        self.message = message
        self.notify_participants()

    def notify_participants(self):
        for participant in self.participants:
            participant.update(self.message)

    
#Observer
class Participant(ABC):
    @abstractmethod
    def update(self, message:str):
        pass


class User(Participant):
    def __init__(self, name):
        self.name = name
    
    def update(self, message:str):
        print(f"{self.name} received message: {message}")

chat = ChatRoom()
alice = User('Alice')
bob   = User('Bob')
Lucy  = User('Lucy')

chat.join(alice)
chat.join(bob)
chat.join(Lucy)



chat.send_message("こんにちわ")

chat.leave(alice)
chat.send_message("おはよう")

members = {'satou':'Satou', 'katou':'Katou'}
for  key, value in members.items():
    key = User(value)
    chat.join(key)

chat.send_message("さようなら")


import gc

objects = gc.get_objects()
print(objects)
user_objects = [obj for obj in objects if isinstance(obj, User)]
print(f"現在のオブジェクトの数：{len(user_objects)}")
for obj in user_objects:
    print(obj.name)