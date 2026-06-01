import React, { useCallback, useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import {
  Avatar,
  AvatarBadge,
  Flex,
  HStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "../../config/axios";
import { MyContext } from "../../Context/Mycontext";
import { Button } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "../miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    onlineUsers,
  } = MyContext();

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

  const fetchChats = useCallback(async () => {
    if (!user?.token) return;           //if user or token doen't exist than return else user.token

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }, [setChats, toast, user]);

  useEffect(() => {
    if (user?.token) {        //This optional chaining prevent crashes if user is null
      fetchChats();
    }
  }, [fetchAgain, fetchChats, user]);         //run when user(login/logout) and fetchagain state changes

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

      <Box p={3} bg={listBg} flex="1" overflow="hidden">
        {chats ? (                                    //If chats exists then show list else show loading skeleton
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
              const isGroupChat = chat.isGroup ?? chat.isGroupChat; //it is for checking 1 to 1 or group chat and displaying title

              const title = !isGroupChat ? getSender(user, chat.users || []) : chat.chatName || "Unnamed Group";
              const otherUser = !isGroupChat
                ? getSenderFull(user, chat.users || [])
                : null;
              const isOnline = onlineUsers.includes(otherUser?._id);

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
                      color="white"
                    >
                      {isOnline && (
                        <AvatarBadge
                          boxSize="1em"
                          bg="green.400"
                          borderColor={isSelected ? selectedBg : unselectedBg}
                        />
                      )}
                    </Avatar>
                    <Box flex="1" minW={0}>
                      <Flex align="center" gap={2}>
                        <Text fontWeight="700" noOfLines={1}>
                          {title}
                        </Text>
                      </Flex>

                      <Text
                        fontSize="sm"
                        opacity={isSelected ? 0.9 : 0.7}
                        noOfLines={1}
                      >
                        {lastMsg}
                      </Text>
                    </Box>
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
