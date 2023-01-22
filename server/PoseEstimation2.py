import cv2
import mediapipe as mp
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_holistic = mp.solutions.pose

count = 0
frames = 0
# For webcam input:
cap = cv2.VideoCapture('poseVideos/7.mp4')
with mp_holistic.Pose(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as holistic:
  while cap.isOpened():
    success, image = cap.read()
    if not success:
      break

    # To improve performance, optionally mark the image as not writeable to
    # pass by reference.
    image.flags.writeable = False
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = holistic.process(image)

    # Draw landmark annotation on the image.
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    mp_drawing.draw_landmarks(
        image,
        results.face_landmarks,
        mp_holistic.FACEMESH_CONTOURS,
        landmark_drawing_spec=None,
        connection_drawing_spec=mp_drawing_styles
        .get_default_face_mesh_contours_style())
    mp_drawing.draw_landmarks(
        image,
        results.pose_landmarks,
        mp_holistic.POSE_CONNECTIONS,
        landmark_drawing_spec=mp_drawing_styles
        .get_default_pose_landmarks_style())

    try:
        landmarks = results.pose_landmarks.landmark
        poseLandmarks = mp_holistic.PoseLandmark
        for i in range(10):
            if landmarks[i].visibility <= 0.005:
                count += 1
            print(landmarks[i].visibility)
        frames += 1
    except:
        pass
    cv2.imshow('MediaPipe Holistic', image)
    if cv2.waitKey(5) & 0xFF == 27:
      break
cap.release()
print(count/frames*10)