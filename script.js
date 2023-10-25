const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public')); // Servir conteúdo estático

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Quando uma mensagem é recebida, transmita para todos os clientes
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
