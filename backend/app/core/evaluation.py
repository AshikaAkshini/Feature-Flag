from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.flag import Flag


def evaluate_flag(
    db: Session,
    flag_key: str,
    environment_id: int,
    user_context: dict,
):
    flag = (
        db.query(Flag)
        .filter(
            Flag.flag_key == flag_key,
            Flag.environment_id == environment_id,
        )
        .first()
    )

    if flag is None:
        raise HTTPException(
            status_code=404,
            detail="Flag not found"
        )

    return flag.enabled