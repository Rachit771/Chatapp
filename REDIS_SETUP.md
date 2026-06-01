# Redis Setup

This project uses Redis for a small set of chat features where fast, temporary
data is useful. MongoDB remains the source of truth for users, chats, and
messages.

## Start Redis

With Docker:

```bash
cd Chatapp
docker compose up -d redis
```

For local backend development, add this to `Backend/.env`:

```env
REDIS_URL=redis://localhost:6379
```

When the full Docker Compose stack is running, the backend uses:

```env
REDIS_URL=redis://redis:6379
```

## Retained Features

| Feature | Redis key | Why it is useful |
| --- | --- | --- |
| Online presence | `online_users` | A Redis Set can quickly add, remove, and list connected users. |
| Chat-list cache | `user:{userId}:chats` | The sidebar is read often. A 5-minute cache reduces repeated MongoDB queries. |
| Message cache | `chat:{chatId}:messages` | Opening a chat can reuse its message list for 10 minutes. Sending a message deletes the key immediately. |
| Health check | No stored key | `GET /health` calls `PING` and reports whether Redis is available. |
| Send-message rate limit | `rate_limit:messages:{userId}:{window}` | Each user can send up to 20 messages per minute. Short-lived counters expire automatically. |

Redis cache operations fail open: when Redis is unavailable, MongoDB-backed
chat and message requests still work. The health endpoint reports a degraded
status, and the rate limiter allows requests through until Redis recovers.

## Cache Invalidation

The application deletes known keys directly:

- Sending a message deletes `chat:{chatId}:messages`.
- Sending a message deletes chat-list cache keys for chat members because the
  latest message and sidebar ordering changed.
- Creating or editing a chat deletes chat-list cache keys for affected users.

There is no wildcard deletion in application code.

## Inspect Redis Safely

Connect to the Redis CLI:

```bash
docker exec -it chatapp-redis redis-cli
```

Useful commands:

```redis
PING
DBSIZE
SMEMBERS online_users
GET user:123:chats
GET chat:chatId123:messages
SCAN 0 MATCH * COUNT 100
```

Use `SCAN`, not `KEYS`, when inspecting or iterating through keys. `SCAN`
returns keys incrementally and avoids blocking Redis while the keyspace grows.

## Removed Features

The refactor intentionally removes:

- Read-receipt caching
- Notification-preference caching
- Last-activity caching
- Chat-metadata caching
- User-data caching
- Wildcard cache invalidation helpers
- Duplicate message-cache middleware
- Typing-indicator keys and helpers
- Unread-counter keys and helpers

These features added extra invalidation rules or cached data without a clear
need in the current application.

Typing indicators already travel through Socket.IO `typing` and `stop typing`
events. With one backend server, writing the same short-lived state to Redis
does not add value.

Unread notifications are already updated in the frontend when Socket.IO emits
`message recieved`. Maintaining a second unread count in Redis duplicated that
real-time flow and added reset logic when chats were opened.

## Final Redis-Related Structure

```text
Chatapp/
|-- Backend/
|   |-- config/
|   |   `-- redis.js
|   |-- Controller/
|   |   |-- chatController.js
|   |   `-- messageController.js
|   |-- MiddleWare/
|   |   |-- authMiddleWare.js
|   |   `-- messageRateLimiter.js
|   |-- routes/
|   |   `-- MessageRoute.js
|   |-- services/
|   |   |-- authService.js
|   |   |-- chatService.js
|   |   |-- messageService.js
|   |   `-- userService.js
|   |-- utils/
|   |   |-- redisUtils.js
|   |   `-- serviceError.js
|   `-- app.js
|-- REDIS_SETUP.md
`-- docker-compose.yml
```

Deleted file:

```text
Backend/MiddleWare/cacheMiddleware.js
```

Modified or added files:

```text
Backend/app.js
Backend/Controller/chatController.js
Backend/Controller/messageController.js
Backend/MiddleWare/messageRateLimiter.js
Backend/routes/MessageRoute.js
Backend/services/authService.js
Backend/services/chatService.js
Backend/services/messageService.js
Backend/services/userService.js
Backend/utils/redisUtils.js
Backend/utils/serviceError.js
REDIS_SETUP.md
```

## Interview Summary

Redis is used only for cache entries, rate-limit counters, online presence, and
health checks. MongoDB stores durable application data, while Socket.IO handles
real-time typing and message notifications. Cache keys have TTLs where
appropriate, known cache keys are deleted directly when writes make them stale,
and keyspace inspection uses `SCAN` rather than the blocking `KEYS` command.
