from flask import Flask

# Blueprints
from api.home_handler import home_handler
from api.ping_handler import ping_handler

# Extensions
from app_factory.flask_extensions import db


# Models - Keep this here for now. Will use this for authentication library
# from models.user import User


# *****************************
# APPLICATION FACTORY
# *****************************

def create_app(config_file=None):
    """
    Create instance of a Flask app with configurations based on a provided
    file as an argument. Returns the app
    """

    # Create Flask App Instance
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_pyfile(config_file)

    # Bind Extensions and Blueprints
    initialize_extensions(app)
    register_blueprints(app)

    return app


# *****************************
# INITIALIZING EXTENSIONS
# *****************************

def initialize_extensions(app):
    """
    Pass Flask extensions to an instantiated Flask app.
    """

    db.init_app(app)


# *****************************
# REGISTERING BLUEPRINTS
# *****************************

def register_blueprints(app):
    """
    Register all blueprints to an instantiated Flask application.
    """
    app.register_blueprint(home_handler)
    app.register_blueprint(ping_handler)
