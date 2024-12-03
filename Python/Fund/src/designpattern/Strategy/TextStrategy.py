from abc import ABC, abstractmethod

#Strategy
class TextFormatter(ABC):
    @abstractmethod
    def format(self, text:str) -> str:
        pass

#具体的な戦略
class UpperCaseFormat(TextFormatter):
    def format(self, text:str) -> str:
        return text.upper()
    
class LowewCaseFormat(TextFormatter):
    def format(self, text:str) -> str:
        return text.lower()
    
class TextEditor:
    def __init__(self, formatter: TextFormatter):
        self.formatter = formatter

    def publish_text(self, text:str):
        formatted = self.formatter.format(text)
        print(formatted)

editor = TextEditor(UpperCaseFormat())
editor.publish_text("Hello World")
editor.formatter = LowewCaseFormat()
editor.publish_text("Hello World")
