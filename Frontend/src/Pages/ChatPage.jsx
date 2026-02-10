import { MyContext } from "../Context/Mycontext";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/UserAvtar/MyChats";
import ChatBox from "../components/UserAvtar/ChatBox";
import {Box} from "@chakra-ui/react"
import { useState } from "react";


const ChatPage=()=>{
const {user}=MyContext();
const [fetchAgain ,setFetchAgain]=useState(false);
 return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="stretch"
        gap={3}
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        )}
      </Box>
    </div>
  );
};
export default ChatPage;
