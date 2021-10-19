def get_classes():
    with open("Model_Info\_classes.txt", "r") as f:
        object_classes = f.readlines()
        object_classes = [object_classes.rstrip() for object_classes in object_classes]

    return object_classes