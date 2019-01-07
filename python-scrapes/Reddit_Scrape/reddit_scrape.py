file = open("Big Board_ New Year '19.txt", mode='r', encoding="utf-8-sig")

new_list = []
list_of_dicts = []

for i, line in enumerate(file):
    new_line = line.lstrip('0123456789: ').split(", ")
    new_line[2] = new_line[2].rstrip()
    new_line.append(i+1)
    new_list.append(new_line)


for i in new_list:
    # list_of_dicts.append({str(i[3]): {'name': i[0], 'position': i[1], 'school': i[2], 'rank': i[3]}})
    list_of_dicts.append({"name": i[0], "position": i[1], "school": i[2], "rank": i[3]})

import pprint
pp = pprint.PrettyPrinter(indent=4)

pp.pprint(list_of_dicts)

import json
data = json.dumps(list_of_dicts)
print(data)
# x = ''
with open('bigboard.json', 'w', encoding='utf-8') as f:
    x = json.dumps(data, ensure_ascii=False)
    x = x.replace("\\", "")
    print(x)
    f.write(x)

# print(type(x))

