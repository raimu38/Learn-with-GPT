#1
# リスト
nums = [1, 2, 3, 4, 5]

# リスト内包表記を使って各要素を2倍にした新しいリストを作成してください。
double = [ num * 2 for num in nums ]
print(double)

#2
# リスト
nums = [10, 15, 20, 25, 30, 35, 40]

# リスト内包表記を使って偶数のみを含む新しいリストを作成してください。
evens = [num for num in nums if num % 2 == 0 ]
print(evens)

#3
# リスト
words = ["apple", "banana", "cherry", "date"]

# リスト内包表記を使って各単語の長さを含む新しいリストを作成してください。

wordlen = [len(word) for word in words]
print(wordlen)

#4
# リスト
fruits = ["apple", "banana", "cherry"]

# リスト内包表記を使って各単語を大文字に変換した新しいリストを作成してください。
Upper = [ fruit.upper() for fruit in fruits]
print(Upper)


#5
# ネストされたリスト
nested_list = [[1, 2], [3, 4], [5, 6]]

# リスト内包表記を使って平坦化した新しいリストを作成してください。

flatted_list = [ num for nest in nested_list for num in nest]
print(flatted_list)

flatted_list = []
for nest in nested_list:
    for num in nest:
        flatted_list.append(num)
print(flatted_list)

#2重のfor はこれと同義

#6
# リスト
words = ["apple", "banana", "cherry", "date", "elderberry"]

# リスト内包表記を使って文字 'a' を含む単語のみを含む新しいリストを作成してください。
wordA = [word for word in words if "a" in word]
print(wordA) 

#7
# リスト
nums = [3, 5, 7, 2, 8, 10, 1]

# リスト内包表記を使って5より大きい数のみを含む新しいリストを作成してください。
numth5 = [num for num in nums if num > 5]
print(numth5)


#8
# リスト
nums = [1, 2, 3, 4, 5]

# リスト内包表記を使って各要素を文字列に変換し、一つの文字列に結合してください。
strNums = ''.join([str(num) for num in nums])
print(strNums)

#9
# リスト
nums = [1, 2, 3, 4, 5]

# リスト内包表記を使って、偶数の場合は2倍にし、奇数の場合はそのままの値を含む新しいリストを作成してください。
ifnums = [num*2 if num % 2 ==0 else num for num in nums]
print(ifnums)

#10
# リスト
nums = [1, 2, 3, 4, 5, 6]

# リスト内包表記を使って偶数のみを2乗した新しいリストを作成してください。
squared_evens = [num**2 for num in nums if num%2 ==0 ]
print(squared_evens)

#11
# リスト
words = ["Python", "JavaScript", "C#", "Ruby", "Go"]

# リスト内包表記を使って各単語の最初の3文字を含む新しいリストを作成してください。
top3words = [word[:3] for word in words]
print(top3words)

#12
# リスト
list1 = [1, 2, 3]
list2 = [4, 5, 6]

# リスト内包表記を使って対応する要素の和を含む新しいリストを作成してください。
ziped = zip(list1,list2)
print(ziped)
sums = [a + b for a, b in zip(list1,list2)]
print(sums)

#13
# リスト
nums = [1, 2, 2, 3, 4, 4, 5]

# リスト内包表記を使って重複を取り除いた新しいリストを作成してください。


#14
# リスト
words = ["abc", "def", "ghi"]

# リスト内包表記を使って各単語を反転させた新しいリストを作成してください。
reversedwords = [word[::-1] for word in words]
print(reversedwords)


#15
# リスト
words = ["apple", "banana", "cherry"]

# リスト内包表記を使って、各単語をキー、その長さを値とする辞書を作成してください。
word_lengths = {word: len(word) for word in words}
print(word_lengths)

#16
# リスト
nums = [1, 2, 3, 4, 5, 6]

# リスト内包表記を使って偶数のみを抽出し、その要素とその2乗のペアを含む新しいリストを作成してください。
doubledpairnums = [[num, num**2] for num in nums if num%2==0]
print(doubledpairnums)

#17
# リスト
colors = ["red", "green", "blue"]
objects = ["apple", "leaf", "sky"]

# リスト内包表記を使って全ての組み合わせのペアを含む新しいリストを作成してください。
paircolorob = [(color,object) for color in colors for object in objects]
print(paircolorob)

#18
# 数値のリスト
nums = list(range(1, 21))

# リスト内包表記を使って、3で割り切れる場合は"Fizz"、5で割り切れる場合は"Buzz"、
# 両方で割り切れる場合は"FizzBuzz"、それ以外はそのままの数値を含む新しいリストを作成してください。
fizz = [
    'FizzBuzz' if num % 15 == 0 else 
    "Fizz" if num % 3 == 0 else 
    "Buzz" if num % 5 == 0 else 
    num 
    for num in nums]
print(fizz)


#19
# リスト
nums = [1, 2, 3, 4, 5]

# 数値を英語表記に変換する辞書を使って、リスト内包表記で新しいリストを作成してください。
num_map = {1:"one",2:"two",3:"three",4:"four",5:"five"}
mapped = [num_map[num] for num in nums]
print(mapped)

#20
# リスト
words = ["apple", "banana", "cherry", "date"]

# 'a'を含む単語の中の'a'を'X'に置換し、新しいリストを作成してください。
atoX = [ word.replace('a','X') if 'a' in word else word for word in words]
print(atoX)

# リスト
nums = [1, 2, 3, 4, 5, 6, 7]

# 偶数の場合は2倍、奇数の場合は3倍し、かつ5を超える数は除外した新しいリストを作成してください。
newnums = [num *2 if num % 2 == 0 else num * 3 for num in nums if  num <= 5 ]
print(newnums)


# 2つのリスト
list1 = [1, 2, 3, 4, 5]
list2 = [10, 20, 30, 40, 50]

# リスト内包表記を使って、各要素の積を含む新しいリストを作成してください。
products = [a*b for a, b in zip(list1,list2)]
print(products)

#41
# リスト
nums = [5, 12, 17, 24, 32, 35, 46, 51]

# リスト内包表記を使って、12以上35以下の数値のみを含む新しいリストを作成してください。
newnums = [num for num in nums if 12 <= num and num  <= 35]
print(newnums)

#42
# リスト
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# リスト内包表記を使って、偶数を文字列"Even"に変換し、
# 奇数はそのままの数値を含む新しいリストを作成してください。
newnums = ['Even' if num % 2 == 0 else num for num in nums]
print(newnums)

# リスト
nums = [10, 15, 20, 25, 30, 35, 40, 45, 50]

# リスト内包表記を使って、15以上45以下の数値のみを含み、
# それらの数値を10で割った結果を含む新しいリストを作成してください。
newnums = [num / 10 for num in nums if num >= 15 and num <= 45]
print(newnums)