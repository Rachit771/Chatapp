import { FormControl, FormLabel, VStack,Input, InputGroup, InputRightElement, Button  } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {
  const [show,setshow]=useState(false);
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [confirmpassword
    ,setConfirmpassword]=useState();
    const [password, setPassword] = useState();
    const [pic,setPic]=useState();
    const postDetails=(pics)=>{}
    const handleClick=()=> setshow(!show)
    const submitHandler=()=>{}
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
      <FormControl id="password" isRequired>
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

export default Login