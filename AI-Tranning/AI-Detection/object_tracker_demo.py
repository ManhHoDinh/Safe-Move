import os
import random

import cv2
from ultralytics import YOLO
from tracker import Tracker

id2label = {0: "person", 1: "bicycle", 2:"car", 3:"motocycle", 5:"bus", 7:"truck"} 
palette = (2 ** 11 - 1, 2 ** 15 - 1, 2 ** 20 - 1)
# object_counter = {"person": 0, "car": 0, "motobike": 0, "bus": 0, "truck": 0, "other": 0}
object_ids = {"person": [], "bicycle": [], "car": [], "motocycle": [], "bus": [], "truck": [], "other": []}

video_path = os.path.join('.', 'video', 'NgaTu_01.mp4')
# video_out_path = os.path.join('.', 'out.mp4')

cap = cv2.VideoCapture(video_path)
ret, frame = cap.read()

cap_out = cv2.VideoWriter('out.avi', cv2.VideoWriter_fourcc(*'MJPG'), cap.get(cv2.CAP_PROP_FPS), (frame.shape[1], frame.shape[0]))

model = YOLO('model_data/yolov8m.pt')

tracker = Tracker()

colors = [(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)) for j in range(10)]

detection_threshold = 0.7


def compute_color_for_labels(label):

    if label == 0: # person
        color = (85, 45, 255)
    elif label == 2: # Car
        color = (222, 82, 175)
    elif label == 3: # Motobike
        color = (0, 204, 255)
    elif label == 5: # Bus
        color = (0, 149, 255)
    else:
        color = [int((p * (label ** 2 - label + 1)) % 255) for p in palette]
    return tuple(color)

while ret:

    results = model.predict(frame)

    for result in results:
        detections = []
        for r in result.boxes.data.tolist():
            x1, y1, x2, y2, score, class_id = r
            x1 = int(x1)
            x2 = int(x2)
            y1 = int(y1)
            y2 = int(y2)
            class_id = int(class_id)
            if score > detection_threshold:
                detections.append([x1, y1, x2, y2, class_id, score])
            

        tracker.update(frame, detections)

        for track in tracker.tracks:
            bbox = track.bbox
            x1, y1, x2, y2 = bbox
            track_id = track.track_id
            class_id = track.class_id

            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (compute_color_for_labels(class_id)), 3)

            label_name = id2label[class_id] if class_id in id2label.keys() else "other"
            if track_id not in object_ids[label_name]:
                object_ids[label_name].append(track_id)

            cv2.putText(frame,f"{label_name}-{track_id}", 
                        (int(x1) + 5, int(y1) - 5), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1, cv2.LINE_AA )
    
    cap_out.write(frame)
    cv2.imshow('frame',frame)
    cv2.waitKey(2)

    ret, frame = cap.read()

cap.release()
cv2.destroyAllWindows()


print(object_ids)
