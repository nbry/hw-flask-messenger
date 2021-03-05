from datetime import datetime
from sqlalchemy.exc import IntegrityError

from app_factory.flask_extensions import db, guard


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    username = db.Column(db.String(15), nullable=False, unique=True)
    hashed_password = db.Column(db.Text, nullable=False)
    roles = db.Column(db.Text)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # *****************************
    # API-related methods:
    # *****************************
    @classmethod
    def check_for_duplicate_account(cls, username: str, email: str):
        """
        To be used when a user is trying to sign up.
        Ensure no duplicate account exists (i.e. account with email OR username
        that user is requesting to register with).
        """
        check_username = cls.lookup(username) if username else False
        check_email = cls.lookup_by_email(email) if email else False
        return check_username or check_email

    @classmethod
    def register(cls, username: str, raw_pass: str, email: str):
        """
        Register user for an account w/hashed password.
        Ensure unique username and email.
        Return user.
        """
        hashed_pass = guard.hash_password(raw_pass)
        new_user = cls(username=username,
                       hashed_password=hashed_pass,
                       email=email)

        db.session.add(new_user)

        try:
            db.session.commit()
            return new_user
        except IntegrityError:
            db.session.rollback()
            return None

    # *****************************
    # REQUIRED PROPERTIES AND METHODS BY FLASK PRAETORIAN:
    # *****************************

    @property
    def identity(self):
        """
        REQUIRED PROPERTY BY FLASK PRAETORIAN:
        Provides unique id of the user instance.
        """
        return self.id

    # noinspection PyBroadException
    @property
    def rolenames(self):
        """
        REQUIRED PROPERTY BY FLASK PRAETORIAN:
        Provides a list of strings that describe the roles attached to the user instance.
        """
        try:
            return self.roles.split(",")
        except Exception:
            return []

    @property
    def password(self):
        """
        REQUIRED PROPERTY BY FLASK PRAETORIAN:
        Provides hashed password assigned to user instance.
        """
        return self.hashed_password

    @classmethod
    def lookup(cls, username: str):
        """
        REQUIRED METHOD BY FLASK PRAETORIAN:
        Returns a user instance if there is one that matches username
        or None if there is not.
        """
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def lookup_by_email(cls, email: str):
        """
        Returns a user instance if there is one that matches email
        or None if there is not.
        """
        return cls.query.filter_by(email=email).one_or_none()

    @classmethod
    def identify(cls, user_id: int):
        """
        REQUIRED METHOD BY FLASK PRAETORIAN:
        Returns a user instance if there is one that matches id
        or None if there is not.
        """
        return cls.query.get(user_id)
