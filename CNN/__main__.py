from cnn_proj_utils import util_process_image
import os

if __name__ == "__main__":
    # Check to make sure directories exist. If they don't, create them.
    # util_directory_check.directory_check()
    # util_process_image.process_image("images\\apple1.jpg", "apple")
    i = 0
    directory = r'images' # Sets directory to images
    for entry in os.scandir(directory):
        if (entry.path.endswith(".jpg") and entry.is_file()):
            util_process_image.process_image(entry.path, "apple")
            i = i+1

    print("Processed %d images.\n", i)