# Flood Detection AI Module

## 📦 AI Module – Safe-Move Flood Detection

This module contains the AI component of the Safe-Move system, responsible for detecting floods in real-time from images captured by over **600 traffic surveillance cameras** throughout **Ho Chi Minh City**. It uses advanced deep learning techniques, including **Convolutional Neural Networks (CNN)**, **Transfer Learning**, and a custom synthetic dataset generated to simulate flood conditions.

---

### ✅ Key Achievement

- Built a new dataset **UIT-VisDrone-Flood** with **7,411 images**, simulating traffic under flood conditions using **ClimateGAN** and **Segment Anything Model (SAM)**.
- Real-time flood detection from camera images
- CNN-based image classification
- Transfer Learning for enhanced accuracy
- Dockerized FastAPI AI backend
- Integrated with mobile/web platforms via REST API
- Supports dataset generation under flood simulation using ClimateGAN + SAM
---


## 🔍 1. Model Architecture

### 1.1 Convolutional Neural Networks (CNN)

CNNs are used to extract features from surveillance images, identifying flood-related visual patterns like water presence, submerged structures, etc.

- **Convolutional Layers**: Learn image edges, textures.
- **Pooling Layers**: Reduce spatial dimensions.
- **Fully Connected Layers**: Classify flood vs. non-flood.

### 1.2 Transfer Learning

Pretrained models on ImageNet are fine-tuned for flood detection. This boosts accuracy while saving training time.

### 1.3 Data Augmentation

- Techniques: Rotation, zoom, brightness, flipping
- Purpose: Improve model generalization, reduce overfitting

### 1.4 Image Preprocessing

- Resize, grayscale conversion, normalization, cropping
- Ensures input consistency and highlights flood features

### 1.5 Optimizer

- Used: **Adam** optimizer
- Adapts learning rate, stabilizes convergence

### 1.6 Loss Function

- **Cross-Entropy Loss**: Measures prediction error

### 1.7 Evaluation Metrics

- Accuracy
- Precision
- Recall
- Intersection over Union (IoU)

---

## 🔁 2. Flood Detection Pipeline

1. **Input**: Camera images
2. **Preprocessing**: Resize, normalize, augment
3. **Feature Extraction**: CNN extracts key visual signals
4. **Transfer Learning**: Applies pretrained layers
5. **Training**: Optimized with Adam
6. **Prediction**: Binary classification (flood/no flood)
7. **Evaluation**: Metrics reported in backend

---

## 🔌 3. AI Integration Process

### 3.1 Prepare AI Model

- Train on labeled flood images
- Export to `.keras` format

### 3.2 Dockerized FastAPI Backend

- Receives image from client (mobile/web)
- Loads `.keras` model and predicts flood state
- Dockerized for portability

> Sample `Dockerfile`:
```Dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 3.3 Cloud Deployment

- Platform: **Render.com**
- REST API exposed for client use
- Endpoint tested with Postman

> 📡 Deployed Hugging Face space:  
https://huggingface.co/spaces/ManhHoDinh/floodTrafficSolution

### 3.4 Flutter Integration

- Capture/upload image in mobile app
- Send via `http` to backend API
- Receive flood prediction
- Display result in UI

---

## 📂 4. Research Paper

📄 Title: **UIT-VisDrone-Flood: A Synthesized Aerial Vehicle Detection Dataset Under Flood Conditions**  
📍 Conference: **13th International Conference on Control, Automation and Information Sciences (ICCAIS 2024)**  
🔗 IEEE Link: [https://ieeexplore.ieee.org/document/10814214](https://ieeexplore.ieee.org/document/10814214)  
📘 Full Paper PDF: [View here](https://ami.gov.vn/wp-content/uploads/2024/11/TA03-2-compressed.pdf)

### Abstract Summary

Due to the difficulty and danger of capturing real flood images, we synthesized a large-scale dataset using:

- **ClimateGAN**: Converts normal traffic images to flood-like conditions
- **SAM (Segment Anything Model)**: Extracts vehicle masks for realistic cut-paste
- **Color Blending**: Harmonizes inserted vehicles with flood backgrounds

Used YOLOv10 for evaluation, reaching **mAP = 28.8**, showing realistic complexity of generated flood scenes.

---

## 📊 5. Dataset

A total of **7411 synthesized flood images** were generated using:

- VisDrone as base normal dataset
- ClimateGAN for simulation
- SAM for segmentation and cut-paste

📦 Dataset hosted on Roboflow Universe:  
🔗 [UIT-Flooded-VisDrone Dataset](https://universe.roboflow.com/uit-2pejh/uit-flooded-visdrone)

---

## 🧪 6. Experimental Results

- YOLOv10-N used for flood image object detection
- Achieved realistic but challenging results due to occlusion and lighting in simulated data
- Performance compared to other YOLOv10 variants:

| Model      | APval | FLOPs  | Latency |
|------------|-------|--------|---------|
| YOLOv10-N  | 38.5  | 6.7G   | 1.84 ms |
| YOLOv10-S  | 46.3  | 21.6G  | 2.49 ms |
| YOLOv10-M  | 51.1  | 59.1G  | 4.74 ms |
| YOLOv10-B  | 52.5  | 92.0 G | 5.74 ms |
| YOLOv10-L  | 53.2  | 120.3G | 7.28 ms |
| YOLOv10-X  | 54.4  | 160.4G | 10.70 ms|

---

## 📘 References

- [Scientific Paper on IEEE](https://ieeexplore.ieee.org/document/10814214)
- [Flood Detection Model (Hugging Face)](https://huggingface.co/spaces/ManhHoDinh/floodTrafficSolution)
- [UIT-Flooded Dataset on Roboflow](https://universe.roboflow.com/uit-2pejh/uit-flooded-visdrone)

---

## 👨‍🎓 Acknowledgements

Graduation Project – University of Information Technology  
Vietnam National University, Ho Chi Minh City  

📘 [Back to Project Overview](../)
