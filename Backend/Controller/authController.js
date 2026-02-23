const User=require('../Model/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });

const signupHandle=asyncHandler(async (req,res)=>{
     const {name,email,password,pic}=req.body;
     const userExist=await User.findOne({email});
     if(userExist){
      throw new Error('User already exist please login');
     }
     const user=await User.create({
      name,password,email,pic
     })
     if(user ){
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
     }
     else{
      throw new Error('User failed to create')
     }
    
})
const loginHandle=asyncHandler(async (req,res)=>{
 const {email,password}=req.body;
 const userExist=await User.findOne({email});
 if(!userExist) throw new Error('First Signup');
 const isPassword=await bcrypt.compare(password,userExist.password);
 if(!isPassword) throw new Error('Incorrect password');
 return res.status(201).json({
     _id: userExist._id,
     name: userExist.name,
     email: userExist.email,
     pic: userExist.pic,
     token: generateToken(userExist._id),
 });
})
module.exports={signupHandle,loginHandle};
