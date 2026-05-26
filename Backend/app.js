const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors')
dotenv.config();
require('./config/db')
const auth=require('./routes/authroute');
const search=require('./routes/userRoute')
const chatRoutes=require('./routes/ChatRoute')
const messageRoutes=require('./routes/MessageRoute')
const app=express();
const Port=process.env.PORT || 7000

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json())

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use('/auth',auth)
app.use('/api',search)
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
const server=app.listen(Port,()=>{console.log(`Server running at ${Port}`)})
const io=require('socket.io')(server,{
  pingTimeout:6000,
  cors:{                                     //Here we are handling cors issue for sockets
    origin:"https://chatapp-frontend-8s63.onrender.com",
    methods: ["GET", "POST"],
    credentials: true
  }
}); 
io.on("connection",(socket)=>{
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
    socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
})

