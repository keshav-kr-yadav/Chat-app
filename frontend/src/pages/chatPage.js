import React from "react";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/header";
import MyChats from "../components/myChats";
import ChatBox from "../components/chatBox";
import { useSelector } from "react-redux";
function ChatPage() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div style={{ width: "100%" }}>
      {userInfo && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width="100%"
        height="91.5vh"
        padding="10px"
      >
        {userInfo && <MyChats />}
        {userInfo && <ChatBox />}
      </Box>
    </div>
  );
}

export default ChatPage;
