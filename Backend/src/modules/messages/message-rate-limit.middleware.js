const redisClient = require("../../config/redis");

const WINDOW_SECONDS = 60;
const MAX_MESSAGES_PER_WINDOW = 20;

const messageRateLimiter = async (req, res, next) => {
  const windowId = Math.floor(Date.now() / (WINDOW_SECONDS * 1000));
  const key = `rate_limit:messages:${req.user._id}:${windowId}`;

  try {
    const results = await redisClient
      .multi()
      .incr(key)
      .expire(key, WINDOW_SECONDS + 1)
      .exec();
    const requestCount = results[0];

    if (requestCount > MAX_MESSAGES_PER_WINDOW) {
      return res.status(429).json({
        message: "Too many messages. Please wait before sending again.",
      });
    }
  } catch (error) {
    console.error("Redis rate limiter failed:", error.message);
  }

  next();
};

module.exports = { messageRateLimiter };
