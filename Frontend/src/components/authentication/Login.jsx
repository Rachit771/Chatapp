
import { FormControl, FormLabel, VStack,Input, InputGroup, InputRightElement, Button  } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useToast} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { MyContext } from "../../Context/Mycontext";


const Login = () => {
  const [show,setshow]=useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
    const [Loading, setLoading] = useState(false);
      const toast=useToast();
      const navigate = useNavigate();      //use for redirecting to /chats after login
      const { setUser } = MyContext();
    const handleClick=()=> setshow(!show)
    const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
   
   // console.log( email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/auth/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing='5px'>
      
       <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
        placeholder='Enter your Email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}></Input>
      </FormControl>

      <FormControl >
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input 
        type={show ? "text":"password"}         //show==true than text or else password
        placeholder='Enter your password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)} />
        <InputRightElement width="4.5rem">
        <Button h="1.75 rem" size="sm" onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button 
      colorScheme='blue'
      width='100%'
      style={{marginTop:15}}
      onClick={submitHandler}
       isLoading={Loading}
      >
        Login
      </Button>
    </VStack>
  )

}

export default Login
