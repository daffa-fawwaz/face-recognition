# Face Recognition API with FastAPI

Proyek ini adalah aplikasi **Face Recognition** berbasis **FastAPI** dengan dukungan **MySQL** sebagai database, **OpenCV**, dan **face_recognition** untuk deteksi wajah.  
Frontend dapat menggunakan React (atau lainnya) untuk berinteraksi dengan API ini.

---

## 🚀 Fitur

- Registrasi user dengan foto wajah
- Penyimpanan data user di database MySQL
- Face recognition menggunakan `face_recognition` + `OpenCV`
- FastAPI sebagai backend dengan REST API
- Menggunakan SQLAlchemy sebagai ORM

---

## 📦 Requirements

Pastikan sudah menginstall:

- Python **3.9+**
- MySQL (contoh: XAMPP, MAMP, Laravel Herd, dll.)
- Virtual environment (opsional tapi disarankan)

---

## ⚙️ Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/username/face-recognition-api.git
   cd face-recognition-api
   ```
2. **Buat virtual environment**
   ```
   python3 -m venv venv
   source venv/bin/activate # Mac/Linux
   venv\Scripts\activate # Windows
   ```
3. **Install dependencies**
   ```
   pip install -r requirements.txt
   ```
4. **Konfigurasi .env**
   ```
   DATABASE_URL=mysql+pymysql://root:root@localhost:3306/face_recog_db
   ```
5. **Buat database**
   ```
   CREATE DATABASE face_recog_db;
   ```

## ▶️ Menjalankan Project

    ---

1. **Jalankan server FastAPI**
   ```
   uvicorn app.main:app --reload
   ```
2. **API akan berjalan di:**
   ```
    http://127.0.0.1:8000
   ```

## ▶️ Dokumentasi API Websocket

```
/ws/log-laptop

Requets
{
  "frame": "data:image/jpeg;base64,...",
  "action": "mengambil"
}

Response
{
  "results": [
    {
      "name": "John Doe",
      "status": "MENGAMBIL_SUCCESS"
    }
  ]
}

Requets
{
  "frame": "data:image/jpeg;base64,...",
  "action": "mengembalikan"
}

Response
{
  "results": [
    {
      "name": "John Doe",
      "status": "MENGEMBALIKAN_SUCCESS"
    }
  ]
}

```

/ws/log-laptop

Requets
{
"frame": "data:image/jpeg;base64,...",
"action": "mengambil"
}

Response
{
"results": [
{
"name": "John Doe",
"status": "MENGAMBIL_SUCCESS"
}
]
}

Requets
{
"frame": "data:image/jpeg;base64,...",
"action": "mengembalikan"
}

Response
{
"results": [
{
"name": "John Doe",
"status": "MENGEMBALIKAN_SUCCESS"
}
]
}

```

```
