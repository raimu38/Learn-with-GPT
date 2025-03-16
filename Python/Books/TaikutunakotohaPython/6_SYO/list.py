list_squares = [ x**2 for x in range(10)]
print(list_squares)

list_gu = [ x for x in range(20) if x % 2 == 0]
print(list_gu)


nested_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
nonnested_list = [num for row in nested_list for num in row]
print(nonnested_list)

nested_list_3d = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
non_nested_list_3d = [num for matrix in nested_list_3d  for row in matrix for num in row]
print(non_nested_list_3d)
