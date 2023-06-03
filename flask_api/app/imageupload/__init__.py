from flask import Blueprint

imageupload_bp = Blueprint("imageupload", __name__, url_prefix="/api/imageupload")

from . import views
