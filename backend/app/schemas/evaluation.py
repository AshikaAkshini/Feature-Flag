from typing import Optional
from pydantic import BaseModel


class EvaluationRequest(BaseModel):
    flag_key: str
    environment_id: int
    user_id: Optional[int] = None


class EvaluationResponse(BaseModel):
    flag_key: str
    enabled: bool



