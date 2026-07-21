from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.core.evaluation import evaluate_flag
from app.schemas.evaluation import (
    EvaluationRequest,
    EvaluationResponse,
)

router = APIRouter(
    prefix="/evaluate",
    tags=["Evaluation"],
)


@router.post("/", response_model=EvaluationResponse)
def evaluate(
    request: EvaluationRequest,
    db: Session = Depends(get_db),
):
    user_context = {}

    if request.user_id is not None:
        user_context["user_id"] = request.user_id

    result = evaluate_flag(
        db=db,
        flag_key=request.flag_key,
        environment_id=request.environment_id,
        user_context=user_context,
    )

    return EvaluationResponse(
    flag_key=result["flag_key"],
    enabled=result["enabled"],
    user_id=result["user_id"],
    status=result["status"],
    bucket=result["bucket"],
    rollout=result["rollout"],
    final_result=result["final_result"],
)