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

# Import routers
from app.routers.environment import router as environment_router
from app.routers.flags import router as flag_router

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

@app.get("/")
def home():
    return {"message": "Feature Flag System Backend Running"}

@app.get("/health")
def health_check():
    return {"status": "Backend is running"}