#! /usr/bin/python3
# pass.py パスワード管理プログラム

PASSWORDS = {'email': 'dydytfute94t43h908yqw49tr',
             'blog': 'foweufhnvsjerhfoufeiu',
             'luggage': '12345'}

import sys
import pyperclip


if (len(sys.argv)) < 2:
    print('使い方 : pass.py [アカウント名を入力]')
    print('パスワードをクリップボードにコピーします')
    sys.exit()

inputs = sys.argv[1:]
print(inputs)
num_inputs = []
for input in inputs:
    try:
        num = float(input) if '.' in input else int(input)
        num_inputs.append(num)
    except ValueError:
        pass

print(num_inputs)
numSum = sum(num_inputs)
print(f"sum: {numSum}")

account = sys.argv[1]

if account in PASSWORDS:
    pyperclip.copy(PASSWORDS[account])
    print(account + 'のパスワードをクリップボードにコピーしました')
else:
    print(account + 'というアカウントは存在しません。。。ざまー')



