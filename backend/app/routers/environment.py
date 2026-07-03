from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.environment import Environment

router = APIRouter()


@router.get("/environments")
def get_environments(db: Session = Depends(get_db)):
    return db.query(Environment).all()