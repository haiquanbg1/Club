var createError = require("http-errors");
var path = require("path");
var logger = require("morgan");
const express = require("express");
const cors = require("cors");
const apiRouter = require("../routes/api");
const cookieParser = require("cookie-parser");
var session = require("express-session");
const { corsOptions } = require("../config/corsOptions");
const http = require('http');
const socketIo = require('socket.io');
// const helmet = require('helmet');

module.exports = (app) => {
    app.use(
        session({
            secret: "club secret",
            resave: false,
            saveUninitialized: false,
        })
    );

    // config req.body
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));

    // config routes
    app.use("/api/v1", cors(corsOptions), apiRouter);
    // app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.send(err);
    });


    // server for socket
    const server = http.createServer(app);
    const io = socketIo(server, {
        cors: ["http://127.0.0.1:5500", 'http://localhost:5173/']
    });

    io.on('connection', (socket) => {
        const { channelId } = socket.handshake.query;
        socket.join(channelId);

        console.log(`User connected to channel: ${channelId}`);

        // Lắng nghe sự kiện 'message' từ máy khách
        socket.on('message', (msg) => {
            console.log('Message from client:', msg);

            // Gửi lại sự kiện 'message' đến tất cả các máy khách
            // io.to(channelId).emit('message', `'Hello from server', 'message client' + ${msg}`);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected from channel: ${channelId}`);
        });

        socket.on('on-chat', (message) => {
            io.to(channelId).emit('on-chat', message);
        });

        socket.on('delete-my-message', (message) => {
            io.to(channelId).emit('delete-my-message', message);
        });

        socket.on('delete-other-message', (message) => {
            io.to(channelId).emit('delete-other-message', message);
        });

        socket.on('receive-react', (message) => {
            io.to(channelId).emit('receive-react', message);
        });

        socket.on('send-react', (message) => {
            io.to(channelId).emit('send-react', message);
        });

        socket.on('on-chat-club', (message) => {
            io.to(channelId).emit('on-chat-club', message);
        });
    });


    // Bắt đầu lắng nghe trên một cổng cụ thể, ví dụ: cổng 8080
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });

    return server;
};
