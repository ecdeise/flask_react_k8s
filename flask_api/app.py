from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)  # enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://testuser:testpassword@172.17.0.2:5432/testdb'
db = SQLAlchemy(app)


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)

    def __repr__(self):
        return '<Contact %r>' % self.name


@app.route('/api/contacts', methods=['GET'])
@cross_origin()
def get_contacts():
    contacts = Contact.query.all()
    result = []
    for contact in contacts:
        result.append({
            'id': contact.id,
            'name': contact.name,
            'email': contact.email,
            'phone': contact.phone
        })

    return jsonify({'contacts': result})


@app.route('/api/contacts/<int:id>', methods=['GET'])
@cross_origin()
def get_contact(id):
    contact = Contact.query.get(id)
    return jsonify({
        'id': contact.id,
        'name': contact.name,
        'email': contact.email,
        'phone': contact.phone
    })


@app.route('/api/contacts', methods=['POST'])
@cross_origin()
def add_contact():
    contact = Contact(
        name=request.json['name'],
        email=request.json['email'],
        phone=request.json['phone']
    )
    db.session.add(contact)
    db.session.commit()
    return jsonify({'message': 'Contact added successfully.'})


@app.route('/api/contacts/<int:id>', methods=['PUT'])
@cross_origin()
def update_contact(id):
    contact = Contact.query.get(id)
    contact.name = request.json['name']
    contact.email = request.json['email']
    contact.phone = request.json['phone']
    db.session.commit()
    return jsonify({'message': 'Contact updated successfully.'})


@app.route('/api/contacts/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_contact(id):
    contact = Contact.query.get(id)
    db.session.delete(contact)
    db.session.commit()
    return jsonify({'message': 'Contact deleted successfully.'})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
