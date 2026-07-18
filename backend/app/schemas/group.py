from pydantic import BaseModel

class GroupCreate(BaseModel):
    name: str
    description: str | None = None


class GroupResponse(BaseModel):
    id: int
    name: str
    description: str | None = None

    class Config:
        from_attributes = True   # Pydantic v2