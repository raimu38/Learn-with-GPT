from abc import ABC, abstractmethod

#Subject
class NewsAgency:
    def __init__(self):
        self.observers = []
        self.news = ""

    def add_observer(self, observer):
        self.observers.append(observer)
    
    def remove_observer(self, observer):
        self.observers.remove(observer)

    def set_news(self, news: str):
        self.news = news
        self.notify_observers()
    

    def notify_observers(self):
        for observer in self.observers:
            observer.update(self.news)

class Subscriber(ABC):
    @abstractmethod
    def update(self, news: str):
        pass

class NewsChannel(Subscriber):
    def __init__(self, name):
        self.name = name
        self.news = ""

    def update(self, news: str):
        self.news = news
        print(f"{self.name} received news: {self.news}")

agency = NewsAgency()
channel1 = NewsChannel("Channel1")
channel2 = NewsChannel("Channel2")

agency.add_observer(channel1)
agency.add_observer(channel2)

agency.set_news("新しいデザインパターンが発表されました。")