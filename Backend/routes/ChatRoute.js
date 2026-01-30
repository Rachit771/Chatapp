const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../Controller/chatController");
const { protect } = require("../MiddleWare/authMiddleWare");

const Chatrouter = express.Router();

Chatrouter.post("/",protect, accessChat);
Chatrouter.get("/",protect, fetchChats);
Chatrouter.post("/group",protect, createGroupChat);
Chatrouter.put("/rename",protect, renameGroup);
Chatrouter.put("/groupremove",protect, removeFromGroup);
Chatrouter.put("/groupadd",protect, addToGroup);

module.exports = Chatrouter;