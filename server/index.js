//imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { socketServer, initializeSocket } = require("./utilities/socketService");

//middlewares
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//route imports
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

//routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

//db connection
mongoose
    .connect(process.env.DB_URL, {})
    .then(() => console.log("DB connection successful"))
    .catch((err) => console.log(err));

const server = app.listen(process.env.PORT || 5001, () => {
    console.log(
        `App listening on http://localhost:${process.env.PORT || 5001}`
    );
});

initializeSocket(server);
// const io = require("socket.io")(server, {
//     pingTimeout: 60000,
//     cors: {
//         origin: "http://localhost:5173",
//         // credentials: true,
//     },
// });

// io.on("connection", (socket) => {
//     console.log("Connected to socket.io");
//     socket.on("setup", (userData) => {
//         console.log("UserData", userData?._id);
//         socket.join(userData?._id);
//         socket.emit("connected");
//     });
//     socket.on("join room", (room) => {
//         console.log("Joining room", room);
//         socket.join(room);
//     });

//     socket.on("new message", (newMessageRecieved) => {
//         var chat = newMessageRecieved.chat;

//         if (!chat.users) return console.log("chat.users not defined");

//         chat.users.forEach((user) => {
//             if (user?._id == newMessageRecieved?.sender._id) return;

//             socket.in(user?._id).emit("message recieved", newMessageRecieved);
//         });
//     });

//     socket.off("setup", () => {
//         console.log("USER DISCONNECTED");
//         socket.leave(userData._id);
//     });
// });
