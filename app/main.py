# app/main.py
from fastapi import APIRouter, FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db, get_db
from app.routes import log_routes, user_routes
from app.models import User

app = FastAPI()


router = APIRouter()


@router.get("/count")
def get_users_count(db: Session = Depends(get_db)):
    total_users = db.query(User).count()
    return {"total_users": total_users}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(user_routes.router, prefix="/users", tags=["Users"])
app.include_router(log_routes.router, prefix="/ws", tags=["WebSockets"])
app.include_router(router, prefix="/users", tags=["Users"])
