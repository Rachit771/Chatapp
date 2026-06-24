const express=require('express');
const { signupHandle, loginHandle } = require('./auth.controller');
const router=express.Router();
router.post('/signup',signupHandle);
router.post('/login',loginHandle)
module.exports=router;
