# This function takes the object class list and makes it available in the program.
# The label is compared to this list and if it exists, then it processes the image.
def get_classes(filepath):
    with open(filepath, "r") as f:
        object_classes = f.readlines()
        object_classes = [object_classes.rstrip() for object_classes in object_classes]

    return object_classes