import requests
from flask import Flask, request, jsonify, current_app
from flask_jwt_extended import jwt_required
from sqlalchemy.exc import SQLAlchemyError
import os
import pytesseract
from PIL import Image
from werkzeug.utils import secure_filename
from . import imageupload_bp


@imageupload_bp.route("/", methods=["POST"])
@jwt_required()
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"})

    image_file = request.files["image"]
    if image_file.filename == "":
        return jsonify({"error": "No selected image file"})

    if image_file and allowed_file(image_file.filename):
        filename = secure_filename(image_file.filename)
        filepath = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
        image_file.save(filepath)

        extracted_text = extract_text_from_image(filepath)

        # Delete the image file - save space on mount
        # revisit if we want to capture the path in the database
        # should there be a requirement to persist the image itself
        os.remove(filepath)

        # remove any images - again revisit
        image_cleanup = remove_all_images()

        return jsonify(
            {
                "filename": filename,
                "filepath": filepath,
                "text": extracted_text,
                "image_cleanup": image_cleanup,
            }
        )

    return jsonify({"error": "Invalid file type"})


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower()
        in current_app.config["ALLOWED_EXTENSIONS"]
    )


def remove_all_images():
    folder = current_app.config["UPLOAD_FOLDER"]

    try:
        for filename in os.listdir(folder):
            file_path = os.path.join(folder, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)

        return "All images removed successfully"
    except Exception as e:
        return f"An error occurred while removing images: {str(e)}"


from PIL import Image
import pytesseract


def extract_text_from_image(filepath):
    try:
        image = Image.open(filepath)
        text = pytesseract.image_to_string(image)
        return text
    except IOError as e:
        # Handle file not found or inaccessible error
        raise Exception("Error: File not found or inaccessible.") from e
    except pytesseract.TesseractError as e:
        # Handle Tesseract OCR errors
        raise Exception("Error: Tesseract OCR failed.") from e
    except Exception as e:
        # Handle any other exceptions
        raise Exception("Error: " + str(e)) from e
