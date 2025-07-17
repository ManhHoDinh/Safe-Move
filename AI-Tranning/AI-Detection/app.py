import os
import gradio as gr
import cv2
import pandas as pd
import random
from datetime import datetime

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from ultralytics import YOLO
from tracker import Tracker
from utils import ID2LABEL, MODEL_PATH, AUTHEN_ACCOUNT, compute_color_for_labels


cred = credentials.Certificate(AUTHEN_ACCOUNT)
firebase_admin.initialize_app(cred)
db = firestore.client()

colors = [(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)) 
          for j in range(10)]

detection_threshold = 0.1
model = YOLO(MODEL_PATH)

def addToDatabase(ss_id, obj_ids):
    try:
        new_doc = db.collection("TrafficData").document()
        print(new_doc.id)
        data = {
            "SS_ID": ss_id,
            "TF_COUNT_CAR": len(obj_ids['car']),
            "TF_COUNT_MOTOBIKE": len(obj_ids['bicycle']) + len(obj_ids['motocycle']),
            "TF_COUNT_OTHERS": len(obj_ids['bus']) + len(obj_ids['truck']) + len(obj_ids['other']),
            "TF_ID": new_doc.id,
            "TF_TIME": datetime.utcnow()

        }
        try:
            db.collection("TrafficData").document(new_doc.id).set(data)
            print("Sucessfully saved to database")
        except:
            print("Can't upload a new data")

    except:
        print("Can't create a new data")


def traffic_counting(video):
   
    obj_ids = {"person": [], 
                  "bicycle": [], 
                  "car": [], 
                  "motocycle": [], 
                  "bus": [], 
                  "truck": [], 
                  "other": []}

    cap = cv2.VideoCapture(video)
    ret, frame = cap.read()

    tracker = Tracker()
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
                label_name = ID2LABEL[class_id] if class_id in ID2LABEL.keys() else "other"
                if track_id not in obj_ids[label_name]:
                    obj_ids[label_name].append(track_id)

                cv2.putText(frame,f"{label_name}-{track_id}", 
                            (int(x1) + 5, int(y1) - 5), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1, cv2.LINE_AA )
    
        # Count each type of traffic
        output_data = {key: len(value) for key, value in obj_ids.items()}
        df = pd.DataFrame(list(output_data.items()), columns=['Type', 'Number'])
       
        yield frame, df
        ret, frame = cap.read()
        
    
    cap.release()
    cv2.destroyAllWindows()
    video_path = video.replace("\\", "/")
    # addToDatabase(video_path.split("/")[-1][:-4], obj_ids)


# input_video = gr.Video(label="Input Video")
# output_video = gr.outputs.Video(label="Processing Video")
# output_data = gr.Dataframe(interactive=False, label="Traffic's Frequency")

# demo = gr.Interface(traffic_counting,
#                     inputs=input_video,
#                     outputs=[output_video, output_data],
#                     examples=[os.path.join('video', x) for x in os.listdir('video') if x != ".gitkeep"],
#                     allow_flagging='never'
#                     )
def traffic_detection(image):
    
    results = model.predict(image)
    detections = []
    obj_ids = {"person": [], 
                  "bicycle": [], 
                  "car": [], 
                  "motocycle": [], 
                  "bus": [], 
                  "truck": [], 
                  "other": []}

    for result in results:
        for r in result.boxes.data.tolist():
            x1, y1, x2, y2, score, class_id = r
            x1 = int(x1)
            x2 = int(x2)
            y1 = int(y1)
            y2 = int(y2)
            class_id = int(class_id)
            if score > detection_threshold:
                detections.append([x1, y1, x2, y2, class_id, score])
            cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (compute_color_for_labels(class_id)), 1)
            label_name = ID2LABEL[class_id] if class_id in ID2LABEL.keys() else "other"
            cv2.putText(image,f"{label_name}", 
                            (int(x1) + 5, int(y1) - 5), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.3,compute_color_for_labels(class_id), 1, cv2.LINE_AA )         
       
        # Count each type of traffic
        output_data = {key: len(value) for key, value in obj_ids.items()}
        df = pd.DataFrame(list(output_data.items()), columns=['Type', 'Number'])
        yield image, df

        
                
    

# Input is a image
input_image = gr.Image(label="Input Image")
output_image = gr.Image(type="filepath", label="Processing Image")
output_data = gr.Dataframe(interactive=False, label="Traffic's Frequency")
demo = gr.Interface(traffic_detection,
                    inputs=input_image,
                    outputs=[output_image, output_data],
                    examples=[os.path.join('image', x) for x in os.listdir('image') if x != ".gitkeep"],
                    allow_flagging='never'
                    )


if __name__ == "__main__":
    demo.queue()
    demo.launch(share= False)