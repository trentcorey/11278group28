

def check_labels(in_label):
    with open('labels.txt', 'w') as f:
        lines = f.readlines()
        lines = [line.rstrip() for line in lines]
    print(lines)
    if in_label in lines:
        print("Yes")
    else:
        
        print("No")

check_labels("apple")

