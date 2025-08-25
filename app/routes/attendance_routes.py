# app/routes/attendance_routes.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.database import SessionLocal
from app.models import User, Attendance
from app.services.face_service import compare_faces
from datetime import datetime, date
import cv2, base64, json, numpy as np, face_recognition
from fastapi.responses import JSONResponse

router = APIRouter()

def b64_to_cv2_img(b64str):
    header, data = b64str.split(",", 1) if "," in b64str else (None, b64str)
    img_bytes = base64.b64decode(data)
    np_arr = np.frombuffer(img_bytes, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

@router.get("/start")
def start_attendance():
    cap = cv2.VideoCapture(0)  # kamera server
    if not cap.isOpened():
        return JSONResponse(content={"error": "Kamera tidak bisa diakses"}, status_code=500)

    ret, frame = cap.read()
    cap.release()

    if not ret:
        return JSONResponse(content={"error": "Gagal menangkap gambar"}, status_code=500)

    return {"message": "Kamera berhasil dijalankan"}

@router.websocket("/log-laptop")
async def attendance_ws(websocket: WebSocket):
    await websocket.accept()
    db = SessionLocal()
    users = db.query(User).all()
    known_encodings = [np.array(u.face_embedding) for u in users if u.face_embedding]
    known_names = [u.name for u in users]

    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            frame_b64 = payload.get("frame")

            frame = b64_to_cv2_img(frame_b64)
            small = cv2.resize(frame, (0,0), fx=0.5, fy=0.5)
            rgb_small = cv2.cvtColor(small, cv2.COLOR_BGR2RGB)

            face_encs = face_recognition.face_encodings(rgb_small)
            results_list = []

            for enc in face_encs:
                results, dists = compare_faces(known_encodings, enc)
                name, status = "Unknown", "NOT_FOUND"

                if True in results:
                    idx = int(np.argmin(dists))
                    name = known_names[idx]
                    user = users[idx]

                    today = date.today()
                    start_dt = datetime(today.year, today.month, today.day)
                    already = db.query(Attendance).filter(
                        Attendance.user_id == user.id,
                        Attendance.created_at >= start_dt
                    ).first()

                    if not already:
                        db.add(Attendance(user_id=user.id, status="HADIR"))
                        db.commit()
                        status = "HADIR"
                    else:
                        status = "ALREADY"

                results_list.append({"name": name, "status": status})

            await websocket.send_json({"results": results_list})

    except WebSocketDisconnect:
        print("client disconnected")


@router.websocket("/log-hp")
async def attendance_ws(websocket: WebSocket):
    await websocket.accept()
    db = SessionLocal()
    users = db.query(User).all()
    known_encodings = [np.array(u.face_embedding) for u in users if u.face_embedding]
    known_names = [u.name for u in users]

    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            frame_b64 = payload.get("frame")

            frame = b64_to_cv2_img(frame_b64)
            small = cv2.resize(frame, (0,0), fx=0.5, fy=0.5)
            rgb_small = cv2.cvtColor(small, cv2.COLOR_BGR2RGB)

            face_encs = face_recognition.face_encodings(rgb_small)
            results_list = []

            for enc in face_encs:
                results, dists = compare_faces(known_encodings, enc)
                name, status = "Unknown", "NOT_FOUND"

                if True in results:
                    idx = int(np.argmin(dists))
                    name = known_names[idx]
                    user = users[idx]

                    today = date.today()
                    start_dt = datetime(today.year, today.month, today.day)
                    already = db.query(Attendance).filter(
                        Attendance.user_id == user.id,
                        Attendance.created_at >= start_dt
                    ).first()

                    if not already:
                        db.add(Attendance(user_id=user.id, status="HADIR"))
                        db.commit()
                        status = "HADIR"
                    else:
                        status = "ALREADY"

                results_list.append({"name": name, "status": status})

            await websocket.send_json({"results": results_list})

    except WebSocketDisconnect:
        print("client disconnected")
