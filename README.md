# 📷 Face Recognition Attendance API

API ini digunakan untuk sistem absensi berbasis **Face Recognition** dengan **WebSocket** (untuk pengenalan wajah secara realtime) serta endpoint REST API untuk mengelola data absensi.

---

## 🚀 Teknologi yang Digunakan
- Python 3
- FastAPI
- WebSocket
- OpenCV & face-recognition
- MySQL

---

## 🔌 Endpoint API

### 1. WebSocket: Face Recognition
Digunakan untuk mengirimkan gambar dalam format **Base64** agar server mengenali wajah.

- **URL**
- ws://localhost:8000/ws/attendance
- GET //localhost:8000/users/all

- **Request (Client → Server)**
```json
{
  "frame": "data:image/jpeg;base64,<img_b64>"
}
Response (Server → Client)

{
  "results": [
    {
      "name": "Daffa Fawwaz",
      "status": "HADIR"
    }
  ]
}
2. GET All Attendance
Mengambil semua data absensi yang sudah terekam.

Endpoint

GET /users/all
Response (Server → Client)

{
  "attendance": [
    {
      "id": 17,
      "user_id": 8,
      "name": "Daffa Fawwaz",
      "status": "HADIR",
      "created_at": "2025-08-22 01:45:17"
    }
  ]
}
