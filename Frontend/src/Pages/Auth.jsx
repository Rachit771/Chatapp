import React, { useEffect, useState } from 'react'
import axios from 'axios'
// First usestate runs than return code than useeffect than inside which Fetchmessage is called
const Auth =() => {
 const [Messages,setMessage]=useState([]);
 const FetchMessage=async ()=>{
  try{
    const {data}=await axios.post("http://localhost:5000/auth/signup",{
      "name":"Rachit",
      "email":"sharmarachit554@gmil.com",
      "password":"123456"})

    setMessage([data]);
  }
  catch(err){
  console.log(err);
  }
}
useEffect(()=>{FetchMessage()},[])
  return (
    <div>
      {Messages.map((message, index) => (  
        <div key={index}>
          <p>{message.message}</p>
          <p>User ID: {message.UserId}</p>
        </div>
      ))}
    </div>
  );
}
export default Auth;