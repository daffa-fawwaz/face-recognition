# app/main.py
from fastapi import FastAPI
from app.database import init_db
from app.routes import log_routes, user_routes

app = FastAPI()

init_db()

app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(log_routes.router, prefix="/ws", tags=["WebSockets"])
