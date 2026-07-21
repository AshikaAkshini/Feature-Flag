from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.flag import FlagCreate, FlagUpdate, FlagResponse
from app.crud.flag import create_flag, get_flags, get_flag, update_flag
from app.crud.flag import delete_flag
from fastapi import HTTPException


router = APIRouter(prefix="/flags", tags=["Flags"])



@router.post("/", response_model=FlagResponse)
def create(flag: FlagCreate, db: Session = Depends(get_db)):
    return create_flag(db, flag)


@router.get("/", response_model=list[FlagResponse])
def read_all(db: Session = Depends(get_db)):
    return get_flags(db)


@router.get("/{key}", response_model=FlagResponse)
def read_one(key: str, db: Session = Depends(get_db)):
    flag = get_flag(db, key)

    if not flag:
        raise HTTPException(status_code=404, detail="Flag not found")

    return flag


@router.put("/{key}", response_model=FlagResponse)
def update(key: str, flag: FlagUpdate, db: Session = Depends(get_db)):
    print(flag)
    print(flag.model_dump())

    updated = update_flag(db, key, flag)

    if not updated:
        raise HTTPException(status_code=404, detail="Flag not found")

    return updated

@router.delete("/{flag_key}")
def remove_flag(flag_key: str, db: Session = Depends(get_db)):
    deleted_flag = delete_flag(db, flag_key)

    if deleted_flag is None:
        raise HTTPException(
            status_code=404,
            detail="Flag not found"
        )

    return {
        "message": "Flag deleted successfully",
        "flag_key": flag_key
    }