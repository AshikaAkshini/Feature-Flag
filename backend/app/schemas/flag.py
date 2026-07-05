from pydantic import BaseModel


class FlagBase(BaseModel):
    flag_key: str
    environment_id: int
    type: str
    default_value: str
    description: str | None = None
    owner_team: str | None = None
    enabled: bool = False


class FlagCreate(FlagBase):
    pass


class FlagUpdate(FlagBase):
    pass


class FlagResponse(FlagBase):
    id: int

    class Config:
        from_attributes = True