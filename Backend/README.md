# 🖥️ Safe-Move Backend

> 🎓 Part of Graduation Thesis – University of Information Technology – VNU HCM\


This backend module powers the real-time AI-based flood monitoring system for over 600 traffic cameras in Ho Chi Minh City. It is designed using microservices architecture and runs inside Docker containers for scalability and maintainability.

---

## 🚀 Features

- 🌐 FastAPI-based RESTful API server
- 🧠 Integrates trained AI model for flood detection
- 📦 Containerized using Docker
- ⚙️ Microservices-ready architecture
- 🌍 Receives image data from mobile/web frontend
- 🧾 Returns flood detection prediction (Flood / No Flood)

---

## 🧱 Tech Stack

- **FastAPI** – High-performance API framework
- **Python 3.10+** – Backend language
- **TensorFlow/Keras** – For loading and running the CNN model
- **OpenCV** – Image preprocessing
- **Uvicorn** – ASGI server
- **Docker** – For containerization

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py               # Entry point
│   ├── model_loader.py       # Load .keras model
│   ├── predictor.py          # Inference logic
│   ├── schemas.py            # Request/response schemas
│   └── utils.py              # Image preprocessing
├── Dockerfile                # Docker instructions
├── requirements.txt          # Python dependencies
└── README.md                 # You are here
```

---

## 🛠️ Installation (Local)

### 1. Clone the Repository

```bash
git clone https://github.com/ManhHoDinh/safe-move-ai.git
cd safe-move-ai/backend
```

### 2. Setup Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Run the Server

```bash
uvicorn app.main:app --reload
```

Navigate to [http://localhost:8000/docs](http://localhost:8000/docs) to try the API via Swagger UI.

---

## 🐳 Docker Deployment

### 1. Build Docker Image

```bash
docker build -t safe-move-backend .
```

### 2. Run Docker Container

```bash
docker run -d -p 8000:8000 safe-move-backend
```

Test API at: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🔌 API Endpoints

| Method | Endpoint   | Description                     |
| ------ | ---------- | ------------------------------- |
| POST   | `/predict` | Upload image and get prediction |
| GET    | `/health`  | Health check                    |

### Example cURL

```bash
curl -X POST "http://localhost:8000/predict" \
  -H  "accept: application/json" \
  -H  "Content-Type: multipart/form-data" \
  -F "file=@example.jpg"
```

---

## 📦 Model Loading

- Place your trained `.keras` file in `app/model/` and update `model_loader.py` path accordingly.

---

## 🔗 Integration

- Connects with **Flutter Mobile App** via REST
- Supports integration with frontend dashboards and admin systems

---

## 📚 Reference

- 🎓 Paper: [IEEE Xplore](https://ieeexplore.ieee.org/document/10814214)
- 🗃️ Dataset: [UIT-VisDrone-Flood on Roboflow](https://universe.roboflow.com/uit-2pejh/uit-flooded-visdrone)
- 🧪 Model Demo: [Hugging Face Space](https://huggingface.co/spaces/ManhHoDinh/floodTrafficSolution)

---

> Developed by Hồ Đình Mạnh & Lê Thị Bích Hằng – UIT – VNU HCM

📘 [Back to Project Overview](../)