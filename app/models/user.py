from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, VARCHAR

from db_init import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, nullable=False, unique=True, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    rating = Column(Integer, nullable=False, default=0)
    token = Column(VARCHAR(100), nullable=True)
    registration_date = Column(DateTime, nullable=False, default=datetime.utcnow())

    def __str__(self):
        return f'{self.name} has {self.rating} mmr!'
