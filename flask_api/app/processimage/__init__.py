from flask import Blueprint

processimage_bp = Blueprint("processimage", __name__, url_prefix="/api/processimage")

from . import views
