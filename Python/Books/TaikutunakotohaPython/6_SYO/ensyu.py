text = """
1行目
2行目
3行目
"""
print(text)


table_data = [['apples', 'oranges', 'cherries', 'banana'],
              ['Alice', 'Bob', 'Carol','David'],
              ['dogs', 'cats', 'moose', 'goose']]


def print_table():
    colum_length = len(table_data)
    row_length = len(table_data[0])
    max_length = [0] * row_length
    for i in range(row_length):
        column_str_length = 0
        for j in range(colum_length):
            column_str_length = max(column_str_length, len(table_data[j][i]))
        max_length[i] = column_str_length 

    output_text = []
    for i in range(colum_length):
        row_text  = []
        for j in range(row_length):
           row_text.append(table_data[i][j].rjust(max_length[j]))
        output_text.append(" ".join(row_text))

    print("\n".join(output_text))

def print_table_2():
    max_length = [max(len(row[i]) for row in table_data) for i in range(len(table_data[0]))]
    print("\n".join(" ".join(row[i].rjust(max_length[i]) for i in range(len(row))) for row in table_data))

def print_table_3():
    print("\n".join([" ".join(row[i].rjust(max(max(len(row[i]) for row in table_data) for i in range(len(table_data[0])))) for i in range(len(row))) for row in table_data]))


print_table_3()
