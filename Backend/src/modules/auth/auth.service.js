const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../users/user.model");
const { createServiceError } = require("../../shared/errors/service-error");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });

const formatAuthResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  pic: user.pic,
  token: generateToken(user._id),
});

const signup = async ({ name, email, password, pic }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createServiceError("User already exists. Please login.", 409);
  }

  const user = await User.create({ name, password, email, pic });
  if (!user) {
    throw createServiceError("User failed to create", 400);
  }

  return formatAuthResponse(user);
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createServiceError("Please sign up first", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw createServiceError("Incorrect password", 401);
  }

  return formatAuthResponse(user);
};

module.exports = { login, signup };
