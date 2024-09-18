import express from 'express';

import { connectDB } from '../database/db.js';
import http from 'http';
import io from 'socket.io';


const app = express();

// const server = http.createServer(app);


const server = http.createServer(app)

/// create a socket server 
const io = io(server);

/// create the connection id to connect the socket to the database
let connectionId = null;

/// create a connection to the database
connectDB()
.then(() => {
   /// listen the server
   server.listen(3000, () => {
      console.log("Server is running on port 3000");
   })
})
.catch((error) => {
   console.log("Error while Starting the Express Server",error)
   process.exit(1)   
})






export default server;



