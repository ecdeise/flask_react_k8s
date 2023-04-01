import logging
import sys
from flask import Flask, request, jsonify
from flask_login import UserMixin, LoginManager, login_required, current_user, login_user, current_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from config import load_config


app = Flask(__name__)
config_class = load_config()
# get config from env
app.config.from_object(config_class)
# enable CORS for all routes
cors = CORS(app)
# init the db
db = SQLAlchemy(app)
# authentication setup
login_manager = LoginManager(app)


# Create the necessary tables
# if os.environ.get('MODE') in ('DEVELOPMENT', 'TESTING'):
#     # Create the necessary tables
#     print('creating db')
#     db.create_all()

# set up logging
# Log the successful retrieval of the contact
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.DEBUG)

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s %(message)s')

# Log the value of SQLALCHEMY_DATABASE_URI
app.logger.debug(
    f"SQLALCHEMY_DATABASE_URI: {app.config['SQLALCHEMY_DATABASE_URI']}")

# We check if we are running directly or not
if __name__ != '__main__':
    # if we are not running directly, we set the loggers
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(120), nullable=True)

    def __repr__(self):
        return '<Contact %r>' % self.name


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password_hash = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/', methods=['GET'])
def index():
    app.logger.info(f'index route')
    logging.info(f'index route')
    return jsonify({'message': 'index'})


@app.route('/ping', methods=['GET'])
def ping():
    app.logger.info(f'ping route (app.logger)')
    logging.info(f'ping route (logging.info)')
    return jsonify({'message': 'pong'})


@app.route('/api/db_test', methods=['GET'])
@cross_origin()
def db_test():
    app.logger.info(f'/api/db_test route')
    logging.info(f'/api/db_test route')
    try:
        contact = Contact.query.get(1)
        if not contact:
            # Return a 404 error if the contact is not found
            app.logger.info(f'no contact at /api/db_test route')
            logging.info(f'no contact at /api/db_test route')
            return jsonify({'error': 'Contact not found'}), 404

        # Log the successful retrieval of the contact
        app.logger.info(f'Retrieved contact with id {contact.id}')
        logging.info(f'Retrieved contact with id {contact.id}')

        return jsonify({
            'id': contact.id,
            'name': contact.name,
            'email': contact.email,
            'phone': contact.phone,
            'address': contact.address
        })
    except SQLAlchemyError as e:
        # Log the error that occurred
        app.logger.info(f'SQLAlchemyError /api/db_test route (app.logger)')
        logging.info(f'SQLAlchemyError /api/db_test route (logger.info)')
        app.logger.error(
            f'SQLAlchemyError Error retrieving contact with id 1: {str(e)}')
        logging.error(
            f'SQLAlchemyError Error retrieving contact with id 1: {str(e)}')
        # Return a 500 error if there is a server error
        return jsonify({'error': f'Exception Error retrieving contact with id 1: {str(e)}'}), 500
    except Exception as e:
        app.logger.info(f'exception /api/db_test route (app.logger)')
        logging.info(f'exception /api/db_test route (logger.info)')
        # Log any other errors that occur
        app.logger.error(
            f'Exception Error retrieving contact with id 1: {str(e)}')
        logging.error(
            f'Exception Error retrieving contact with id 1: {str(e)}')
        # Return a 500 error if there is a server error
        return jsonify({'error': f'Exception Error retrieving contact with id 1: {str(e)}'}), 500


