const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../Controller/messageController");
const { protect } = require("../MiddleWare/authMiddleWare");
const { messageRateLimiter } = require("../MiddleWare/messageRateLimiter");

const Messagerouter = express.Router();

Messagerouter.get("/:chatId",protect, allMessages);
Messagerouter.post("/", protect, messageRateLimiter, sendMessage);

module.exports = Messagerouter;
