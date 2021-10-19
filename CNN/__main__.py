from cnn_proj_utils import util_directory_check
from cnn_proj_utils import util_process_image

if __name__ == "__main__":
    util_directory_check.directory_check()
    util_process_image.process_image("unprocessed_images\\apple1.jpg", "apple")
        