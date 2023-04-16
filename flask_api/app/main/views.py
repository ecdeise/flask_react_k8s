import logging
from . import main_bp
from flask import jsonify, render_template, request, redirect, url_for

# Routes


@main_bp.route("/", methods=["GET"])
def index():
    # app.logger.info(f"index route")
    logging.info(f"index route")
    return jsonify({"message": "index"})


@main_bp.route("/ping", methods=["GET"])
def ping():
    # app.logger.info(f"ping route (app.logger)")
    logging.info(f"ping route (logging.info)")
    return jsonify({"message": "pong"})
