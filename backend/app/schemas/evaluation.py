from typing import Optional
from pydantic import BaseModel


class EvaluationRequest(BaseModel):
    flag_key: str
    environment_id: int
    user_id: Optional[str] = None


class EvaluationResponse(BaseModel):
    flag_key: str
    enabled: bool
    user_id: Optional[str] = None
    status: str
    bucket: Optional[int] = None
    rollout: int
    final_result: bool