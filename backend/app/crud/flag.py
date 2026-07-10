from sqlalchemy.orm import Session
from app.models.flag import Flag
from app.schemas.flag import FlagCreate, FlagUpdate


def create_flag(db: Session, flag: FlagCreate):
    try:
        db_flag = Flag(**flag.model_dump())
        db.add(db_flag)
        db.commit()
        db.refresh(db_flag)
        return db_flag
    except Exception as e:
        db.rollback()
        print("ERROR:", e)
        raise


def get_flags(db: Session):
    return db.query(Flag).all()


def get_flag(db: Session, key: str):
    return db.query(Flag).filter(Flag.flag_key == key).first()


def update_flag(db: Session, key: str, flag: FlagUpdate):
    db_flag = db.query(Flag).filter(Flag.flag_key == key).first()

    if not db_flag:
        return None

    for field, value in flag.model_dump().items():
        setattr(db_flag, field, value)

    db.commit()
    db.refresh(db_flag)

    return db_flag


def delete_flag(db: Session, flag_key: str):
    # Find the flag using flag_key
    db_flag = db.query(Flag).filter(Flag.flag_key == flag_key).first()

    if not db_flag:
        return None

    # Delete the flag
    db.delete(db_flag)
    db.commit()

    return db_flag