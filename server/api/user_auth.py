# NEEDS ATTENTION IN THE FUTURE: IMPLEMENT A MORE RIGOROUS CHECK FOR EMAIL VERIFICATION UPON REGISTRATION:

from flask import jsonify, Blueprint, request
from app_factory.flask_extensions import guard
from models.user import User

user_auth_api = Blueprint('user_auth_api', __name__)


@user_auth_api.route('/login', methods=['POST'])
def login():
    """
    Handle a post request to login. Get username and password provided
    in the request body. If user can be authenticated, return a token
    """
    req = request.json

    # Authenticate using Praetorian's built in method. Returns None if authentication unsuccessful
    user = guard.authenticate(
        req.get('username', None),
        req.get('password', None)
    )

    # If successfully authenticated, return a message and a JWT (status: 200)
    if user:
        message = {
            "message": f"Successfully logged into {user.username}'s account",
            "token": guard.encode_jwt_token(user)
        }
        return jsonify(message)

    # If not, return an appropriate auth message. This code *shouldn't* run because
    # Praetorian's authenticate method should handle auth errors for you. However, I like
    # have this as a catch all
    else:
        message = {"message": "Authentication failed."}
        return jsonify(message), 401


@user_auth_api.route('/register', methods=['POST'])
def register_for_account():
    """
     Handle a post request to register for a new user account.
     If successful, return a token.
    """
    req = request.json
    username = req.get("username", None)
    password = req.get("password", None)
    email = req.get("email", None)

    # Check if password in request is less than 6 characters
    # NEEDS ATTENTION IN THE FUTURE: IMPLEMENT A MORE RIGOROUS CHECKING FOR EMAIL VERIFICATION:
    if len(password) < 6 or len(username) < 6 or len(username) > 15 or not email:
        return jsonify({"message": "INVALID USERNAME/PASSWORD",
                        "username_constraints": "Username must be unique and between 5 and 15 characters",
                        "password_constraints": "Password must be 8 to 50 characters in length",
                        "email_constraints": "A valid email address is required"},
                       ), 400

    # Check to see if there is an existing user
    if User.check_for_duplicate_account(username, email):
        message = {
            "message": "Account already exists with that email/username",
            "status": 400
        }
        return jsonify(message), 400

    # Sign Up for user using information from the request
    new_user = User.register(username, password, email)

    # If successfully created, return a message and a JWT
    if new_user:
        message = {
            "message": f"Successfully created account for {new_user.username}",
            "token": guard.encode_jwt_token(new_user)
        }
        return jsonify(message), 201

    else:
        message = {"message": "Something went wrong"}
        return jsonify(message), 400
