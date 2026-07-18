from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.group import Group
from app.schemas.group import GroupCreate, GroupResponse

router = APIRouter(
    prefix="/groups",
    tags=["Groups"]
)

# Create Group
@router.post("/", response_model=GroupResponse)
def create_group(group: GroupCreate, db: Session = Depends(get_db)):
    new_group = Group(
        name=group.name,
        description=group.description
    )

    db.add(new_group)
    db.commit()
    db.refresh(new_group)

    return new_group

# Get All Groups
@router.get("/", response_model=list[GroupResponse])
def get_groups(db: Session = Depends(get_db)):
    return db.query(Group).all()

