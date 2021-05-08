from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, VARCHAR

from db.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, nullable=False, unique=True, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    rating = Column(Integer, nullable=False, default=228)
    token = Column(VARCHAR(100), nullable=False)
    registration_date = Column(DateTime, nullable=False, default=datetime.utcnow)

    def __str__(self):
        return f'{self.name} has {self.rating} mmr!'
