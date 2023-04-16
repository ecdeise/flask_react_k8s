from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import class_mapper
from werkzeug.security import check_password_hash, generate_password_hash


db = SQLAlchemy()


def to_dict(model):
    """Convert a SQLAlchemy model object to a dictionary."""
    columns = [c.key for c in class_mapper(model.__class__).columns]
    return dict((c, getattr(model, c)) for c in columns)


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(120), nullable=True)

    def __repr__(self):
        return "<Contact %r>" % self.name


class Authuser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password_hash = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)

    def __repr__(self):
        return f"<Authuser {self.username}>"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
