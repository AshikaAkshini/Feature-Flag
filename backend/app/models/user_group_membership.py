from sqlalchemy import Column, Integer, String
from app.database import Base


class UserGroupMembership(Base):
    __tablename__ = "user_group_memberships"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    group_name = Column(String(100), nullable=False)