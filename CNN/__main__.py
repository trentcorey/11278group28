from cnn_proj_utils import util_directory_check
from cnn_proj_utils import util_process_image
import os

if __name__ == "__main__":
    # Check to make sure directories exist. If they don't, create them.
    # util_directory_check.directory_check()
    util_process_image.process_image("images\\apple1.jpg", "apple")