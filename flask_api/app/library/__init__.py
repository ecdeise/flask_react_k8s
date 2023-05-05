from flask import Blueprint

library_bp = Blueprint("library", __name__, url_prefix="/api/library")

from . import views