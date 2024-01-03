const profile = {
  fullname: "John Doe",
  email: "username@gmail.com",
  bio: "I am a fullstack developer",
  favTags: ["nodejs", "reactjs", "mongodb", "python"],
  badge: "Beginner",
  points: 100,
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
