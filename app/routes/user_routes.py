# app/routes/user_routes.py
from fastapi import APIRouter, UploadFile, File, Form
import face_recognition
import numpy as np
import cv2
from app.database import SessionLocal
from app.models import User, Attendance
from app.services.face_service import get_face_encoding

router = APIRouter()

@router.post("/register")
async def register_user(name: str = Form(...), file: UploadFile = File(...)):
    db = SessionLocal()
    img_bytes = await file.read()
    np_arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    encoding = get_face_encoding(rgb)
    if not encoding:
        return {"error": "Wajah tidak terdeteksi"}

    user = User(
        name=name,
        face_embedding=encoding
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User registered", "user_id": user.id}


@router.get("/all")
def get_all_attendance():
    db = SessionLocal()
    records = db.query(Attendance).join(User).all()

    result = []
    for r in records:
        result.append({
            "id": r.id,
            "user_id": r.user_id,
            "name": r.user.name if r.user else None,
            "status": r.status,
            "created_at": r.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    return {"attendance": result}
