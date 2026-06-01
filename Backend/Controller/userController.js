const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");

const allUsers = asyncHandler(async (req, res) => {
  const users = await userService.searchUsers(req.user._id, req.query.search);
  res.send(users);
});

module.exports = { allUsers };
