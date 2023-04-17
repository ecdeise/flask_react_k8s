# # from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
import logging
import sys
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import load_config

from models import db, Authuser


def create_app():
    app = Flask(__name__)

    config_class = load_config("flask_config.py")
    app.config.from_object(config_class)

    cors = CORS(app)

    configure_database(app)

    jwt = JWTManager(app)

    # db.init_app(app)
    # migrate = Migrate(app, db)
    # Register blueprints
    register_blueprints(app)

    # Initialize flask extension objects
    # initialize_extensions(app)

    # Configure logging
    configure_logging(app)

    # Register error handlers
    register_error_handlers(app)

    # app.register_blueprint(auth_bp)
    # app.register_blueprint(contact_bp)

    # # set up logging
    # app.logger.addHandler(logging.StreamHandler(sys.stdout))
    # app.logger.setLevel(logging.DEBUG)

    # logging.basicConfig(
    #     level=logging.DEBUG, format="%(asctime)s %(levelname)s %(message)s"
    # )

    # # Log the value of SQLALCHEMY_DATABASE_URI
    # app.logger.debug(
    #     f"SQLALCHEMY_DATABASE_URI: {app.config['SQLALCHEMY_DATABASE_URI']}"
    # )

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

    return app


### Helper Functions ###


def configure_logging(app):
    # set up logging
    app.logger.addHandler(logging.StreamHandler(sys.stdout))
    app.logger.setLevel(logging.DEBUG)

    logging.basicConfig(
        level=logging.DEBUG, format="%(asctime)s %(levelname)s %(message)s"
    )

    # Log the value of SQLALCHEMY_DATABASE_URI
    app.logger.debug(
        f"SQLALCHEMY_DATABASE_URI: {app.config['SQLALCHEMY_DATABASE_URI']}"
    )

    # We check if we are running directly or not
    if __name__ != "__main__":
        # if we are not running directly, we set the loggers
        gunicorn_logger = logging.getLogger("gunicorn.error")
        app.logger.handlers = gunicorn_logger.handlers
        app.logger.setLevel(gunicorn_logger.level)


def configure_database(app):
    db.init_app(app)
    migrate = Migrate(app, db)


def register_blueprints(app):
    from app.auth import auth_bp
    from app.main import main_bp
    from app.contact import contact_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(main_bp)
    app.register_blueprint(contact_bp, url_prefix="/api/contacts")


def initialize_extensions(app):
    # mail.init_app(app)
    pass


def register_error_handlers(app):
    pass


def configure_logging(app):
    pass
