from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.flag import Flag
from app.models.user_targeting_rule import UserTargetingRule
from app.models.user_group_membership import UserGroupMembership
from app.models.flag_group import FlagGroup


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

    if not flag.enabled:
        return False

    user_id = user_context.get("user_id")

    if user_id is not None:

        # Check direct user targeting
        rule = (
            db.query(UserTargetingRule)
            .filter(
                UserTargetingRule.flag_id == flag.id,
                UserTargetingRule.user_id == str(user_id),
            )
            .first()
        )

        if rule:
            return True

        # Check group targeting
        memberships = (
            db.query(UserGroupMembership)
            .filter(
                UserGroupMembership.user_id == str(user_id)
            )
            .all()
        )

        group_ids = [m.group_id for m in memberships]

        if group_ids:
            group_rule = (
                db.query(FlagGroup)
                .filter(
                    FlagGroup.flag_id == flag.id,
                    FlagGroup.group_id.in_(group_ids)
                )
                .first()
            )

            if group_rule:
                return True

        return flag.default_value

    return flag.enabled