from pydantic import BaseModel


class UserTargetRuleCreate(BaseModel):
    flag_id: int
    user_id: str


class UserTargetRuleResponse(BaseModel):
    id: int
    flag_id: int
    user_id: str

    class Config:
        from_attributes = True