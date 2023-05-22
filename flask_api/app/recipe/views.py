from flask import Flask, request, jsonify
from flask_jwt_extended import jwt_required
from models import Recipe, to_dict, db
from sqlalchemy.exc import SQLAlchemyError
from . import recipe_bp


@recipe_bp.route("/all", methods=["GET"])
# @jwt_required()
def get_all_recipes():
    recipes = Recipe.query.order_by(db.func.split_part(Recipe.name, ",", 1)).all()
    return jsonify({"recipes": [to_dict(recipe) for recipe in recipes]})


@recipe_bp.route("/addrecipe", methods=["POST"])
# @jwt_required()
def add_recipe():
    # Get the data from the request
    data = request.json

    # Extract the recipe data from the request
    recipe_name = data.get("recipeName")
    recipe_source = data.get("recipeSource")
    recipe_author = data.get("recipeAuthor")
    recipe_keyword = data.get("recipeKeyword")
    recipe_rating = data.get("recipeRating")
    recipe_image = data.get("recipeImage")
    recipe_time = data.get("recipeTime")
    recipe_allergens = data.get("recipeAllergens")
    recipe_summary = data.get("recipeSummary")
    recipe_content = data.get("recipeContent")

    # Check if all the required fields are present
    if not recipe_name or not recipe_content:
        return jsonify({"message": "Please provide all the required fields."}), 400

    # Create a new Recipe object and populate its attributes
    recipe = Recipe(
        recipename=recipe_name,
        imageurl=recipe_image,
        recipesource=recipe_source,
        author=recipe_author,
        keywords=recipe_keyword,
        rating=recipe_rating,
        cooktime=recipe_time,
        allergens=recipe_allergens,
        summary=recipe_summary,
        recipe=recipe_content,
    )

    # Save the recipe to the database
    db.session.add(recipe)
    db.session.commit()

    # Return a response indicating success
    return jsonify({"recipe": [to_dict(recipe)]}), 201
