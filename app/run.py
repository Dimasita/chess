from db.database import Base, engine
import db.models
from app import app


if __name__ == "__main__":
    Base.metadata.create_all(engine)
    app.run(host='0.0.0.0', port=5000, debug=True)
