const socket = new WebSocket('ws://localhost:8080');

const chatBox = document.getElementById('chat-box');

socket.onopen = () => {
  console.log('Connected to server');
};

socket.onmessage = (event) => {
  const msg = document.createElement('div');
  msg.textContent = event.data;
  chatBox.appendChild(msg);
};

function sendMessage() {
  const input = document.getElementById('msgInput');
  const message = input.value;
  socket.send(message);
  input.value = '';
}
