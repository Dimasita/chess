from db_init import session as db
from models.user import User


def get_top_rating_users(amount: int = 10) -> list:
    users = db.query(User).order_by(User.rating)[:amount]
    return users
