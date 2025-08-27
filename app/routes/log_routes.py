from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.database import SessionLocal
from app.models import User, LogLaptop, LogHp
from app.services.face_service import compare_faces
from datetime import datetime, date
import cv2, base64, json, numpy as np, face_recognition

router = APIRouter()

def b64_to_cv2_img(b64str):
    header, data = b64str.split(",", 1) if "," in b64str else (None, b64str)
    img_bytes = base64.b64decode(data)
    np_arr = np.frombuffer(img_bytes, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

async def process_log(websocket: WebSocket, ModelClass):
    db = SessionLocal()
    users = db.query(User).all()
    known_encodings = [np.array(u.face_embedding) for u in users if u.face_embedding]
    known_names = [u.name for u in users]

    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            frame_b64 = payload.get("frame")
            action = payload.get("action", "mengambil")

            frame = b64_to_cv2_img(frame_b64)
            small = cv2.resize(frame, (0, 0), fx=0.5, fy=0.5)
            rgb_small = cv2.cvtColor(small, cv2.COLOR_BGR2RGB)

            face_encs = face_recognition.face_encodings(rgb_small)
            results_list = []

            for enc in face_encs:
                results, dists = compare_faces(known_encodings, enc)
                name, status = "Unknown", "NOT_FOUND"

                if True in results:
                    idx = int(np.argmin(dists))
                    user = users[idx]
                    name = user.name

                    today = date.today()
                    start_dt = datetime(today.year, today.month, today.day)
                    log = db.query(ModelClass).filter(
                        ModelClass.user_id == user.id,
                        ModelClass.created_at >= start_dt
                    ).first()

                    if not log:
                        log = ModelClass(user_id=user.id)
                        db.add(log)

                    if action == "mengambil":
                        log.mengambil = "SUDAH"
                    elif action == "mengembalikan":
                        log.mengembalikan = "SUDAH"

                    db.commit()
                    status = f"{action.upper()}_SUCCESS"

                results_list.append({"name": name, "status": status})

            await websocket.send_json({"results": results_list})

    except WebSocketDisconnect:
        print("client disconnected")
    finally:
        db.close()


@router.websocket("/log-laptop")
async def log_laptop_ws(websocket: WebSocket):
    await websocket.accept()
    await process_log(websocket, LogLaptop)


@router.websocket("/log-hp")
async def log_hp_ws(websocket: WebSocket):
    await websocket.accept()
    await process_log(websocket, LogHp)
