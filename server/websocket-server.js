import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Client connected');

  ws.on('message', (message) => {
    // Broadcast message to all connected clients
    const messageData = JSON.parse(message);
    clients.forEach((client) => {
      if (client.readyState === 1) { // Check if client is open
        client.send(JSON.stringify(messageData));
      }
    });
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on port 8080');