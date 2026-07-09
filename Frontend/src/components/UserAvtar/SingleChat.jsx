import React, { useCallback, useEffect, useRef, useState } from "react";
import { MyContext } from "../../Context/Mycontext";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import axios from "../../config/axios";
import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import ProfileModal from "../miscellaneous/ProfileModal";
import UpdateGroupChatModal from "../miscellaneous/UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
const ENDPOINT = "https://chatapp-backend-f2k1.onrender.com";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    setNotification,
    onlineUsers,
    setOnlineUsers,
  } = MyContext();
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  const socketRef = useRef(null);
  const selectedChatCompare = useRef(null);
  const typingTimeoutRef = useRef(null);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected || !socketRef.current || !selectedChat) return;

    socketRef.current.emit("typing", selectedChat._id);

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit("stop typing", selectedChat._id);
    }, 3000);
  };

  const fetchMessages = useCallback(async () => {
    if (!selectedChat) return;

    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      socketRef.current?.emit("join chat", selectedChat._id);
    } catch {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  }, [selectedChat, toast, user]);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage.trim()) {
      socketRef.current?.emit("stop typing", selectedChat._id);
      clearTimeout(typingTimeoutRef.current);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        setNewMessage("");
        socketRef.current?.emit("new message", data);
        setMessages((prev) => [...prev, data]);
        
      } catch {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

    useEffect(() => {
    const socketInstance = io(ENDPOINT);
    socketRef.current = socketInstance;
    const handleConnected = () => setSocketConnected(true);
    const handleOnlineUsers = (userIds) => setOnlineUsers(userIds);
    const handleTyping = (roomId) => {
      if (selectedChatCompare.current?._id === roomId) {
        setIsTyping(true);
      }
    };
    const handleStopTyping = (roomId) => {
      if (selectedChatCompare.current?._id === roomId) {
        setIsTyping(false);
      }
    };
    const handleMessageReceived = (newMessageRecieved) => {
      if (
        !selectedChatCompare.current || // if chat is not selected or doesn't match current chat
        selectedChatCompare.current._id !== newMessageRecieved.chat._id
      ) {
        setNotification((prev) => {
          if (prev.some((n) => n._id === newMessageRecieved._id)) return prev;
          return [newMessageRecieved, ...prev];
        });
        setFetchAgain((prev) => !prev);
      } else {
        setMessages((prev) => [...prev, newMessageRecieved]);
      }
    };

    socketInstance.on("connected", handleConnected);
    socketInstance.on("online users", handleOnlineUsers);
    socketInstance.on("typing", handleTyping);
    socketInstance.on("stop typing", handleStopTyping);
    socketInstance.on("message recieved", handleMessageReceived);
    socketInstance.emit("setup", user);

    return () => {
      socketInstance.off("connected", handleConnected);
      socketInstance.off("online users", handleOnlineUsers);
      socketInstance.off("typing", handleTyping);
      socketInstance.off("stop typing", handleStopTyping);
      socketInstance.off("message recieved", handleMessageReceived);
      socketInstance.disconnect();
      if (socketRef.current === socketInstance) {
        socketRef.current = null;
      }
    };
  }, [setFetchAgain, setNotification, setOnlineUsers, user]);

  useEffect(() => {
     selectedChatCompare.current = selectedChat;
     fetchMessages();

     if (selectedChat) {
      setNotification((prev) =>
        prev.filter((n) => n.chat._id !== selectedChat._id)
      );
     }
  }, [fetchMessages, selectedChat, setNotification]);

  useEffect(() => {
    return () => clearTimeout(typingTimeoutRef.current);
  }, []);


  return (
    <>
      {selectedChat ? (
        <Box display="flex" flexDir="column" w="100%" h="100%">
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton                                           //Dynamic Back button(Arrow) for mobile screen
              aria-label="Back"
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroup ? (
              <>
                <Box>
                  <Text>{getSender(user, selectedChat.users)}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {onlineUsers.includes(
                      getSenderFull(user, selectedChat.users)?._id
                    )
                      ? "Online"
                      : "Offline"}
                  </Text>
                </Box>
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>

          <Box
            display="flex"
            flexDir="column"
            p={3}
            bg="#E8E8E8"
            w="100%"
            flex="1"
            minH={0}
            borderRadius="lg"
          >
            <Box flex="1" minH={0} overflow="hidden">
              {loading ? (
                <Box
                  h="100%"
                  w="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Spinner size="xl" thickness="4px" />
                </Box>
              ) : (
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>
              )}
            </Box>

            {istyping && (
              <Box className="typing-indicator" aria-live="polite">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </Box>
            )}

            <FormControl onKeyDown={sendMessage} id="message-input" isRequired mt={3}>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </Box>
      ) : (
        <>
          <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
        </>
      )}
    </>
  );
};

export default SingleChat;
