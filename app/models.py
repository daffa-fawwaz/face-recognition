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

    # relasi harus lowercase dan konsisten dengan back_populates di log
    log_laptops = relationship("LogLaptop", back_populates="user")
    log_hps = relationship("LogHp", back_populates="user")

class LogLaptop(Base):
    __tablename__ = "log_laptop"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    mengambil = Column(Enum("SUDAH","BELUM", name="status_enum"), default="BELUM")
    mengembalikan = Column(Enum("SUDAH","BELUM", name="status_enum"), default="BELUM")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="log_laptops")

class LogHp(Base):
    __tablename__ = "log_hp"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    mengambil = Column(Enum("SUDAH","BELUM", name="status_enum"), default="BELUM")
    mengembalikan = Column(Enum("SUDAH","BELUM", name="status_enum"), default="BELUM")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="log_hps")
