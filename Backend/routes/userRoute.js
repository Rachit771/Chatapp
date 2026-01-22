const express=require('express')
const {allUsers}=require('../Controller/userController')
const {protect}=require('../MiddleWare/authMiddleWare')
const userrouter=express.Router();
userrouter.get('/allUsers',protect,allUsers);
module.exports=userrouter

//User sends search → token is validated → user identity is attached → database is searched using query → logged-in user is excluded → results are returned.