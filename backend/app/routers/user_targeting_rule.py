from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.user_targeting_rule import UserTargetingRule
from app.schemas.user_targeting_rule import (
    UserTargetRuleCreate,
    UserTargetRuleResponse,
)

router = APIRouter(
    prefix="/target-users",
    tags=["User Targeting"]
)


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Add User to Whitelist
@router.post("/", response_model=UserTargetRuleResponse)
def add_target_user(
    rule: UserTargetRuleCreate,
    db: Session = Depends(get_db)
):
    # Check if this user is already assigned to this flag
    existing = db.query(UserTargetingRule).filter(
        UserTargetingRule.flag_id == rule.flag_id,
        UserTargetingRule.user_id == rule.user_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="User already exists for this flag"
        )

    new_rule = UserTargetingRule(
        flag_id=rule.flag_id,
        user_id=rule.user_id
    )

    db.add(new_rule)
    db.commit()
    db.refresh(new_rule)

    return new_rule


# Get Users by Flag
@router.get("/{flag_id}", response_model=list[UserTargetRuleResponse])
def get_target_users(
    flag_id: int,
    db: Session = Depends(get_db)
):
    return db.query(UserTargetingRule).filter(
        UserTargetingRule.flag_id == flag_id
    ).all()


# Delete User
@router.delete("/{id}")
def delete_target_user(
    id: int,
    db: Session = Depends(get_db)
):
    rule = db.query(UserTargetingRule).filter(
        UserTargetingRule.id == id
    ).first()

    if not rule:
        raise HTTPException(
            status_code=404,
            detail="Rule not found"
        )

    db.delete(rule)
    db.commit()

    return {"message": "Deleted Successfully"}