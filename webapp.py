from web_socket_server import WebSocketServer, app, socketio
from flask import render_template

# Initialize the WebSocketServer with the Flask app
server = WebSocketServer(app)
messages = []

@socketio.on('message')
def handle_message(message):
    print(f"Received message: {message}")
    messages.append(message)
    socketio.send(message)

@socketio.on('get_user_messages')
def handle_get_user_messages(data):
    socketio.emit('get_user_messages', messages)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@app.route('/')
def index():
    return render_template('WebSocketClient.html')

if __name__ == '__main__':
    socketio.run(app)
