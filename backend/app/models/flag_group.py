from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base


class FlagGroup(Base):
    __tablename__ = "flag_groups"

    id = Column(Integer, primary_key=True, index=True)

    flag_id = Column(
        Integer,
        ForeignKey("flags.id"),
        nullable=False
    )

    group_id = Column(
        Integer,
        ForeignKey("groups.id"),
        nullable=False
    )