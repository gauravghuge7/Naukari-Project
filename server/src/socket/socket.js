// server.js
import http from 'http';
import { Server } from 'socket.io'; // Import Socket.io
import cors from 'cors';
import app from "../app.js";

// Create an HTTP server
const server = http.createServer(app);

// CORS options
const corsOptions = {
   origin: process.env.CLIENT_URL,
   credentials: true // Allow credentials (if needed)
};

// Create a Socket.io server with CORS settings
const io = new Server(server, {
   cors: corsOptions,
});



io.on('connection', (socket) => {

   console.log('A user connected:', socket.id);

   // Listen for chat messages
   socket.on('chat message', (msg) => {
      console.log('Message received: ' + msg);

      io.emit('chat message', msg );

   });

   socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
   });
});





export default server;
