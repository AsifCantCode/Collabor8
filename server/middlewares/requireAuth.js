const jwt = require("jsonwebtoken");
// const User = require("../model/userModel");

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id, email, fullname } = jwt.verify(token, process.env.JWT_SECRET); //can add other properties during sign

    req.body.profile = {
      _id,
      email,
      fullname,
    };
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: "Request not authorized" });
  }
};

module.exports = requireAuth;
