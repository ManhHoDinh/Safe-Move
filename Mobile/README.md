# 📱 Safe-Move Mobile App (Flutter)

This is the official mobile application of the Safe-Move system — a smart flood monitoring and navigation assistant for citizens. It provides real-time flood map views, route suggestions to avoid flooded zones, and lets users report flooding incidents with location and photos.

---

## 🚀 Features

- 🌐 Interactive flood map (real-time updates)
- 🗺️ **Google Maps SDK** + **HERE Maps API** integration
- 📷 Report flood status with images & description
- 🚘 Smart route planning to avoid flood zones
- 🔔 Push & email alerts when entering a flooded area
- 📡 View traffic camera snapshots every 12 seconds

---

## 🧱 Tech Stack

- Flutter + Dart  
- Freezed + Provider for state management  
- REST API with token-based authentication  
- Firebase Auth for login  
- HERE Maps API + Google Maps SDK  
- Supabase for image storage  
- HTTP for backend communication

---

## ⚙️ Installation Guide

### 1. Clone the repo

```
git clone https://github.com/ManhHoDinh/Safe-Move-Mobile.git
cd Safe-Move-Mobile
```
### 2. Install dependencies
```
flutter pub get
```
### 3. Set up your .env file
Create a .env file in the root directory with the following content:

```
API_BASE_URL=https://your-backend-api.com
FIREBASE_PROJECT_ID=your-firebase-id
HERE_API_KEY=your-here-api-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-public-anon-key
```
### 4. Run the app
```
flutter run
```
>✅ Compatible with Android (API 21+) and iOS 12+

## 📁 Folder Structure (simplified)
```
lib/
├── models/         # Data classes (using Freezed)
├── services/       # API handlers, Firebase, etc.
├── views/          # UI screens
├── providers/      # App state
├── widgets/        # Reusable UI components
└── main.dart       # App entry
```
## 🧪 Testing
Run all tests:
```
flutter test
```

## 🔒 Authentication
- Firebase Email/Password Auth
- Token-based API auth with refresh logic
- Role-based access to admin/user routes

## 📎 Notes
- Ensure your HERE Maps account has routing and geocoding enabled.
- Some APIs require CORS configuration on the backend.
- Flood alert logic uses geolocation (make sure user grants permission).


## 👨‍💻 Contributors
- Hồ Đình Mạnh
- Lê Thị Bích Hằng

Part of the graduation thesis at
University of Information Technology – VNU HCM

📘 [Back to Project Overview](../)