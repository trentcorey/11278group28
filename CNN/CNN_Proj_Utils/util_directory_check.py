import os

# This function is used to make sure the directories that the program will be working with exists.
# If the directory does not exist, create it.
def directory_check():
    # Does folder 'images' exist?
    dir = ("model_data\\images")
    dir_exist = os.path.isdir(dir)
    if not dir_exist:
        os.makedirs(dir)

    # # Does folder 'test' exist?
    # dir = ("images\\test")
    # dir_exist = os.path.isdir(dir)
    # if not dir_exist:
    #     os.makedirs(dir)

    # # Does folder 'train' exist?
    # dir = ("images\\train")
    # dir_exist = os.path.isdir(dir)
    # if not dir_exist:
    #     os.makedirs(dir)
    
    