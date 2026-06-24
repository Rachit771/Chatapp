const express=require('express')
const { allUsers } = require('./user.controller');
const { protect } = require('../auth/auth.middleware');
const userrouter=express.Router();
userrouter.get('/allUsers',protect,allUsers);
module.exports=userrouter

//User sends search → token is validated → user identity is attached → database is searched using query → logged-in user is excluded → results are returned.
