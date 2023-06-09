from flask import Flask, request, jsonify
from isbnlib import meta, desc, classify, cover
from flask_jwt_extended import jwt_required
from models import Book, Contact, to_dict, db
from sqlalchemy.exc import SQLAlchemyError
from . import library_bp


@library_bp.route("/all", methods=["GET"])
@jwt_required()
def get_all_books():
    books = Book.query.order_by(db.func.split_part(Book.authors, ",", 1)).all()
    return jsonify({"books": [to_dict(book) for book in books]})


@library_bp.route("/info/<isbn>", methods=["GET"])
def get_book_by_isbn(isbn):
    book_info = meta(isbn)
    classification = classify(isbn)
    description = desc(isbn)
    cover_url = cover(isbn)
    info = {
        "book_info": book_info,
        "classification": classification,
        "description": description,
        "cover": cover_url,
    }
    return jsonify(info)


# This route deletes a book by its ID
@library_bp.route("/book/<int:book_id>", methods=["DELETE"])
@jwt_required()
def delete_book(book_id):
    # Get the book from the database
    book = Book.query.filter_by(id=book_id).first()

    # Check if the book exists
    if not book:
        return jsonify({"message": "Book not found."}), 404

    # Delete the book from the database
    db.session.delete(book)
    db.session.commit()

    return jsonify({"message": "Book deleted successfully."}), 200


# This route takes information about a book and adds it to the catalog
@library_bp.route("/addbook", methods=["POST"])
@jwt_required()
def add_book():
    book_info = request.get_json()["book_info"]
    classification = request.get_json()["classification"]
    cover = request.get_json()["cover"]
    description = request.get_json()["description"]

    title = book_info["Title"]
    authors = book_info["Authors"]
    isbn13 = book_info["ISBN-13"]
    language = book_info["Language"]
    publisher = book_info["Publisher"] or "Unspecified"
    year = book_info["Year"]
    smallthumbnail = cover.get("smallThumbnail") or None
    thumbnail = cover.get("thumbnail") or None

    # Check if all the required fields are present
    if (
        not title
        or not authors
        or not isbn13
        or not language
        or not publisher
        or not year
    ):
        return jsonify({"message": "Please provide all the required fields."}), 400

    # Create a new book object
    book = Book(
        title=title,
        authors=", ".join(authors) if len(authors) > 1 else authors[0],
        isbn13=isbn13,
        language=language,
        publisher=publisher,
        year=year,
        smallthumbnail=smallthumbnail,
        thumbnail=thumbnail,
        description=description,
        classification=classification if len(classification) > 0 else None,
    )

    # Save the book to the database
    db.session.add(book)
    db.session.commit()

    # Return the book object
    return jsonify({"book": [to_dict(book)]}), 201
