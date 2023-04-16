# # # from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
# import logging
# import sys
# from flask import Flask, jsonify
# from flask_migrate import Migrate
# from flask_cors import CORS
# from config import load_config

# from models import Authuser, db
# from auth import auth_bp
# from contact import contact_bp


# app = Flask(__name__)

# config_class = load_config("flask_config.py")
# app.config.from_object(config_class)


# cors = CORS(app)

# db.init_app(app)
# migrate = Migrate(app, db)

# app.register_blueprint(auth_bp)
# app.register_blueprint(contact_bp)


# # set up logging
# app.logger.addHandler(logging.StreamHandler(sys.stdout))
# app.logger.setLevel(logging.DEBUG)

# logging.basicConfig(level=logging.DEBUG, format="%(asctime)s %(levelname)s %(message)s")

# # Log the value of SQLALCHEMY_DATABASE_URI
# app.logger.debug(f"SQLALCHEMY_DATABASE_URI: {app.config['SQLALCHEMY_DATABASE_URI']}")

# # We check if we are running directly or not
# if __name__ != "__main__":
#     # if we are not running directly, we set the loggers
#     gunicorn_logger = logging.getLogger("gunicorn.error")
#     app.logger.handlers = gunicorn_logger.handlers
#     app.logger.setLevel(gunicorn_logger.level)


# # Routes
# @app.route("/", methods=["GET"])
# def index():
#     app.logger.info(f"index route")
#     logging.info(f"index route")
#     return jsonify({"message": "index"})


# @app.route("/ping", methods=["GET"])
# def ping():
#     app.logger.info(f"ping route (app.logger)")
#     logging.info(f"ping route (logging.info)")
#     return jsonify({"message": "pong"})

from application import create_app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
