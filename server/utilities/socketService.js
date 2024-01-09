const io = require("socket.io");

let socketServer;
const { addNotification } = require("../controllers/notificationController");
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
                // socketServer.in(userTo).emit("notification", newNotification);
                addNotification(
                    user?._id,
                    "message",
                    newMessageRecieved?._id,
                    socket
                );
            });
        });

        socket.on("new answer", (newAnswerRecieved) => {
            console.log("newAnswerRecieved", newAnswerRecieved);
            const userId = newAnswerRecieved?.questionId?.AuthorId;
            const questionId = newAnswerRecieved?.questionId?._id;
            addNotification(userId, "answer", questionId, socket);
        });
        socket.on("new reply", (newReplyRecieved) => {
            console.log("newReplyRecieved", newReplyRecieved);
            const { data, author } = newReplyRecieved;
            const userId = data?.createdBy?._id;
            const questionId = data?.questionId;
            if (userId !== author)
                addNotification(userId, "reply", questionId, socket);
            //             newReplyRecieved {
            //   createdBy: { _id: '659abe1b5efa51ca31fdcda1', fullname: 'Asif Abrar' },
            //   _id: '659d6b011dae51067764d5d9',
            //   answerText: 'hello',
            //   images: [],
            //   questionId: '659a3a7d40c3234842c5fba6',
            //   isAccepted: false,
            //   countUpvotes: 0,
            //   countDownvotes: 0,
            //   countComments: 0,
            //   upvotes: [],
            //   downvotes: [],
            //   createdAt: '2024-01-09T15:49:21.437Z',
            //   updatedAt: '2024-01-09T15:49:21.437Z',
            //   comments: [
            //     {
            //       userId: [Object],
            //       commentText: 'hello',
            //       _id: '659d6c401be22ee56812ef57'
            //     }
            //   ],
            //   __v: 1
            // }
        });

        socket.off("setup", () => {
            console.log("USER DISCONNECTED");
            socket.leave(userData._id);
        });
    });
};

module.exports = { initializeSocket, socketServer };
