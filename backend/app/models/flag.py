from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.sql import func
from app.database import Base

class Flag(Base):
    __tablename__ = "flags"

    __table_args__ = (
        UniqueConstraint("flag_key", "environment_id", name="uq_flag_environment"),
    )

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    id = Column(Integer, primary_key=True, index=True)

    flag_key = Column(String(100), nullable=False, index=True)
    environment_id = Column(Integer, ForeignKey("environments.id"), nullable=False, index=True)

    type = Column(String(50), nullable=False)
    default_value = Column(Boolean, nullable=False, default=False)
    description = Column(String(255))
    owner_team = Column(String(100))
    enabled = Column(Boolean, default=False)
    rollout_percentage = Column(Integer, default=100)