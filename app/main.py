# app/main.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import os
from dotenv import load_dotenv
from app.database import init_db
from app.routes import log_routes, user_routes

app = FastAPI()

load_dotenv()

origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(log_routes.router, prefix="/ws", tags=["WebSockets"])
