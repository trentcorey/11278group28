import os
from . import util_fetch_classes
from . import util_image_read
import shutil
import random
import ntpath

def process_image(filepath, label):
    # Find object number
    object_classes = util_fetch_classes.get_classes() 
    
    # Catches ValueError exception if the class does not exist.
    try:
        class_index = object_classes.index(label)
    except ValueError as e:
        print ("Class does not exist. Reject image.")
        return
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
        # If random number is <= 20, move the image and annotation to test images.
        if (rand_num <= 20):
            shutil.move(filepath, "model_data\\images\\" + image_name + ".jpg")
            f = open("model_data\\images\\" + image_name + ".txt", "a")
            f.write(annotation)
            f.close()
            f = open("model_data\\" + "test.txt", "a")
            f.write("model_data\\images\\" + image_name + ".jpg")
            f.close()
        else:
        # Else, move the image and annotation to training images. 20/80 split.
            shutil.move(filepath, "model_data\\images\\" + image_name + ".jpg")
            f = open("model_data\\images\\" + image_name + ".txt", "a")
            f.write(annotation)
            f.close()
            f = open("model_data\\" + "train.txt", "a")
            f.write("model_data\\images\\" + image_name + ".jpg")
            f.close()
    else:
        # Otherwise, there was no image at the filepath.
        print("Image not found at filepath.")