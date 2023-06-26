import datetime
from datetime import timedelta
from models import Authuser, db
from . import auth_bp
from flask import jsonify, request, current_app
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import create_access_token, jwt_required


@auth_bp.route("/")
def index():
    return jsonify({"message": "/auth"})


@auth_bp.route("/signup", methods=["POST"])
def signup():
    username = request.json["username"]
    password = request.json["password"]
    email = request.json["email"]

    if not username or not password or not email:
        return jsonify({"error": "All fields are required"}), 400

    if Authuser.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    user = Authuser(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


def generate_access_token(user_id):
    access_token = create_access_token(identity=user_id)
    return access_token


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = Authuser.query.filter_by(username=data["username"]).first()
    if user is None or not user.check_password(data["password"]):
        return jsonify({"message": "Invalid username or password"}), 401

    # Set the expiration time for the access token
    expires_delta = datetime.timedelta(
        hours=4
    )  # modify to use current_app.config.get("JWT_ACCESS_TOKEN_EXPIRES", 4)

    # Generate an access token with the specified expiration time
    access_token = create_access_token(identity=user.id, expires_delta=expires_delta)

    return (
        jsonify(
            access_token=access_token,
            user_id=user.id,
        ),
        200,
    )


@auth_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify({"message": "success"})


@auth_bp.route("/logout", methods=["POST"])
def logout():
    return jsonify({"message": "Logged out successfully"}), 200


# @auth_bp.route("/check_login")
# def check_login():
#     if current_user.is_authenticated:
#         return jsonify({"message": "User is logged in"}), 200
#     else:
#         return jsonify({"message": "User is not logged in"}), 401


@auth_bp.errorhandler(SQLAlchemyError)
def handle_sqlalchemy_error(error):
    return jsonify({"error": f"SQLAlchemyError: {str(error)}"}), 500


@auth_bp.errorhandler(Exception)
def handle_exception(error):
    return jsonify({"error": f"Exception: {str(error)}"}), 500
