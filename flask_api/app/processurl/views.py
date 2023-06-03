import requests
from flask import Flask, request, jsonify
from flask_jwt_extended import jwt_required
from bs4 import BeautifulSoup

# from models import Book, Contact, to_dict, db
from sqlalchemy.exc import SQLAlchemyError
from . import processurl_bp


@processurl_bp.route("/", methods=["POST"])
# @jwt_required()
def extract_text_from_url():
    try:
        data = request.get_json()
        if "url" in data:
            url = data["url"]
            contents = scrape_link(url)
            return jsonify({"url": url, "contents": contents})
        else:
            return jsonify({"error": "Invalid request. Missing 'url' parameter."}), 400
    except Exception as e:
        return jsonify({"error": str(e)})


def scrape_link(url):
    # Send a GET request to the recipe page
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Create a BeautifulSoup object with the HTML content
        soup = BeautifulSoup(response.content, "html.parser")

        # Remove unwanted elements (e.g., ads, tracking scripts)
        unwanted_tags = ["script", "style", "iframe", "img"]
        for tag in soup.find_all(unwanted_tags):
            tag.extract()

        # Extract the title from the page
        title = soup.title.string if soup.title else ""

        # Get the remaining text content
        content = soup.get_text(separator="\n")

        # Remove leading/trailing whitespace and empty lines
        content = "\n".join(
            line.strip() for line in content.splitlines() if line.strip()
        )

        # Return the cleaned content
        return {"url": url, "recipename": title, "contents": content}

    # If the request was not successful
    elif response.status_code == 403:
        # Return an error response with the message
        error_message = "Access to the URL is forbidden (403). Unable to gather information. Use Manual Input Option."
        return {"error": error_message}

    # If an error occurred or the response code is not handled
    else:
        # Return an error response with the message
        error_message = f"An error occurred: {response.status_code}"
        return {"error": error_message}
