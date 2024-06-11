from flask import Flask
from flask_socketio import SocketIO

socketio = SocketIO()
app = Flask(__name__)

class WebSocketServer:
    def __init__(self, app):
        self.app = self.create_app(app, debug=False)

    def create_app(self, app, debug):
        app.debug = debug
        socketio.init_app(app, cors_allowed_origins="*")
        return app