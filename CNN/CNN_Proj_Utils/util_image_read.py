import cv2

def annotate_image(filepath, image_name, image_class):
    # read image
    image = cv2.imread(filepath)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    im_hei, im_wid, channels = image.shape

    # Convert the grayscale image to binary
    ret, binary = cv2.threshold(gray, 100, 255, cv2.THRESH_OTSU)
    inverted_binary = ~binary

    contours, hierarchy = cv2.findContours(inverted_binary, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    with_contours = cv2.drawContours(image, contours, -1,(255,0,255),3)

    # print('Total number of contours detected: ' + str(len(contours)))

    # for c in contours:
    #     x, y, w, h = cv2.boundingRect(c)
    #     annotation = 0

    #     # Make sure contour area is large enough
    #     if (cv2.contourArea(c)) > contour_area_percent * im_hei * im_wid:
    #         print(cv2.contourArea(c))
    #         cv2.rectangle(with_contours,(x,y), (x+w,y+h), (255,0,0), 5)
    #         # annotation = filepath + " " + str(x/im_wid) + " " + str(y/im_hei) + " " + str(w/im_wid) + " " + str(h/im_hei) + str(image_class) + "\n"
    #         annotation = filepath + " " + str(x) + "," + str(y) + "," + str(w + x) + "," + str(h + y) + "," + str(image_class) + "\n"
    #         cv2.imwrite("bounding_boxes\\" + image_name, with_contours)

    contour_areas = []
    for c in contours:
        contour_areas.append(cv2.contourArea(c))

    max_area = max(contour_areas)
    max_index = contour_areas.index(max_area)
    x, y, w, h = cv2.boundingRect(contours[max_index])
    annotation = filepath + " " + str(x) + "," + str(y) + "," + str(w + x) + "," + str(h + y) + "," + str(image_class) + "\n"
    cv2.rectangle(with_contours,(x,y), (x+w,y+h), (255,0,0), 5)
    cv2.imwrite("bounding_boxes\\" + image_name, with_contours)
    # Show image    
    # cv2.imshow('Bounding Box', with_contours)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    return annotation