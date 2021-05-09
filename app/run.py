from services.database import Base, engine
from models import *
from client import app


if __name__ == "__main__":
    Base.metadata.create_all(engine)
    app.run(host='0.0.0.0', port=5000, debug=True)
    # for debug
    # app.run(host='localhost', port=80, debug=True)
