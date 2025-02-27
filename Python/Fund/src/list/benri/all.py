def all(iterable):
    for element in iterable:
        if not element:
            return False
    return True

print(all([True, 1 , True]))
print(all([1,3,4]))
print(all([False, 0, 3]))


def any(iterable):
    for element in iterable:
        if element:
            return True
    return False


numbers = [1,3,5,64,2,6,56]

has_even = any( n % 2 == 0 for n in numbers)
print(has_even)


def backslash():
    if 1900 < year < 2100 and 1 <= month <= 12 \
        and 1 <= day <= 31 and 0 <= hour < 24 \
            and 0 <= minute < 60 and 0 <= second < 60:
                return 1


month_names = ['Januari', 'Februari', 'Maart',      # These are the
               'April',   'Mei',      'Juni',       # Dutch names
               'Juli',    'Augustus', 'September',  # for the months
               'Oktober', 'November', 'December']   # of the year
