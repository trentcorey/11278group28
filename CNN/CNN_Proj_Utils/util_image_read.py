def read_image(filepath):
    import cv2
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

    # Draw a bounding box around all contours
    for c in contours:
        x, y, w, h = cv2.boundingRect(c)

        # Make sure contour area is large enough
        if (cv2.contourArea(c)) > 10000:
            cv2.rectangle(with_contours,(x,y), (x+w,y+h), (255,0,0), 5)
            
            f = open("img_labels.txt", "a")
            f.write(str(x/im_wid) + " " + str(y/im_hei) + " " + str(w/im_wid) + " " + str(h/im_hei) + "\n")
            f.close()
            
    cv2.imshow('Bounding Box', with_contours)
    cv2.waitKey(0)
    cv2.destroyAllWindows()