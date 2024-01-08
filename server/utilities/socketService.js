const io = require("socket.io");

let socketServer;
const initializeSocket = (server) => {
    socketServer = io(server, {
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:5173",
            // credentials: true,
        },
    });

    socketServer.on("connection", (socket) => {
        console.log("Connected to socket.io");
        socket.on("setup", (userData) => {
            console.log("UserData", userData?._id);
            socket.join(userData?._id);
            socket.emit("connected");
        });
        socket.on("join room", (room) => {
            console.log("Joining room", room);
            socket.join(room);
        });

        socket.on("new message", (newMessageRecieved) => {
            var chat = newMessageRecieved.chat;

            if (!chat.users) return console.log("chat.users not defined");

            chat.users.forEach((user) => {
                if (user?._id == newMessageRecieved?.sender._id) return;

                socket
                    .in(user?._id)
                    .emit("message recieved", newMessageRecieved);
            });
        });

        socket.off("setup", () => {
            console.log("USER DISCONNECTED");
            socket.leave(userData._id);
        });
    });
};

module.exports = { initializeSocket, socketServer };
