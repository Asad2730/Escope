
import cv2
import face_recognition
import sys
import os


def find_face_encodings(image_path):
    # Adjust the path to go one directory back
    image_path = os.path.join('..', image_path)

    # reading image
    image = cv2.imread(image_path)

    if image is None:
        # Handle the case where the image cannot be read
        print(f"Error reading image at path: {image_path}", file=sys.stderr)
        return None

    try:
        # get face encodings from the image
        face_enc = face_recognition.face_encodings(image)

        if not face_enc:
            # Handle the case where no faces are detected
            print(f"No faces found in image: {image_path}", file=sys.stderr)
            return None

        # return face encodings
        return face_enc[0]

    except Exception as e:
        # Handle any other exceptions that might occur during face detection
        print(f"Error in face detection for image {image_path}: {e}", file=sys.stderr)
        return None



image_1 = find_face_encodings(r'' + sys.argv[1])
image_2 = find_face_encodings(r'' + sys.argv[2])

if image_1 is not None and image_2 is not None:
        is_same = face_recognition.compare_faces([image_1], image_2)[0]
        if is_same:
            # finding the distance level between images
            distance = face_recognition.face_distance([image_1], image_2)
            distance = round(distance[0] * 100)

            # calculating accuracy level between images
            accuracy = 100 - round(distance)
           


print(is_same)
