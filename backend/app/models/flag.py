from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.database import Base


class Flag(Base):
    __tablename__ = "flags"

    id = Column(Integer, primary_key=True, index=True)
    flag_key = Column(String(100), unique=True, nullable=False, index=True)
    environment_id = Column(Integer, ForeignKey("environments.id"), nullable=False, index=True)

    type = Column(String(50), nullable=False)          # boolean/string/number
    default_value = Column(Boolean, nullable=False, default=False)
    description = Column(String(255))
    owner_team = Column(String(100))

    enabled = Column(Boolean, default=False)