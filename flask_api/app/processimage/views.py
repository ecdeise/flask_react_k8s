import base64
import io
import pytesseract
from PIL import Image
from flask import Flask, request, jsonify
from isbnlib import meta, desc, classify, cover
from flask_jwt_extended import jwt_required

# from models import Book, Contact, to_dict, db
from sqlalchemy.exc import SQLAlchemyError
from . import processimage_bp


@processimage_bp.route("/imagetotext", methods=["POST"])
# @jwt_required()
def extract_text_from_image():
    try:
        # Get the base64 image data from the POST request
        image_data = request.form["image"]
        image_bytes = io.BytesIO(
            base64.b64decode(image_data.split(",")[1])
        )  # Decode the base64 data
        image = Image.open(image_bytes)  # Open the image using PIL
        text = pytesseract.image_to_string(image)
        return text
    except Exception as e:
        return jsonify({"error": str(e)})
