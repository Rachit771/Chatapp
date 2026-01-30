const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../Controller/messageController");
const { protect } = require("../MiddleWare/authMiddleWare");

const Messagerouter = express.Router();

Messagerouter.get("/:chatId",protect, allMessages);
Messagerouter.post("/",protect, sendMessage);

module.exports = Messagerouter;