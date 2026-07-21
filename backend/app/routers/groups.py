from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.group import Group
from app.schemas.group import GroupCreate, GroupResponse
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session

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

@router.delete("/{group_id}")
def delete_group(group_id: int, db: Session = Depends(get_db)):
    group = db.query(Group).filter(Group.id == group_id).first()

    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    db.delete(group)
    db.commit()

    return {"message": "Group deleted successfully"}
