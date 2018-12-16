def print2d(a):
    for x in a:
        print(x)


# returns the # of operations (add, remove, modify) needed to change str1 into str2 using dp
def edit_distance(str1, str2):
    if len(str1) < len(str2):
        str1, str2 = str2, str1
    diff = len(str1) - len(str2)
    str2 = str2 + (diff * ' ')

    # initialize a 2D array to size the size of [len(str1)][len(str2)]
    # the first row and column represent empty strings
    dp = [[0 for x in range(len(str1) + 1)] for x in range(len(str2) + 1)]

    for row in range(len(dp)):
        for col in range(len(dp[row])):

            # The first row is filled with column because the edit distance
            # of an empty string and another string is the length of the other string
            # ie add col # of characters
            if row == 0:
                dp[row][col] = col

            # The first column  is filled with the row because the edit distance
            # of a string and an empty string is the length of the  string
            # ie remove col # of characters
            elif col == 0:
                dp[row][col] = row

            # same character means there is no modification needed the edit distance is the same as the
            # minimum of the comparing the strings without the character
            elif str1[row-1] == str2[col-1]:
                dp[row][col] = min(dp[row][col - 1], dp[row - 1][col], dp[row - 1][col - 1])

            # the character is different meaning the edit distance is the same as the
            # minimum of the comparing the strings without the character plus one for the new character
            # dp[row][col - 1] -> Insert the character
            # dp[row - 1][col] -> Remove the character
            # dp[row - 1][col - 1] -> Modify the character
            else:
                dp[row][col] = min(dp[row][col - 1], dp[row - 1][col], dp[row - 1][col - 1]) + 1
    return dp[-1][-1]


# given a sorted list of strings, compare adjacent strings,
# if they have a small edit distance, store their index
# after, remove all the indices

def remove_similar_names(names_list):
    indices_to_remove = []
    for ind in range(len(names_list) - 1):
        if edit_distance(names_list[ind], names_list[ind + 1]) < 4:
            print('\tfound similar names:')
            print('\t', names_list[ind], names_list[ind + 1])
            indices_to_remove.append(ind)
    print(indices_to_remove)

    num_removed = 0
    for ind in indices_to_remove:
        names_list.pop(ind - num_removed)
        num_removed += 1
    return names_list


def scrape(filename):
    from bs4 import BeautifulSoup
    page = open(filename, 'r')
    soup = BeautifulSoup(page, 'html.parser')

    table = soup.find('table')
    table_body = table.find('tbody')

    rows = table_body.find_all('tr')

    for row in rows:
        cols = row.find_all('td')
        cols = [ele.text.strip() for ele in cols]

        # Get rid of empty values
        if not len(cols) < 3:
            add = True
            for r in data:
                if r.__contains__(cols[2]):
                    add = False
                    break
            if add:
                data.append([ele for ele in cols if ele])

    data.pop(0)
    for line in data:
        if not len(line) < 3:
            names.append(line[2])


def main():
    scrape('bigboard1.html')
    scrape('bigboard2.html')
    scrape('bigboard3.html')
    scrape('bigboard4.html')


data = []
names = []
if __name__ == '__main__':
    from collections import OrderedDict
    main()
    names = list((OrderedDict.fromkeys(names)))
    sorted_names = sorted(names)
    sorted_names = remove_similar_names(sorted_names)
    for name in sorted_names:
        print(name)
    print("length of names before: ", len(names))
    print("length of names after: ", len(sorted_names))
