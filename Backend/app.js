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
app.listen(Port,()=>{console.log(`Server running at ${Port}`)}) 
