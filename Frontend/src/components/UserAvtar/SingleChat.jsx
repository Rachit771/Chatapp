import React from 'react'
import { MyContext } from '../../Context/Mycontext'
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender,getSenderFull } from '../../config/ChatLogics';
import ProfileModal from '../miscellaneous/ProfileModal';
import UpdateGroupChatModal from '../miscellaneous/UpdateGroupChatModal';
const SingleChat = ({fetchAgain,setFetchAgain}) => {
  const { user,selectedChat
    ,setSelectedChat,}=MyContext();
  return (
    <>
    {
      selectedChat?(
        <>
        <Text 
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center">
              <IconButton
              aria-label="Back"
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroup?(
              <>
              {getSender(user,selectedChat.users)}
              <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
              </>
            ):(
              <>
              {selectedChat.chatName.toUpperCase()}
              <UpdateGroupChatModal
              fetchAgain={fetchAgain}
              setFetchgain={setFetchAgain}></UpdateGroupChatModal>
              </>
            )}
        </Text>
         <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          ></Box>
        </>
      ):(
         <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )
    }
    </>
  );


}


export default SingleChat