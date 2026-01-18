import { FormControl, FormLabel, VStack,Input, InputGroup, InputRightElement, Button  } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useToast} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [show,setshow]=useState(false);
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [confirmpassword
    ,setConfirmpassword]=useState();
    const [password, setPassword] = useState();
    const [pic,setPic]=useState();
    const [picLoading, setPicLoading] = useState(false);
  const toast=useToast();
  const navigate = useNavigate();
const postDetails = (pics) => {
  setPicLoading(true);

  if (!pics) {
    toast({
      title: "Please select an image",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setPicLoading(false);
    return;
  }

  if (pics.type === "image/jpeg" || pics.type === "image/png") {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "chat-app");

    fetch("https://api.cloudinary.com/v1_1/dhftmqj6f/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.secure_url);
        setPicLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPicLoading(false);
      });
  } else {
    toast({
      title: "Please select a JPEG or PNG image",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setPicLoading(false);
  }
};


    
const handleClick=()=> setshow(!show)
 const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/auth/signup",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

    
  return (
    <VStack spacing='5px'>
      <FormControl id='name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input 
        placeholder='Enter your name'
        onChange={(e)=>setName(e.target.value)}></Input>
      </FormControl>
       <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
        placeholder='Enter your Email'
        onChange={(e)=>setEmail(e.target.value)}></Input>
      </FormControl>

       <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='pic' isRequired>
      <FormLabel>Upload your picture</FormLabel>
       <Input 
       type="file"
       p={1.5}
       accept='image/*'
        onChange={(e)=>postDetails(e.target.files[0])}></Input>
      </FormControl>
      <Button 
      colorScheme='blue'
      width='100%'
      style={{marginTop:15}}
      onClick={submitHandler}
       isLoading={picLoading}
      >
        Signup
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )

}
export default Signup