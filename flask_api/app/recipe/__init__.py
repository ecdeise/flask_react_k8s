from flask import Blueprint

recipe_bp = Blueprint("recipe", __name__, url_prefix="/api/recipe")

from . import views
