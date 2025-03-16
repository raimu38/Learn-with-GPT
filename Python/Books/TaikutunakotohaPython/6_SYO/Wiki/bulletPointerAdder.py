#!/usr/bin/python3
import pyperclip

text = pyperclip.paste()

print(text)


#ここで　text にアスタリスクをつけて上げる

text_line = text.split("\n")
print(text_line)
for i in range(len(text_line)):
  text_line[i] = "* " +  text_line[i]

print(text_line)

new_text = '\n'.join(text_line)

print(new_text)
pyperclip.copy(new_text)

