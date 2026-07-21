from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.models.user_group_membership import UserGroupMembership
from app.database import get_db
from app.schemas.group_membership import GroupMembershipCreate
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session


router = APIRouter(
    prefix="/group-memberships",
    tags=["Group Memberships"]
)


@router.get("/")
def get_group_memberships(
    db: Session = Depends(get_db)
):
    memberships = db.query(UserGroupMembership).all()
    return memberships


@router.post("/")
def create_membership(
    data: GroupMembershipCreate,
    db: Session = Depends(get_db)
):

    membership = UserGroupMembership(
        user_id=data.user_id,
        group_id=data.group_id
    )

    db.add(membership)
    db.commit()
    db.refresh(membership)

    return membership

@router.delete("/{membership_id}")
def delete_membership(membership_id: int, db: Session = Depends(get_db)):
    membership = (
        db.query(UserGroupMembership)
        .filter(UserGroupMembership.id == membership_id)
        .first()
    )

    if not membership:
        raise HTTPException(status_code=404, detail="Membership not found")

    db.delete(membership)
    db.commit()

    return {"message": "Membership deleted"}