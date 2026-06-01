# Real-Time Chat Application

A full-stack real-time chat application built using the MERN stack with features like one-to-one messaging, group chats, real-time messaging, Redis caching, rate limiting, authentication, and live notifications.

---

## 🚀 Features

* 🔐 JWT Authentication & Authorization
* 💬 One-to-One Chat
* 👥 Group Chat
* ⚡ Real-Time Messaging using Socket.IO
* ✍️ Typing Indicators
* 🔔 Real-Time Notifications
* 🧑 User Search
* 📱 Responsive UI
* ☁️ MongoDB Database Integration
* 🚀 Redis Message Caching
* 📋 Redis Chat List Caching
* 🛡 Rate Limiting for API Protection
* 🟢 Online User Presence Tracking

---

## 🛠 Tech Stack

### Frontend

* React.js
* Context API
* Chakra UI
* Axios
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* Redis
* JWT Authentication
* bcrypt.js
* Express Rate Limit

---

## ⚡ Redis Integrations

### Message Caching

Frequently accessed messages are cached in Redis to reduce database queries and improve response time.

### Chat List Caching

User chat lists are stored in Redis, enabling faster chat loading and reducing MongoDB load.

### Online Presence

Connected users are tracked using Redis Sets, allowing real-time online/offline status updates.

### Cache Invalidation

Cached data is automatically updated or invalidated whenever new messages are sent or chat data changes.

---

## 🔄 Real-Time Working Flow

1. User logs in and establishes a Socket.IO connection.
2. User joins a personal room using their user ID.
3. When a chat is opened, the user joins a chat-specific room.
4. Messages are stored in MongoDB through REST APIs.
5. Frequently accessed messages and chat lists are cached in Redis.
6. Socket.IO instantly delivers messages to other users.
7. Typing indicators and online presence are managed through socket events and Redis.
8. Rate limiting protects APIs from abuse and excessive requests.

---

## 🧠 State Management

The application uses **Context API** for global state management.

### Global States

* Logged-in User
* Selected Chat
* Chat List
* Notifications

A `fetchAgain` state is used to synchronize chat updates across components.

---

## 🔐 Authentication Flow

1. User signs up or logs in using credentials.
2. Backend validates user data.
3. JWT token is generated and sent to the frontend.
4. Token is stored on the client side.
5. Protected routes verify the token before granting access.

---

## 🛡 Security Features

* JWT Authentication
* Password Hashing using bcrypt.js
* Protected Routes
* API Rate Limiting
* Input Validation
* Secure Environment Variables

---

## 📈 Performance Optimizations

* Redis Message Caching
* Redis Chat List Caching
* Reduced MongoDB Reads
* Real-Time Socket Communication
* Efficient State Management using Context API

---

## 🌱 Future Improvements

* Redis Pub/Sub for Horizontal Scaling
* Message Status (Delivered/Seen)
* File Sharing
* Voice & Video Calling (WebRTC)
* Docker Deployment
* Push Notifications
* End-to-End Encryption

---

## 📚 What I Learned

* Real-Time Communication using Socket.IO
* Redis Caching Strategies
* JWT Authentication & Authorization
* API Rate Limiting
* Context API State Management
* MongoDB Schema Design
* Building Scalable REST APIs
* Cache Invalidation Techniques
* Handling Async Operations in Node.js

---

## 👨‍💻 Author

**Rachit Sharma**

### Live Demo

https://chatapp-frontend-8s63.onrender.com

