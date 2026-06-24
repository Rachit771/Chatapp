const Chat = require("./chat.model");
const User = require("../users/user.model");
const {
  cacheChatList,
  getCachedChatList,
  invalidateChatLists,
} = require("../../shared/cache/redis.utils");
const { createServiceError } = require("../../shared/errors/service-error");

const accessChat = async (currentUserId, otherUserId) => {
  if (!otherUserId) {
    throw createServiceError("UserId required", 400);
  }

  let chat = await Chat.findOne({
    isGroup: false,
    users: { $all: [currentUserId, otherUserId] },
    $expr: { $eq: [{ $size: "$users" }, 2] },
  }).populate("users", "-password");

  if (chat) {
    return { chat, created: false };
  }

  chat = await Chat.create({
    chatName: "sender",
    isGroup: false,
    users: [currentUserId, otherUserId],
  });

  chat = await chat.populate("users", "-password");
  await invalidateChatLists([currentUserId, otherUserId]);

  return { chat, created: true };
};

const fetchChats = async (userId) => {
  const cachedChats = await getCachedChatList(userId);
  if (cachedChats) {
    return cachedChats;
  }

  let chats = await Chat.find({
    users: { $elemMatch: { $eq: userId } },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  chats = await User.populate(chats, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  const plainChats = chats.map((chat) => chat.toObject());
  await cacheChatList(userId, plainChats);

  return plainChats;
};

const createGroupChat = async (currentUser, userIds, chatName) => {
  if (!userIds || !chatName) {
    throw createServiceError("Please fill all the fields", 400);
  }

  if (userIds.length < 2) {
    throw createServiceError(
      "More than 2 users are required to form a group chat",
      400
    );
  }

  const users = [...userIds, currentUser._id];
  const groupChat = await Chat.create({
    chatName,
    users,
    isGroup: true,
    groupAdmin: currentUser,
  });

  const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  await invalidateChatLists(users);
  return fullGroupChat;
};

const renameGroup = async (chatId, chatName) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    throw createServiceError("Chat Not Found", 404);
  }

  await invalidateChatLists(updatedChat.users.map((user) => user._id));
  return updatedChat;
};

const removeFromGroup = async (chatId, userId) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    throw createServiceError("Chat Not Found", 404);
  }

  await invalidateChatLists([
    ...updatedChat.users.map((user) => user._id),
    userId,
  ]);
  return updatedChat;
};

const addToGroup = async (chatId, userId) => {
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    throw createServiceError("Chat Not Found", 404);
  }

  await invalidateChatLists(updatedChat.users.map((user) => user._id));
  return updatedChat;
};

module.exports = {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroup,
};
