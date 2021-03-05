import flask_praetorian as fp
from flask import jsonify, Blueprint, request
from app_factory.flask_extensions import guard

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
