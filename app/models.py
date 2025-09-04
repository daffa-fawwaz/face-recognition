# app/models.py
from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, JSON
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(225))
    face_embedding = Column(JSON)
    tipe_class = Column(String(225))
    created_at = Column(DateTime, default=datetime.utcnow)

    logs = relationship("LogBook", back_populates="user")


class LogBook(Base):
    __tablename__ = "log_books"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    tipe = Column(Enum("LAPTOP", "HP", name="tipe_enum"), nullable=False)
    mengambil = Column(
        Enum("SUDAH", "BELUM", name="status_enum"), default="BELUM")
    mengembalikan = Column(
        Enum("SUDAH", "BELUM", name="status_enum"), default="BELUM")

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="logs")
