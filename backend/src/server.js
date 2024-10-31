require("dotenv").config();
const express = require('express');

const serverConfig = require("./config/serverConfig");

const app = express();

serverConfig(app);

// server for socket
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const httpServer = createServer();
// const socket = new Server(httpServer, {
//   cors: {
//     origin: "http://127.0.0.1:5500/",
//   },
// });

// socket.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// })

// app.get('/', (req, res) => {
//     res.send('Hello from Express and Socket.IO!');
// });

// const port = process.env.PORT || 8080

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// })

