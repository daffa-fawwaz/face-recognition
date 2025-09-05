# app/routes/user_routes.py
from fastapi import APIRouter, UploadFile, File, Form
import numpy as np
import cv2
from app.database import SessionLocal
from app.models import User, LogBook
from app.services.face_service import get_face_encoding

router = APIRouter()

@router.post("/register")
async def register_user(name: str = Form(...), file: UploadFile = File(...), tipe_class: str = Form(...)):
    db = SessionLocal()
    try:
        img_bytes = await file.read()
        np_arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        encoding = get_face_encoding(rgb)
        if not encoding:
            return {"error": "Wajah tidak terdeteksi"}

        user = User(
            name=name,
            face_embedding=encoding,
            tipe_class=tipe_class
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return {"message": "User registered", "user_id": user.id}
    finally:
        db.close()

@router.get("/all/log-laptop")
def get_all_laptop_logs():
    db = SessionLocal()
    try:
        records = db.query(LogBook).filter(LogBook.tipe == "LAPTOP").join(User).all()

        result = []
        for r in records:
            result.append({
                "id": r.id,
                "user_id": r.user_id,
                "name": r.user.name if r.user else None,
                "tipe": r.tipe,
                "mengambil": r.mengambil,
                "mengembalikan": r.mengembalikan,
                "created_at": r.created_at.strftime("%Y-%m-%d %H:%M:%S")
            })

        return {"log-laptop": result}
    finally:
        db.close()


@router.get("/all/log-hp")
def get_all_hp_logs():
    db = SessionLocal()
    try:
        records = db.query(LogBook).filter(LogBook.tipe == "HP").join(User).all()

        result = []
        for r in records:
            result.append({
                "id": r.id,
                "user_id": r.user_id,
                "name": r.user.name if r.user else None,
                "tipe": r.tipe,
                "mengambil": r.mengambil,
                "mengembalikan": r.mengembalikan,
                "created_at": r.created_at.strftime("%Y-%m-%d %H:%M:%S")
            })

        return {"log-hp": result}
    finally:
        db.close()

@router.get("/all/users")
def get_all_users():
    db = SessionLocal()
    try:
        users = db.query(User).all()
        return {"users": users}
    finally:
        db.close()