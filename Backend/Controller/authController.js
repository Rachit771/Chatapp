const asyncHandler = require("express-async-handler");
const authService = require("../services/authService");

const sendServiceError = (res, error) => {
  res.status(error.statusCode || 400);
  throw new Error(error.message);
};

const signupHandle = asyncHandler(async (req, res) => {
  try {
    res.status(201).json(await authService.signup(req.body));
  } catch (error) {
    sendServiceError(res, error);
  }
});

const loginHandle = asyncHandler(async (req, res) => {
  try {
    res.status(200).json(await authService.login(req.body));
  } catch (error) {
    sendServiceError(res, error);
  }
});

module.exports = { signupHandle, loginHandle };
