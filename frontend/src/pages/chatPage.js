import React from "react";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/header";
import MyChats from "../components/myChats";
import ChatBox from "../components/chatBox";
function ChatPage() {
  const user = undefined;
  return (
    <div style={{width:'100%'}}>
      {!user && <SideDrawer/>}
      <Box display={'flex'} justifyContent={"space-between"} width='100%' height='91.5vh' padding='10px'>
        {!user && <MyChats />}
        {!user && <ChatBox/>}
      </Box>
    </div>
  );
}

export default ChatPage;
