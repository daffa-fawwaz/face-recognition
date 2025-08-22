# Face Recognition Attendance API

API ini digunakan untuk sistem absensi berbasis **Face Recognition** dengan **WebSocket** (untuk pengenalan wajah secara realtime) serta endpoint REST API untuk mengelola data absensi.

## 🚀 Teknologi yang Digunakan
- Python 3.x
- FastAPI
- WebSocket
- OpenCV & face-recognition
- SQLite / MySQL (opsional untuk penyimpanan data absensi)

---

## 🔌 Endpoint API

### 1. WebSocket: Face Recognition
Digunakan untuk mengirimkan gambar dalam format **Base64** agar server mengenali wajah.

- **URL**

ws://localhost:8000/ws/attendance

- **Request (Client → Server)**
```json
{
    "frame": f"data:image/jpeg;base64,{img_b64}"
}

- **Response (Server → Client)**

{
  "results":
    [
      {
        "name":"Daffa Fawwaz",
        "status":"HADIR"
      }
    ]
}

### 2. GET All Attendance

- **Endpoint**

GET /users/all

- **Response (Server → Client)**

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






