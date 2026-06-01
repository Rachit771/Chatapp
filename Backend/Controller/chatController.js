const asyncHandler = require("express-async-handler");
const chatService = require("../services/chatService");

const sendServiceError = (res, error) => {
  res.status(error.statusCode || 400);
  throw new Error(error.message);
};

const accessChat = asyncHandler(async (req, res) => {
  try {
    const { chat, created } = await chatService.accessChat(
      req.user._id,
      req.body.userId
    );
    res.status(created ? 201 : 200).json(chat);
  } catch (error) {
    sendServiceError(res, error);
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    res.status(200).send(await chatService.fetchChats(req.user._id));
  } catch (error) {
    sendServiceError(res, error);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  try {
    const users = req.body.users ? JSON.parse(req.body.users) : null;
    const chat = await chatService.createGroupChat(
      req.user,
      users,
      req.body.name
    );
    res.status(200).json(chat);
  } catch (error) {
    sendServiceError(res, error);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  try {
    res.json(await chatService.renameGroup(req.body.chatId, req.body.chatName));
  } catch (error) {
    sendServiceError(res, error);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  try {
    res.json(
      await chatService.removeFromGroup(req.body.chatId, req.body.userId)
    );
  } catch (error) {
    sendServiceError(res, error);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  try {
    res.json(await chatService.addToGroup(req.body.chatId, req.body.userId));
  } catch (error) {
    sendServiceError(res, error);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
