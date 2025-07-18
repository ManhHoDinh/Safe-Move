# 🌐 Safe-Move Website Frontend
> 🎓 Part of Graduation Thesis – University of Information Technology – VNU HCM  


This is the frontend website of the Safe-Move system, a platform that visualizes real-time flood detection data collected from over 600 traffic surveillance cameras across Ho Chi Minh City. The website allows users to track flood points and view flood-prone routes in real-time.

---

## ✨ Features

- 📍 Map interface for real-time flood point visualization
- 🗺️ Integration with HERE Maps API and Google Maps
- ⚡ View high-risk flooded zones across the city
- 📸 Image preview from camera snapshots
- 🔗 Integrated with AI-powered backend for real-time detection
- 🌐 Hosted and responsive on modern web browsers

---

## 🛠️ Tech Stack

- **React.js** – UI framework
- **TailwindCSS** – Utility-first CSS for styling
- **Axios** – API requests
- **HERE Maps API** – Interactive maps and routing
- **Google Maps SDK** – (Optional) Map fallback and routing support

---

## 📁 Project Structure

```
Website/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Main application pages
│   ├── services/           # API calls to backend
│   ├── App.js              # Root component
│   └── index.js            # App entry point
├── .env                   # API keys and config
├── package.json
└── README.md              # You are here
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ManhHoDinh/Safe-Move-BE.git
cd Safe-Move-BE/Website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file with:

```env
REACT_APP_HERE_API_KEY=your_here_api_key
REACT_APP_BACKEND_URL=https://your-api-url.com
```

### 4. Run the App

```bash
npm start
```

Navigate to `http://localhost:3000` in your browser.

---

## 🌐 Deployment

You can deploy to any static hosting provider such as **Vercel**, **Netlify**, or **GitHub Pages**.

To build for production:

```bash
npm run build
```

---

## 🔌 API Integration

The website connects with the backend prediction server via REST API:

- `POST /predict`: Sends image for flood detection
- `GET /health`: Backend server health check

Backend: [Safe-Move Backend Module](https://github.com/ManhHoDinh/safe-move-ai)

---

## 📚 Reference

- 🎓 Paper: [IEEE Xplore](https://ieeexplore.ieee.org/document/10814214)  
- 🗃️ Dataset: [UIT-Flooded-VisDrone on Roboflow](https://universe.roboflow.com/uit-2pejh/uit-flooded-visdrone)  
- 🧪 YOLOv10 Model Demo: [Hugging Face Space](https://huggingface.co/spaces/ManhHoDinh/floodTrafficSolution)

---
> Developed by Hồ Đình Mạnh & Lê Thị Bích Hằng – UIT – VNU HCM

📘 [Back to Project Overview](../)

