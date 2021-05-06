from db.database import Base, engine
import db.models
from app import app


if __name__ == "__main__":
    # Base.metadata.create_all(engine)
    app.run(port=80, debug=True)
