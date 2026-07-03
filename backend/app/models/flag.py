from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.database import Base


class Flag(Base):
    __tablename__ = "flags"

    id = Column(Integer, primary_key=True, index=True)
    flag_key = Column(String(100), unique=True, nullable=False, index=True)
    environment_id = Column(Integer, ForeignKey("environments.id"), nullable=False, index=True)
    enabled = Column(Boolean, default=False)