import logging
import sys
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import load_config

from models import db


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

    return app


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
    with app.app_context():
        db.create_all()


def register_blueprints(app):
    from app.auth import auth_bp
    from app.main import main_bp
    from app.contact import contact_bp
    from app.library import library_bp
    from app.processimage import processimage_bp
    from app.recipe import recipe_bp
    from app.processurl import processurl_bp
    from app.imageupload import imageupload_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(main_bp)
    app.register_blueprint(contact_bp, url_prefix="/api/contacts")
    app.register_blueprint(library_bp, url_prefix="/api/library")
    app.register_blueprint(processimage_bp, url_prefix="/api/processimage")
    app.register_blueprint(recipe_bp, url_prefix="/api/recipe")
    app.register_blueprint(processurl_bp, url_prefix="/api/processurl")
    app.register_blueprint(imageupload_bp, url_prefix="/api/imageupload")


def initialize_extensions(app):
    # mail.init_app(app)
    pass


def register_error_handlers(app):
    pass


def configure_logging(app):
    pass
