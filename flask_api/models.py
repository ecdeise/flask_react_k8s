from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import class_mapper
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token

db = SQLAlchemy()


def to_dict(model):
    """Convert a SQLAlchemy model object to a dictionary."""
    columns = [c.key for c in class_mapper(model.__class__).columns]
    return dict((c, getattr(model, c)) for c in columns)


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(120), nullable=True)

    def __repr__(self):
        return "<Contact %r>" % self.name


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    authors = db.Column(db.String(80), nullable=False)
    isbn13 = db.Column(db.String(20), nullable=True)
    isbn10 = db.Column(db.String(20), nullable=True)
    language = db.Column(db.String(40), nullable=True)
    publisher = db.Column(db.String(40), nullable=False)
    year = db.Column(db.String(20), nullable=False)
    classification = db.Column(db.String(120), nullable=True)
    genre = db.Column(db.String(120), nullable=True)
    smallthumbnail = db.Column(db.String(255), nullable=True)
    thumbnail = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(80), nullable=True)

    def __repr__(self):
        return "<Book %r>" % self.title


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipename = db.Column(db.String(100), nullable=False)
    imageurl = db.Column(db.String(255))
    imagefile = db.Column(db.String(255))
    recipesource = db.Column(db.String(100))
    author = db.Column(db.String(80))
    keywords = db.Column(db.String(100))
    rating = db.Column(db.String(20))
    cooktime = db.Column(db.String(40))
    allergens = db.Column(db.String(100))
    summary = db.Column(db.String(255))
    recipe = db.Column(db.Text, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("authuser.id"), nullable=False)
    user = db.relationship("Authuser", backref=db.backref("recipes", lazy=True))

    def __repr__(self):
        return "<Recipe %r>" % self.name


class Authuser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password_hash = db.Column(db.String(128))
    email = db.Column(db.String(100), nullable=False, unique=True)
    authenticated = db.Column(db.Boolean, default=False)
    isadmin = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"<Authuser {self.username}>"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def is_active(self):
        """True, as all users are active."""
        return True

    def get_id(self):
        """Return the id requirement."""
        return self.id

    def get_user_by_email(self):
        return self.email

    def get_username(self):
        return self.username

    def is_authenticated(self):
        """Return True if the user is authenticated."""
        # return self.authenticated
        return True

    def is_admin(self):
        """Return True if the user is admin."""
        return self.isadmin

    # def is_anonymous(self):
    #     """False, as anonymous users aren't supported."""
    #     return False

    #     def check_password(self, password):
    #     return check_password_hash(self.password_hash, password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @staticmethod
    def get_jwt_identity(payload):
        user_id = payload["identity"]
        return Authuser.query.get(user_id)

    @staticmethod
    @jwt_required()
    def identity():
        user_id = get_jwt_identity().id
        return Authuser.query.get(user_id)
