from models import Authuser, db
from . import auth_bp
from flask import jsonify, render_template, request, redirect, url_for
from sqlalchemy.exc import SQLAlchemyError


@auth_bp.route("/")
def index():
    # return render_template("main/index.html")
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


@auth_bp.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    authuser = Authuser.query.filter_by(username=username).first()

    if not authuser or not authuser.check_password(password):
        return jsonify({"error": "Invalid username or password"}), 401

    # login_user(authuser)
    # if current_user.is_authenticated:
    #     logging.info({current_user})
    return jsonify({"message": "Logged in successfully"}), 200


@auth_bp.route("/logout", methods=["POST"])
# @login_required
def logout():
    # logout_user()
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
