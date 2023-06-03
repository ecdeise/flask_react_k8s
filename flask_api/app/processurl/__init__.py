from flask import Blueprint

processurl_bp = Blueprint("processurl", __name__, url_prefix="/api/processurl")

from . import views
