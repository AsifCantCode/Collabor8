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
            //            newAnswerRecieved {
            //   answerText: 'notification check',
            //   images: [ 'images_1704814453354.png' ],
            //   createdBy: { _id: '659abe1b5efa51ca31fdcda1', fullname: 'Asif Abrar' },
            //   questionId: {
            //     _id: '659a3a7d40c3234842c5fba6',
            //     AuthorId: '659a345bc895bcd08d5a3ef3',
            //     title: 'TEST QUESTION',
            //     textContent: '<p>ABCD</p>',
            //     selectedImage: [ 'images_1704606332982.png' ],
            //     tagList: [ 'mern', 'react' ],
            //     countUpVotes: 0,
            //     countDownVotes: 0,
            //     upVotes: [],
            //     downVotes: [],
            //     countAnswers: 0,
            //     isSolved: false,
            //     answers: [
            //       '659c064756501befa0860959',
            //       '659c090956501befa0860997',
            //       '659c0ee956501befa0860a2e',
            //       '659d65999dccf97058f46a2e',
            //       '659d65dfac57e03bdd898e5f'
            //     ],
            //     postTime: '2024-01-07T05:45:33.013Z',
            //     updateTime: '2024-01-07T05:45:33.013Z',
            //     __v: 0
            //   },
            //   isAccepted: false,
            //   countUpvotes: 0,
            //   countDownvotes: 0,
            //   countComments: 0,
            //   upvotes: [],
            //   downvotes: [],
            //   _id: '659d6775911cc8803f6e07c0',
            //   createdAt: '2024-01-09T15:34:13.361Z',
            //   updatedAt: '2024-01-09T15:34:13.361Z',
            //   comments: [],
            //   __v: 0
            // }
        });

        socket.off("setup", () => {
            console.log("USER DISCONNECTED");
            socket.leave(userData._id);
        });
    });
};

module.exports = { initializeSocket, socketServer };