@app.route('/api/db_authn', methods=['GET'])
@cross_origin()
def db_authn():
    app.logger.info(f'/api/db_authn route')
    logging.info(f'/api/db_authn route')
    try:
        user = User.query.get(1)
        if not user:
            # Return a 404 error if the contact is not found
            app.logger.info(f'no user at /api/db_authn route')
            logging.info(f'no user at /api/db_authn route')
            return jsonify({'error': 'User not found'}), 404

        # Log the successful retrieval of the contact
        app.logger.info(f'Retrieved contact with id {user.id}')
        logging.info(f'Retrieved contact with id {user.id}')

        return jsonify({
            'id': user.id,
            'username': user.username,
        })
    except SQLAlchemyError as e:
        # Log the error that occurred
        app.logger.info(f'SQLAlchemyError /api/db_authn route (app.logger)')
        logging.info(f'SQLAlchemyError /api/db_authn route (logger.info)')
        app.logger.error(
            f'SQLAlchemyError Error retrieving user with id 1: {str(e)}')
        logging.error(
            f'SQLAlchemyError Error retrieving user with id 1: {str(e)}')
        # Return a 500 error if there is a server error
        return jsonify({'error': f'Exception Error retrieving user with id 1: {str(e)}'}), 500
    except Exception as e:
        app.logger.info(f'exception /api/db_authn route (app.logger)')
        logging.info(f'exception /api/db_authn route (logger.info)')
        # Log any other errors that occur
        app.logger.error(
            f'Exception Error retrieving user with id 1: {str(e)}')
        logging.error(
            f'Exception Error retrieving user with id 1: {str(e)}')
        # Return a 500 error if there is a server error
        return jsonify({'error': f'Exception Error retrieving user with id 1: {str(e)}'}), 500


@login_required
@app.route('/api/contacts', methods=['GET'])
@cross_origin()
def get_contacts():
    try:
        contacts = Contact.query.all()
        result = []
        for contact in contacts:
            result.append({
                'id': contact.id,
                'name': contact.name,
                'email': contact.email,
                'phone': contact.phone,
                'address': contact.address
            })

        # Log the successful retrieval of all contacts
        app.logger.info(f'Retrieved {len(result)} contacts')
        logging.info(f'Retrieved {len(result)} contacts')

        return jsonify({'contacts': result})
    except Exception as e:
        # Log any errors that occur
        app.logger.error(f'Error retrieving contacts: {str(e)}')
        logging.error(f'Error retrieving contacts: {str(e)}')
        # Return a 500 error if there is a server error
        return jsonify({'error': 'Server error'}), 500


@app.route('/api/contacts/<int:id>', methods=['GET'])
@cross_origin()
def get_contact_by_id(id):
    try:
        contact = Contact.query.get(id)
        if not contact:
            # Return a 404 error if the contact is not found
            return jsonify({'error': 'Contact not found'}), 404

        # Log the successful retrieval of the contact
        app.logger.info(f'Retrieved contact with id {id}')

        return jsonify({
            'id': contact.id,
            'name': contact.name,
            'email': contact.email,
            'phone': contact.phone,
            'address': contact.address
        })
    except Exception as e:
        # Log any errors that occur
        app.logger.error(f'Error retrieving contact with id {id}: {str(e)}')
        # Return a


@app.route('/api/contacts', methods=['POST'])
@cross_origin()
def add_contact():
    try:
        contact = Contact(
            name=request.json['name'],
            email=request.json['email'],
            phone=request.json['phone'],
            address=request.json['address']
        )
        db.session.add(contact)
        db.session.commit()
        return jsonify({'message': 'Contact added successfully.'})
    except Exception as e:
        logging.error(e)
        return jsonify({'error': 'Could not add contact.'}), 500


@app.route('/api/contacts/<int:id>', methods=['PUT'])
@cross_origin()
def update_contact(id):
    try:
        contact = Contact.query.get(id)
        contact.name = request.json['name']
        contact.email = request.json['email']
        contact.phone = request.json['phone']
        contact.address = request.json['address']
        db.session.commit()
        app.logger.info('Contact updated successfully.')
        return jsonify({'message': 'Contact updated successfully.'})
    except Exception as e:
        app.logger.error(str(e))
        logging.error(e)
        return jsonify({'error': 'Failed to update contact.'}), 500


@app.route('/api/contacts/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_contact(id):
    try:
        contact = Contact.query.get(id)
        db.session.delete(contact)
        db.session.commit()
        app.logger.info('Contact deleted successfully.')
        return jsonify({'message': 'Contact deleted successfully.'})
    except Exception as e:
        app.logger.error(str(e))
        return jsonify({'error': 'Failed to delete contact.'}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
