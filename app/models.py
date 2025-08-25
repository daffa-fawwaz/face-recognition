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

    LogLaptop = relationship("log_laptop", back_populates="user")
    LogHp = relationship("log_hp", back_populates="user")

class LogLaptop(Base):
    __tablename__ = "log_laptop"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(Enum("HADIR","SAKIT","IZIN", name="status_enum"), default="HADIR")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="log_laptop")

class LogHp(Base):
    __tablename__ = "log_hp"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(Enum("HADIR","SAKIT","IZIN", name="status_enum"), default="HADIR")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="log_hp")
