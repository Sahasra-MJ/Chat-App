const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  // Send JSON welcome message
  const welcome = {
    name: "Server",
    message: "You're connected to the chat!"
  };
  ws.send(JSON.stringify(welcome));

  ws.on('message', function incoming(data) {
    let parsed;

    try {
      parsed = JSON.parse(data);
    } catch (err) {
      console.error("Invalid message from client (not JSON):", data);
      return;
    }

    // Broadcast to all clients including sender
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsed));
      }
    });
  });
});
