# config.py
import os


class Config:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "geheimnis"
    JWT_SECRET_KEY = "jwt_geheimnis_key"


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_ECHO = True
    UPLOAD_FOLDER = "/home/ecdeise/Code/flask_react_k8s/flask_api/uploads"
    SQLALCHEMY_DATABASE_URI = (
        "postgresql+psycopg2://testuser:testpassword@localhost:5434/testdb"
    )


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = (
        "postgresql+psycopg2://testuser:testpassword@localhost/testdb"
    )


class ProductionConfig(Config):
    # SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DATABASE_URI')
    SQLALCHEMY_DATABASE_URI = (
        "postgresql+psycopg2://testuser:testpassword@postgres-service/testdb"
    )
    SQLALCHEMY_ECHO = True


def load_config(mode=os.environ.get("MODE")):
    try:
        if mode == "PRODUCTION":
            print("Using Config: ProductionConfig")
            return ProductionConfig
        elif mode == "TESTING":
            print("Using Config: TestingConfig")
            return TestingConfig
        else:
            print("Using Config: DevelopmentConfig")
            return DevelopmentConfig
    except ImportError:
        return Config
