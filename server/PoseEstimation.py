import cv2 as cv
from cvzone.PoseModule import PoseDetector

video = cv.VideoCapture('poseVideos/1.mp4')
pd = PoseDetector()
fps = video.get(cv.CAP_PROP_FPS)
totalNoFrames = video.get(cv.CAP_PROP_FRAME_COUNT)
durationInSeconds = totalNoFrames / fps
while True:
    ret, img = video.read()
    img = pd.findPose(img)
    lmlist, bbox = pd.findPosition(img)

    cv.imshow('frame',img)
    key = cv.waitKey(100)
    if key == 32:
        cv.waitKey()
    elif key == ord('q'):
        break
    