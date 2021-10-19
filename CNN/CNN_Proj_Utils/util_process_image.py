import os
from . import util_fetch_classes
from . import util_image_read
import shutil
import random
import ntpath

def process_image(filepath, label):
    # Find object number
    object_classes = util_fetch_classes.get_classes() 
    class_index = object_classes.index(label)

    # Gets filename
    # Should be jpeg file extensions anyways.
    entry_name = ntpath.basename(filepath)
    image_name_size = len(entry_name)
    image_name = entry_name[:image_name_size - 4]
    
    if os.path.isfile(filepath):    
        print(filepath)
        # reads image, creates annotation file.
        annotation = util_image_read.annotate_image(filepath, entry_name, class_index)

        rand_num = random.randint(0,100)
        print(rand_num)
        if (rand_num <= 20):
            shutil.move(filepath, "images\\test\\" + image_name + ".jpg")
            f = open("images\\test\\" + image_name + ".txt", "a")
            f.write(annotation)
            f.close()
        else:
            shutil.move(filepath, "images\\train\\" + image_name + ".jpg")
            f = open("images\\train\\" + image_name + ".txt", "a")
            f.write(annotation)
            f.close()