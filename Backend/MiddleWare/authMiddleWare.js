const jwt = require("jsonwebtoken");
const User = require("../Model/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // if decoded is false it will throw error and go to catch block means token is false
      

const user = await User.findById(decoded.id).select("-password");


if (!user) {
res.status(401);
throw new Error("User not found");
}


req.user = user;

     next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
      // if token is empty than this if block will be executed
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };