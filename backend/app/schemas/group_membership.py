from pydantic import BaseModel


class GroupMembershipCreate(BaseModel):
    user_id: str
    group_id: int