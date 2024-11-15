import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import express from "express"

// Using http
// const server = http.createServer((request, response) => {
//   console.log(new Date() + "Received request for" + request.url);
//   response.end("hi there");
// });
//
// const wss = new WebSocketServer({ server });
//
// wss.on("connection", (socket) => {
//   socket.on("error", console.error);
//
//   socket.on("message", function message(data, isBinary) {
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });
//
//   socket.send("Hello! Message from Server!!");
// });
//
// server.listen(8080, () => {
//   console.log(new Date() + "Server is listening on port 8080");
// });

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(socket) {
  socket.on('error', console.error);

  socket.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  socket.send('Hello! Message From Server!!');
});
