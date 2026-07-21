from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.flag import Flag
from app.models.user_targeting_rule import UserTargetingRule
from app.models.user_group_membership import UserGroupMembership
from app.models.flag_group import FlagGroup
from app.core.rollout import get_bucket


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

    user_id = user_context.get("user_id")

    # Flag Disabled
    if not flag.enabled:
        return {
        "flag_key": flag.flag_key,
        "enabled": False,
        "user_id": user_id,
        "status": "Flag Disabled",
        "bucket": None,
        "rollout": flag.rollout_percentage,
        "final_result": False,
    }

    # User Targeting
    if user_id is not None:

        rule = (
            db.query(UserTargetingRule)
            .filter(
                UserTargetingRule.flag_id == flag.id,
                UserTargetingRule.user_id == str(user_id),
            )
            .first()
        )

        if rule:
            return {
        "flag_key": flag.flag_key,
        "enabled": True,
        "user_id": str(user_id),
        "status": "Matched User Target",
        "bucket": None,
        "rollout": flag.rollout_percentage,
        "final_result": True,
    }

        # Group Targeting
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
                return {
                    "flag_key": flag.flag_key,
                    "enabled": flag.enabled,
                    "user_id": user_id,
                    "status": "Matched Group Target",
                     "bucket": None,
                    "rollout": flag.rollout_percentage,
                    "final_result": True,
                }

        # Percentage Rollout
        bucket = get_bucket(str(user_id), flag.flag_key)

        if bucket < flag.rollout_percentage:
            return {
                "flag_key": flag.flag_key,
                "enabled": flag.enabled,
                "user_id": user_id,
                "status": "Inside Rollout",
                "bucket": bucket,
                "rollout": flag.rollout_percentage,
                "final_result": True,
            }

        return {
            "flag_key": flag.flag_key,
            "enabled": flag.enabled,
            "user_id": user_id,
            "status": "Outside Rollout",
            "bucket": bucket,
            "rollout": flag.rollout_percentage,
            "final_result": flag.default_value,
        }

    # No user id
    return {
        "flag_key": flag.flag_key,
        "enabled": flag.enabled,
        "user_id": None,
        "status": "No User ID",
        "bucket": None,
        "rollout": flag.rollout_percentage,
        "final_result": flag.enabled,
    }