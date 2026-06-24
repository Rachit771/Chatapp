const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("./message.controller");
const { protect } = require("../auth/auth.middleware");
const { messageRateLimiter } = require("./message-rate-limit.middleware");

const Messagerouter = express.Router();

Messagerouter.get("/:chatId",protect, allMessages);
Messagerouter.post("/", protect, messageRateLimiter, sendMessage);

module.exports = Messagerouter;
