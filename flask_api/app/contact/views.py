import logging
from flask import current_app, jsonify, request
from flask_jwt_extended import jwt_required
from models import Authuser, Contact, to_dict, db
from sqlalchemy.exc import SQLAlchemyError
from . import contact_bp


@contact_bp.route("/", methods=["GET"])
# @jwt_required()
def get_all_contacts():
    try:
        contacts = Contact.query.order_by(Contact.name).all()

        logging.info(f"Retrieved {len(contacts)} contacts")
        return jsonify({"contacts": [to_dict(contact) for contact in contacts]}), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500


@contact_bp.route("/<int:contact_id>", methods=["GET"])
# @jwt_required()
def get_contact_by_id(contact_id):
    try:
        contact = Contact.query.get_or_404(contact_id)
        return jsonify({"contacts": [to_dict(contact)]}), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500


@contact_bp.route("", methods=["POST"])
# @jwt_required()
def add_contact():
    name = request.json["name"]
    email = request.json["email"]
    phone = request.json["phone"]
    address = request.json["address"]
    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400
    contact = Contact(name=name, email=email, phone=phone, address=address)
    db.session.add(contact)
    db.session.commit()
    return jsonify({"contacts": [to_dict(contact)]}), 201


@contact_bp.route("/<int:contact_id>", methods=["PUT"])
# @jwt_required()
def update_contact(contact_id):
    try:
        contact = Contact.query.get_or_404(contact_id)
        name = request.json["name"]
        email = request.json["email"]
        phone = request.json["phone"]
        address = request.json["address"]
        if not name or not email:
            return jsonify({"error": "Name and email are required"}), 400
        contact.name = name
        contact.email = email
        contact.phone = phone
        contact.address = address
        db.session.commit()
        return jsonify({"contacts": [to_dict(contact)]}), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500


@contact_bp.route("/<int:contact_id>", methods=["DELETE"])
# @jwt_required()
def delete_contact(contact_id):
    try:
        contact = Contact.query.get_or_404(contact_id)
        db.session.delete(contact)
        db.session.commit()
        return jsonify({"message": f"Contact with id {contact_id} deleted"}), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500
