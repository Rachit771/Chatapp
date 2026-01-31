import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import UserListItem from "../UserAvtar/UserListItem.jsx";
import { Spinner } from "@chakra-ui/react";
import {
  Box,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Tooltip,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Badge,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal.jsx";
import ChatLoading from "../ChatLoading.jsx";
import { MyContext } from "../../Context/Mycontext.jsx";


const SideDrawer = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notification, setNotification] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();
  const { chats, setChats, setSelectedChat, user } = MyContext();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/", { replace: true });
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`http://localhost:5000/api/allUsers?search=${search}`, config);
      console.log("Search API response:", data, Array.isArray(data));

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config);
    if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]); //It decides which chat to add by clicking on Go
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="1px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          Chit-Chat
        </Text>

        <Box display="flex" alignItems="center" gap={2}>
          {/*  Notifications Menu */}
          <Menu>
            <Box position="relative">
              <MenuButton
                as={IconButton}
                aria-label="Notifications"
                icon={<BellIcon />}
                variant="ghost"
                fontSize="2xl"
              />

              {notification.length > 0 && (
                <Badge
                  colorScheme="red"
                  borderRadius="full"
                  position="absolute"
                  top="-1"
                  right="-1"
                  fontSize="0.7em"
                  px={2}
                >
                  {notification.length}
                </Badge>
              )}
            </Box>

            <MenuList>
              {notification.length === 0 ? (
                <Text px={4}>No New Messages</Text>
              ) : (
                notification.map((n, i) => (
                  <Text key={i} px={4}>
                    {n.message}
                  </Text>
                ))
              )}
            </MenuList>
          </Menu>

          {/* Profile Menu */}
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<ChevronDownIcon />}
              _hover={{ bg: "gray.100" }}
              p={1}
            >
              <Avatar
                size="sm"
                name={user?.name || "User"}
                src={user?.pic || ""}
              />
            </MenuButton>

            <MenuList>
              <MenuItem
                onClick={() => {
                  document.getElementById("open-profile-modal").click();
                }}
              >
                My Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>

            <ProfileModal user={user} />
          </Menu>
        </Box>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
