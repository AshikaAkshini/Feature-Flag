from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class UserGroupMembership(Base):
    __tablename__ = "user_group_membership"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        String,
        nullable=False
    )

    group_id = Column(
        Integer,
        ForeignKey("groups.id"),
        nullable=False
    )