from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.flag_group import FlagGroup
from app.schemas.flag_group import FlagGroupCreate
from fastapi import HTTPException

router = APIRouter(
    prefix="/flag-groups",
    tags=["Flag Groups"]
)


@router.get("/")
def get_flag_groups(db: Session = Depends(get_db)):
    return db.query(FlagGroup).all()


@router.post("/")
def create_flag_group(
    data: FlagGroupCreate,
    db: Session = Depends(get_db)
):
    existing = (
        db.query(FlagGroup)
        .filter(
            FlagGroup.flag_id == data.flag_id,
            FlagGroup.group_id == data.group_id
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Group already assigned to this flag"
        )

    flag_group = FlagGroup(
        flag_id=data.flag_id,
        group_id=data.group_id
    )

    db.add(flag_group)
    db.commit()
    db.refresh(flag_group)

    return flag_group

@router.get("/{flag_id}")
def get_flag_groups_by_flag(
    flag_id: int,
    db: Session = Depends(get_db)
):
    flag_groups = (
        db.query(FlagGroup)
        .filter(FlagGroup.flag_id == flag_id)
        .all()
    )

    return flag_groups