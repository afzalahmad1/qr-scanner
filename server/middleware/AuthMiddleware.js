const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuth = (req, res, next) => {
  const token = req.headers["x-job"];
//   console.log("token",token);
  let verified;

  try {
    verified = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.json({
      message: "JWT not provided. Please login",
      data: err,
    });
  }

  if (verified) {
    req.locals = verified;
    next();
  } else {
    res.json({
      message: "User not authenticated. Please login",
    });
  }
};

module.exports = { isAuth };