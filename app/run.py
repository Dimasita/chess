from flask import Flask
from config import APP_SECRET_KEY
import api.server
import client
from db_init import Base, engine
from models import *
import redis_init


if __name__ == "__main__":
    Base.metadata.create_all(engine)

    app = Flask(__name__)
    app.secret_key = APP_SECRET_KEY
    app.register_blueprint(client.bp)
    app.register_blueprint(api.server.bp)

    app.run(host='0.0.0.0', port=5000, debug=True)

    # for debug
    # app.run(host='localhost', port=80, debug=True)
