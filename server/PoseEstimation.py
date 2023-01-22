import cv2 as cv
from cvzone.PoseModule import PoseDetector

video = cv.VideoCapture('poseVideos/3.mp4')
pd = PoseDetector()
count = 0
frames = 0
while True:
    ret, img = video.read()
    while(ret): 
        img = pd.findPose(img)
        lmlist, bbox = pd.findPosition(img)

        print(lmlist)
        for i in range(10):
            if lmlist[i][3] <= 0.1:
                count += 1

        cv.imshow('frame',img)
        key = cv.waitKey(100)
        if key == 32:
            cv.waitKey()
        elif key == ord('q'):
            break
        frames += 1
        ret, img = video.read()
    print((count/frames)/10)
    break
video.release()
cv.destroyAllWindows()
    