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
app.use(cors());
app.use(express.json())
app.use('/auth',auth)
app.use('/api',search)
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.listen(Port,()=>{console.log(`Server running at ${Port}`)}) 