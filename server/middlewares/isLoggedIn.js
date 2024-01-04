const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    //Ekhane user ID ta extract kore nis and auth logic dish to check login
    req.user = {_id: 29/* dummy disi, ID diye nish*/};
    next();
}

module.exports = isLoggedIn;