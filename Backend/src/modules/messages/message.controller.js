const asyncHandler = require("express-async-handler");
const messageService = require("./message.service");

const sendServiceError = (res, error) => {
  res.status(error.statusCode || 400);
  throw new Error(error.message);
};

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await messageService.getMessages(req.params.chatId);
    res.json(messages);
  } catch (error) {
    sendServiceError(res, error);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const message = await messageService.sendMessage(
      req.user._id,
      req.body.content,
      req.body.chatId
    );
    res.json(message);
  } catch (error) {
    sendServiceError(res, error);
  }
});

module.exports = { allMessages, sendMessage };
