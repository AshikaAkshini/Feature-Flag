from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

from app.database import Base


class UserTargetingRule(Base):
    __tablename__ = "user_targeting_rule"

    id = Column(Integer, primary_key=True, index=True)

    flag_id = Column(Integer, ForeignKey("flags.id"))

    user_id = Column(String, nullable=False)

    flag = relationship("Flag")