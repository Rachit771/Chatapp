
import { FormControl, FormLabel, VStack,Input, InputGroup, InputRightElement, Button  } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {
  const [show,setshow]=useState(false);
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();

    const handleClick=()=> setshow(!show)
    const submitHandler=()=>{}
  return (
    <VStack spacing='5px'>
      
       <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
        placeholder='Enter your Email'
        onChange={(e)=>setEmail(e.target.value)}></Input>
      </FormControl>

      <FormControl >
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input 
        type={show ? "text":"password"}
        placeholder='Enter your password'
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
      >
        Login
      </Button>
    </VStack>
  )

}

export default Login
