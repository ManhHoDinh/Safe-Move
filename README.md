## 🛡️ Safe-Move Project Overview

> **AI-powered Flood Monitoring and Smart Navigation System for Ho Chi Minh City**  
> 🎓 Graduation Thesis from **University of Information Technology - Vietnam National University Ho Chi Minh City**  
> 🏆 Final Score: **9.9 / 10**

### 🎯 Objective
Safe-Move is a real-time AI-integrated system designed to monitor urban flooding and support traffic navigation. The system empowers both citizens and local authorities with accurate, live information about flood conditions across the city.

### 📊 Key Statistics
- 🔍 **600+ traffic cameras** monitored in real time.
- 🧠 **AI flood detection accuracy**: ~90%.
- 📲 **Notification delay**: < 5 seconds from detection to alert.
- 📡 **12-second refresh** on camera snapshots.

### 🧠 AI Integration
- **CNN-based flood detection model** using transfer learning.
- Real-time inference on camera feeds.
- Automatic flood zone classification.
- Alert users via push/email and sync to flood maps.
- AI Monitoring Service runs 24/7 as a long-living containerized service.

## 🧩 System Modules

### 🧠 AI Monitoring Service
- Continuously analyzes traffic camera images.
- Detects flooded roads using CNN.
- Updates interactive flood maps.
- Triggers alerts to affected users.

### ⚙️ Backend (FastAPI)
- Built with **microservices architecture**, each responsible for a specific domain (flood detection, camera control, email, notification, authentication).
- Deployed and managed via **Docker** and `docker-compose`.
- Hosts core business logic, authentication, API routes.
- Interfaces with PostgreSQL, Redis, and external services.

👉 See [Backend Installation Guide](./Backend%20Installation.md)

### 🌐 Admin Web Dashboard
- Built with ReactJS + TailwindCSS.
- Used by local authorities to manage camera devices.
- Review and verify citizen flood reports.
- Send manual alerts if necessary.

👉 See [Web Admin Setup Guide](./Website%20Installation.md)

### 📱 Mobile App (Flutter)
- Targeted at general users.
- Integrated with **Google Maps SDK** and **HERE Maps API**.
- Smart route planning feature to **avoid flooded areas**.
- Report flooding with images.
- View real-time flood maps and camera feeds.
- Receive notifications and reroute suggestions.

👉 See [Mobile App Setup Guide](./Mobile%20Installation.md)

## 🧠 Challenges Solved
- ✅ Real-time monitoring of 600+ asynchronous camera feeds.
- ✅ Low-latency flood detection pipeline using AI.
- ✅ Image upload + classification + alert dispatch under 5s.
- ✅ Role-based access and permission for admin/user.
- ✅ Multi-platform deployment (Web, Mobile, API backend).
- ✅ Smart routing integrated with external map APIs.

## ☁️ Cloud & Services
- **Supabase**: Media storage (flood photos, camera snapshots).
- **Firebase**: User authentication.
- **SendGrid**: Email alerts.
- **Render**: App deployment.
- **Neon DB**: Managed PostgreSQL instance.

## 📄 References
- 📘 [Scientific Paper Summary](./Scientific%20Paper%20Description.md)
- 📝 [Thesis Final Report (Vietnamese)](https://drive.google.com/drive/folders/1tiA8bjnjs8pQN7c4e3TK5ZSe9LWKqo6b)

## 📅 Timeline
- **Sep 2024**: Planning, research, architecture.
- **Oct–Nov 2024**: Development of backend, mobile, AI.
- **Dec 2024**: Testing, deployment, and defense.

---

Developed by Hồ Đình Mạnh & Lê Thị Bích Hằng  
Supervised by Dr. Nguyễn Tấn Trần Minh Khang & Dr. Nguyễn Duy Khánh
