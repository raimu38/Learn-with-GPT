def hundred(n):
    for i in range(n):
        print(i + 1)




def FizzBuzz(n):
    if n == 0:
        return
    if(n % 15 == 0):
        print(f"{n}:FizzBizza")
    elif(n % 3 == 0):
        print(f"{n}Fizz")
    elif(n % 5 == 0):
        print(f"{n}Bizz")

def forCalc(n,f):
    for i in range(n):
         f(i)

forCalc(20,FizzBuzz)

# hundred(100)

# from functools import reduce
# import statistics
# numbers = [10, 20, 30, 40, 50]
# total = sum(numbers)
# import numpy as np
# numbers = numpy.array([10,20,30,40,50])
# sumnp = np.sum(numbers)
# averagenp = np.mean(numbers)
# averagestatic = statistics.mean(numbers)
# sum = reduce(lambda acc, value: acc + value, numbers)
# print(sum)
# average = sum / len(numbers)
# print(average)

moji = "apacpcapa"

mojilist =  list(moji)
ijom = mojilist[::-1]
ijom_str = "".join(ijom)
print(str(moji))
print(str(ijom_str))

if(moji == ijom_str):
    print("回分だな")
else:
    print("回分じゃねーな")

moji = "lebel"
if moji == moji[::-1]:
    print("回分だな")


for i in range(10):
    for j in range(10):
        print(f"{i} x {j} = {i*j}",end=' ')
    print('\n')




#random の使い方
import random

randomint  = random.randint(1,101)
print(randomint)


#No2
randomone = random.random()
print(randomone)

#No3
randomuniform = random.uniform(1.5, 3.5)
print(randomuniform)

#4
colors = ["red", "green", "blue", "yellow"]
colorchoice = random.choice(colors)
print(colorchoice)

numbers = list(range(1, 21))
print(numbers)
randomlist = random.sample(numbers,5)
print(randomlist)
numbers = list(range(1, 21))
numberchoice = random.choices(numbers, k=5)
print(numberchoice)

class Saicoro:
    total = 0 
    def huru(self):
        self.me = random.randint(1,6)
        print(f"Me: {self.me}")
        Saicoro.total +=  self.me


SaicoroA = Saicoro()
SaicoroB = Saicoro()

SaicoroA.huru()
SaicoroB.huru()

print(Saicoro.total) 


