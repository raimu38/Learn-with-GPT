#1
list1 = [3,5,7,1,578,32]
list1_max = max(list1)
list1_min = min(list1)
list1_sum = sum(list1)
print(f"max:{list1_max},min:{list1_min},sum:{list1_sum}")

#2
inputmoji = input("Enter one word ")
codepoint = chr(inputmoji)
print(codepoint)

#3
inputoji = "Hello, world, hello, python"
inputmoji_list = inputmoji.split(",")
print(inputmoji_list)

#4
list1 = [21,53,6,7,35,72,41,4,6,]
list2 = [43,2,57,3,6,26,87,3,62]

newlist = list(set(list1) & set(list2))
print(newlist)

#5
input_number = input("Enter number")
if type(input_number) == "int":
    round(input_number, 2)
print(input_number)

#6
int1 = 5
int2 = 4
quotient, remainder = divmod(int1,int2)
print(quotient, remainder)

#7
input_words = "hello world i am bob dahyo"
splited_words = input_words.split(" ")
rebersed_word = splited_words.reverse()
result_worlds = "".join(rebersed_word)
print(result_worlds)

#8
list1 = [32,456,532,43,2,463,243,6,2,43215,32,425,4,14,53,5,3,523,56,74,2,535,3,63,5,73,56,474,735252,52,55,2,62,5,6,25,26,36253,]
set_list = set(list1) 
sorted_list = sorted(set_list)

#9
