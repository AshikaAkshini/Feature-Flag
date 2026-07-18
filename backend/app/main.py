from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Import all models
from app.models.environment import Environment
from app.models.flag import Flag
from app.models.flag_version import FlagVersion
from app.models.targeting_rule import TargetingRule
from app.models.user_group_membership import UserGroupMembership
from app.models.audit_log import AuditLog
from app.models.user_targeting_rule import UserTargetingRule

# Import routers
from app.routers.environment import router as environment_router
from app.routers.flags import router as flag_router
from app.routers import evaluate
from app.routers import user_targeting_rule
from app.routers.groups import router as groups_router
from app.routers.group_memberships import router as group_memberships_router
from app.routers.flag_groups import router as flag_groups_router
from app.models.group import Group
from app.models.flag_group import FlagGroup
from app.routers.flag_groups import router as flag_groups_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(environment_router)
app.include_router(flag_router)
app.include_router(evaluate.router)
app.include_router(groups_router)
app.include_router(group_memberships_router)
app.include_router(flag_groups_router)


app.include_router(
    user_targeting_rule.router,tags=["User Targeting"])

@app.get("/")
def home():
    return {"message": "Feature Flag System Backend Running"}

@app.get("/health")
def health_check():
    return {"status": "Backend is running"}



