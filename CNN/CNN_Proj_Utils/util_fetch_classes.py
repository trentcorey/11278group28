def testing_read():
    with open("Model_Info\_classes.txt", "r") as f:
        lines = f.readlines()
        lines = [line.rstrip() for line in lines]

    return lines