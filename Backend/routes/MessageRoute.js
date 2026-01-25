const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../MiddleWare/authMiddleware");

const Messagerouter = express.Router();

Messagerouter.get("/:chatId",protect, allMessages);
Messagerouter.post("/",protect, sendMessage);

module.exports = Messagerouter;