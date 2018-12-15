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
    print(names)
    print("length of names: ", len(names))
    sorted_names = sorted(names)
    print(sorted_names)
    for name in sorted_names:
        print(name)
