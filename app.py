import os
import logging
from dotenv import load_dotenv
from flask import Flask

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.getenv("SESSION_SECRET", "dev-secret-key-for-testing")

# Import routes
from routes import *
