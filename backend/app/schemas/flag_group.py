from pydantic import BaseModel


class FlagGroupCreate(BaseModel):
    flag_id: int
    group_id: int