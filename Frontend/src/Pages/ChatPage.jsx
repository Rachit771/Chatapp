import { MyContext } from "../Context/Mycontext";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";
import {Box} from "@chakra-ui/react"


const ChatPage=()=>{
const {user}=MyContext();
 return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats />}
        {user && (
          <ChatBox />
        )}
      </Box>
    </div>
  );
};
export default ChatPage;
