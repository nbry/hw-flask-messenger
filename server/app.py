import os
from flask_cors import CORS
from app_factory import create_app

config_settings = os.environ.get("APP_CONFIG_SETTINGS", "development.cfg")
app = create_app(config_settings)
CORS(app)
