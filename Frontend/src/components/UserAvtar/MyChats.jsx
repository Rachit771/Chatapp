import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import {
  Avatar,
  Badge,
  Flex,
  HStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MyContext } from "../../Context/Mycontext";
import { Button } from "@chakra-ui/react";
import { getSender } from "../../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "../miscellaneous/GroupChatModal";
const MyChats = ({fetchAgain}) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = MyContext();

  const toast = useToast();
  const containerBg = useColorModeValue("white", "gray.800");
  const containerBorder = useColorModeValue("gray.200", "gray.700");
  const listBg = useColorModeValue("gray.50", "gray.900");
  const hoverShadow = useColorModeValue("md", "xl");
  const selectedBg = useColorModeValue("teal.500", "teal.400");
  const unselectedBg = useColorModeValue("white", "gray.800");
  const containerShadow = useColorModeValue("sm", "lg");
  const selectedText = "white";
  const unselectedText = useColorModeValue("gray.800", "gray.100");

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config,
      );

      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    if (user) {
      //Don’t fetch chats until the user is available. Fetch chats again if the user changes
      fetchChats();
    }
  }, [user,fetchAgain]);
  
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      w={{ base: "100%", md: "32%" }}
      h="full"
      bg={containerBg}
      borderWidth="1px"
      borderColor={containerBorder}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow={containerShadow}
    >
      {/* Header */}
      <Flex
        px={4}
        py={3}
        align="center"
        borderBottomWidth="1px"
        borderColor={containerBorder}
        bg={unselectedBg}
        position="sticky"
        top={0}
        zIndex={1}
      >
        <Text fontSize="xl" fontWeight="700" fontFamily="Work sans">
          My Chats
        </Text>
        <Spacer />
        <GroupChatModal>


        <Button
          size="sm"
          fontSize={{ base: "sm", md: "xs", lg: "sm" }}
          leftIcon={<AddIcon />}
          variant="solid"
          colorScheme="teal"
          borderRadius="xl"
          >
          New Group
        </Button>
      </GroupChatModal>
      </Flex>

      {/* List */}
      <Box
        p={3}
        bg={listBg}
        flex="1"
        overflow="hidden"
      >
        {chats ? (
          <Stack
            spacing={2}
            overflowY="auto"
            pr={1}
            h="100%"
            sx={{
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                background: "#CBD5E0",
                borderRadius: "999px",
              },
              "&::-webkit-scrollbar-track": { background: "transparent" },
            }}
          >
            {chats.map((chat) => {
              const isSelected = selectedChat?._id === chat._id;
              const isGroupChat = chat.isGroup ?? chat.isGroupChat;

              const title = !isGroupChat
                ? getSender(user, chat.users)
                : chat.chatName;

              // Optional (only if your backend provides latestMessage)
              const lastMsg = chat.latestMessage?.content
                ? chat.latestMessage.content
                : "No messages yet";

              return (
                <Box
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  p={3}
                  borderRadius="2xl"
                  transition="0.2s"
                  bg={isSelected ? selectedBg : unselectedBg}
                  color={isSelected ? selectedText : unselectedText}
                  borderWidth="1px"
                  borderColor={isSelected ? "transparent" : containerBorder}
                  _hover={{
                    transform: "translateY(-1px)",
                    boxShadow: hoverShadow,
                  }}
                >
                  <HStack spacing={3} align="start">
                    <Avatar
                      size="sm"
                      name={title}
                      bg={isSelected ? "whiteAlpha.400" : "teal.500"}
                      color={isSelected ? "white" : "white"}
                    />
                    <Box flex="1" minW={0}>
                      <Flex align="center" gap={2}>
                        <Text fontWeight="700" noOfLines={1}>
                          {title}
                        </Text>

                        {/* Optional: show a badge if you have notifications/unread */}
                        {/* <Badge colorScheme={isSelected ? "blackAlpha" : "teal"} borderRadius="full">
                        NEW
                      </Badge> */}
                      </Flex>

                      <Text
                        fontSize="sm"
                        opacity={isSelected ? 0.9 : 0.7}
                        noOfLines={1}
                      >
                        {lastMsg}
                      </Text>
                    </Box>

                    {/* Optional: time if you have latestMessage.createdAt */}
                    {/* <Text fontSize="xs" opacity={0.7} whiteSpace="nowrap">
                    12:45 PM
                  </Text> */}
                  </HStack>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
