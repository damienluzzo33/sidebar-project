const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

//* use cors middleware to prevent common issues
app.use(cors());
//* crete http server with our express app
const server = http.createServer(app);

//* set up new socket.io server with cors specification for the origin of our app
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

//* listening for an event with id=connection
io.on("connection", (socket) => {

    console.log(`${socket.id} joined the thread`);

    socket.on("join_chat", (data) => {
        socket.join(data);
        console.log(`User ${socket.id} joined room ${data}`)
    });

    socket.on("send_message", (data) => {
        socket.to(data.chat).emit("receive_message", data);
    })

    //* set up listener for when user disconnects
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });

})

//* set up server to listen on 3001 bc React will run on 3000
server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
});

