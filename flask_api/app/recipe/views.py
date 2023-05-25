from flask import Flask, request, jsonify
from flask_jwt_extended import jwt_required
from models import Recipe, to_dict, db
from sqlalchemy.exc import SQLAlchemyError
from . import recipe_bp


@recipe_bp.route("/byauthuser", methods=["GET"])
# @jwt_required()
def get_all_recipes_by_authuser():
    user_id = request.headers.get("X-User-ID")
    # recipes = Recipe.query.order_by(db.func.split_part(Recipe.recipename, ",", 1)).all()
    recipes = (
        Recipe.query.join(Recipe.authuser)
        .filter(Authuser.id == user_id)
        .order_by(db.func.split_part(Recipe.recipename, ",", 1))
        .all()
    )
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
    user_id = data.get("user_id")

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
        user_id=user_id,
    )

    # Save the recipe to the database
    db.session.add(recipe)
    db.session.commit()

    # Return a response indicating success
    return jsonify({"recipe": [to_dict(recipe)]}), 201


@recipe_bp.route("/<int:recipe_id>", methods=["DELETE"])
# @jwt_required()
def delete_recipe(recipe_id):
    # Get the book from the database
    recipe = Recipe.query.filter_by(id=recipe_id).first()

    # Check if the book exists
    if not recipe:
        return jsonify({"message": "Recipe not found."}), 404

    # Delete the book from the database
    db.session.delete(recipe)
    db.session.commit()

    return jsonify({"message": "Recipe deleted successfully."}), 200


@recipe_bp.route("/<int:recipe_id>", methods=["PUT"])
# @jwt_required()
def update_recipe(recipe_id):
    try:
        recipe = Recipe.query.get_or_404(recipe_id)
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

        recipe.recipename = recipe_name
        recipe.imageurl = recipe_image
        recipe.recipesource = recipe_source
        recipe.author = recipe_author
        recipe.keywords = recipe_keyword
        recipe.rating = recipe_rating
        recipe.cooktime = recipe_time
        recipe.allergens = recipe_allergens
        recipe.summary = recipe_summary
        recipe.recipe = recipe_content

        db.session.commit()
        return jsonify({"recipe": [to_dict(recipe)]}), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500
