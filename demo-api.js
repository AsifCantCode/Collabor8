const profile = {
    fullname: "John Doe",
    email: "username@gmail.com",
    bio: "I am a fullstack developer",
    favTags: ["nodejs", "reactjs", "mongodb", "python"],
    badge: "Beginner",
    points: 100,
    questionLeft: 5,
    follower: 2,
    subscription: {
        status: true,
        plan: "monthly",
        expire: "2021-12-31",
    },
    expertUser: true,
    following: {
        count: 2,
        users: [
            { _id: "123", fullname: "John Doe" },
            { _id: "123", fullname: "John Doe" },
        ],
    },
};

// Expert User means he has previledge to be an instructor.

const singleQuestion = {
    _id: "123",
    question: "How to create a REST API with NodeJS and ExpressJS",
    description: "I want to create a REST API with NodeJS and ExpressJS",
    tags: ["nodejs", "expressjs", "mongodb"],
    images: ["image1.jpg", "image2.jpg"],
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    author: {
        _id: "123",
        fullname: "John Doe",
    },
    countUpvote: 2,
    countDownvote: 0,
    countAnswers: 2,
    isSolved: true,
    answers: {
        count: 2,
        answer: [
            {
                _id: "123",
                answer: "You can create a REST API with NodeJS and ExpressJS by following the below steps",
                images: ["image1.jpg", "image2.jpg"],
                createdAt: "2021-01-01",
                updatedAt: "2021-01-01",
                createdBy: {
                    _id: "123",
                    fullname: "John Doe",
                },
                isAccepted: true,
                countUpvote: 2,
                countDownvote: 0,
                countComments: 2,
                comments: {
                    count: 2,
                    commentList: [
                        {
                            _id: "123",
                            fullname: "John Doe",
                            comment: "This is a great answer",
                        },
                    ],
                },
            },
        ],
    },
};

const singleAnswer = {
    _id: "123",
    answer: "You can create a REST API with NodeJS and ExpressJS by following the below steps",
    images: ["image1.jpg", "image2.jpg"],
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
    createdBy: {
        _id: "123",
        fullname: "John Doe",
    },
    question_id: "123",
    isAccepted: true,
    countUpvote: 2,
    countDownvote: 0,
    countComments: 2,
    comments: {
        count: 2,
        commentList: [
            {
                _id: "123",
                fullname: "John Doe",
                comment: "This is a great answer",
            },
        ],
    },
};

const tags = [
    {
        _id: "123",
        name: "nodejs",
        questionCount: 10,
        questionInLastWeek: 0,
    },
    {
        _id: "3343",
        name: "reactjs",
        questionCount: 10,
        questionInLastWeek: 4,
    },
];
