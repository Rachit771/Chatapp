const User=require('../Model/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');
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
      return res.status(200).json({message:'user created',UserId:user._id})
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
 const token=jwt.sign(
     {id:userExist._id},
     process.env.JWT_SECRET,
     {expiresIn:"24h"}
 )
 return res.status(201).json({
     message:'User logged in',
     success:true,
     token
 })
})
module.exports={signupHandle,loginHandle};