# Real-Time Chat Application

A full-stack real-time chat application built using the MERN stack with features like one-to-one messaging, group chats, real-time typing indicators, authentication, and live notifications.
 
---

## 🚀 Features

- 🔐 JWT Authentication & Authorization
- 💬 One-to-One Chat
- 👥 Group Chat
- ⚡ Real-Time Messaging using Socket.IO
- ✍️ Typing Indicators
- 🔔 Real-Time Notifications
- 🗂 Chat List Management
- 🧑 User Search
- 📱 Responsive UI
- ☁️ MongoDB Database Integration

---

## 🛠 Tech Stack

### Frontend
- React.js
- Context API
- Chakra UI
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- bcrypt.js

---


## 🔄 Real-Time Working Flow

1. User logs in and establishes a socket connection.
2. User joins a personal room using their user ID.
3. When a chat is opened, the user joins a chat-specific room.
4. Messages are first stored in MongoDB using REST APIs.
5. After saving, Socket.IO emits the message instantly to other users.
6. Typing indicators are handled using socket events.

---

## 🧠 State Management

The application uses **Context API** for global state management.

Stored global states include:
- Logged-in user
- Selected chat
- Chat list
- Notifications

A `fetchAgain` state is used to re-fetch chats across components after new messages or updates.

---

## 🔐 Authentication Flow

- User logs in/signup using credentials.
- Backend validates user data.
- JWT token is generated and sent to frontend.
- Token is stored on client side.
- Protected routes verify the token before granting access.

---

## 🌱 Future Improvements

- Redis Pub/Sub for better scalability
- Message status (seen/delivered)
- File sharing
- Voice & video calling
- Docker deployment
- Online/offline user status

---

## 📚 What I Learned

- Real-time communication using Socket.IO
- Managing global state using Context API
- JWT authentication flow
- Building scalable REST APIs
- Handling async operations in Node.js
- MongoDB schema design

---

## 👨‍💻 Author

**Rachit Sharma**

Deployement Link: https://chatapp-frontend-8s63.onrender.com


bcrypt.js
