# app/models.py
from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, JSON
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(225))
    face_embedding = Column(JSON)   # simpan vector encoding
    created_at = Column(DateTime, default=datetime.utcnow)

    attendances = relationship("Attendance", back_populates="user")

class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(Enum("HADIR","SAKIT","IZIN", name="status_enum"), default="HADIR")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="attendances")
