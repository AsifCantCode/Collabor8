const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  //Ekhane user ID ta extract kore nis and auth logic dish to check login
  const { _id } = req.body.profile;
  next();
};

module.exports = isLoggedIn;
