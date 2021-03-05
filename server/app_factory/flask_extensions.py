from flask_praetorian import Praetorian
from flask_sqlalchemy import SQLAlchemy

# Create accessible/importable instances of Flask extensions.
guard = Praetorian()
db = SQLAlchemy()
