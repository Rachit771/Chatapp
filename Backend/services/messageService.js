const Message = require("../Model/messageModel");
const User = require("../Model/userModel");
const Chat = require("../Model/chatModel");
const {
  cacheMessages,
  getCachedMessages,
  invalidateChatLists,
  invalidateMessageCache,
} = require("../utils/redisUtils");
const { createServiceError } = require("../utils/serviceError");

const getMessages = async (chatId) => {
  const cachedMessages = await getCachedMessages(chatId);
  if (cachedMessages) {
    return cachedMessages;
  }

  const messages = await Message.find({ chat: chatId })
    .populate("sender", "name pic email")
    .populate("chat");

  await cacheMessages(chatId, messages);
  return messages;
};

const sendMessage = async (senderId, content, chatId) => {
  if (!content || !chatId) {
    throw createServiceError("Content and chatId are required", 400);
  }

  let message = await Message.create({
    sender: senderId,
    content,
    chat: chatId,
  });

  message = await message.populate("sender", "name pic");
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "name pic email",
  });

  await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

  const chatUserIds = message.chat.users.map((user) => user._id);

  await Promise.all([
    invalidateMessageCache(chatId),
    invalidateChatLists(chatUserIds),
  ]);

  return message;
};

module.exports = { getMessages, sendMessage };
