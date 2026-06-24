const redisClient = require("../../config/redis");

const CHAT_LIST_TTL_SECONDS = 300;
const MESSAGE_CACHE_TTL_SECONDS = 600;

const getJson = async (key) => {
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Redis GET failed for ${key}:`, error.message);
    return null;
  }
};

const setJson = async (key, value, ttl) => {
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error(`Redis SET failed for ${key}:`, error.message);
  }
};

const deleteKeys = async (keys) => {
  const uniqueKeys = [...new Set(keys.filter(Boolean))];
  if (uniqueKeys.length === 0) return;

  try {
    await redisClient.del(uniqueKeys);
  } catch (error) {
    console.error("Redis DEL failed:", error.message);
  }
};

const setUserPresence = async (userId, isOnline) => {
  try {
    if (isOnline) {
      await redisClient.sAdd("online_users", userId.toString());
    } else {
      await redisClient.sRem("online_users", userId.toString());
    }
  } catch (error) {
    console.error("Redis presence update failed:", error.message);
  }
};

const getOnlineUsers = async () => {
  try {
    return await redisClient.sMembers("online_users");
  } catch (error) {
    console.error("Redis presence lookup failed:", error.message);
    return [];
  }
};

const getCachedChatList = (userId) => getJson(`user:${userId}:chats`);

const cacheChatList = (userId, chats) =>
  setJson(`user:${userId}:chats`, chats, CHAT_LIST_TTL_SECONDS);

const invalidateChatLists = (userIds) =>
  deleteKeys(userIds.map((userId) => `user:${userId}:chats`));

const getCachedMessages = (chatId) => getJson(`chat:${chatId}:messages`);

const cacheMessages = (chatId, messages) =>
  setJson(`chat:${chatId}:messages`, messages, MESSAGE_CACHE_TTL_SECONDS);

const invalidateMessageCache = (chatId) =>
  deleteKeys([`chat:${chatId}:messages`]);

const healthCheck = async () => {
  try {
    return (await redisClient.ping()) === "PONG";
  } catch (error) {
    console.error("Redis health check failed:", error.message);
    return false;
  }
};

module.exports = {
  cacheChatList,
  cacheMessages,
  getCachedChatList,
  getCachedMessages,
  getOnlineUsers,
  healthCheck,
  invalidateChatLists,
  invalidateMessageCache,
  setUserPresence,
};
