def testing_read():
    with open("labels.txt", "r") as f:
        lines = f.readlines()
        lines = [line.rstrip() for line in lines]

    return lines