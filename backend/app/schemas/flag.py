from pydantic import BaseModel
from datetime import datetime


class FlagBase(BaseModel):
    flag_key: str
    environment_id: int
    type: str = "boolean"
    default_value: bool
    description: str | None = None
    owner_team: str | None = None
    enabled: bool = False
    rollout_percentage: int = 100


class FlagCreate(FlagBase):
    pass
class FlagUpdate(FlagBase):
    pass
class FlagResponse(FlagBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

