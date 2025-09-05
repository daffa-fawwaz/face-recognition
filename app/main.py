# app/main.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.database import init_db
from app.routes import log_routes, user_routes

app = FastAPI()

init_db()

app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(log_routes.router, prefix="/ws", tags=["WebSockets"])


origins = [
    "http://localhost:3000",  # FE development
    "http://127.0.0.1:3000",  # kalau FE akses pakai 127.0.0.1
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # bisa ganti jadi ["*"] kalau mau bebas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
