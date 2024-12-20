n, c1, c2 = map(str, input().split())
n = int(n)
assert 100 >= n >= 1
S = input()

out = ''.join([ char if char==c1 else c2 for char in S])
print(out)