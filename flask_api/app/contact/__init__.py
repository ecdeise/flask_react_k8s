from flask import Blueprint

contact_bp = Blueprint("contact", __name__, url_prefix="/api/contacts")

from . import views
