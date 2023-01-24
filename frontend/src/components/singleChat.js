import React, { useState } from "react";
import { Box, FormControl, IconButton, Input } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UpdateGroupChatModal from "./updateGroupChatModal";
import { getSender, getSenderFull } from "../config.js/chatLogic";
import { useSelector, useDispatch } from "react-redux";
import ProfileModal from "./profileModal";
import Message from "./message";
import { sendMessageAction } from "../store/messageSlice";
import { setSelectedChat } from "../store/chatSlice";

const SingleChat = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { selectedChat } = useSelector((state) => state.chat);
  const [newMessage, setNewMessage] = useState();
  const dispatch = useDispatch();
  const sendMessageHandler = (event) => {
    if (event.key === "Enter" && newMessage) {
      setNewMessage("");
      dispatch(sendMessageAction(newMessage));
    }
  };
  const backHadler = () => {
    dispatch(setSelectedChat());
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
  return (
    <>
      <Box
        fontSize={{ base: "28px", md: "30px" }}
        pb={3}
        px={2}
        w="100%"
        fontFamily="Work sans"
        display="flex"
        justifyContent={{ base: "space-between" }}
        alignItems="center"
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<ArrowBackIcon />}
          onClick={backHadler}
        />
        {selectedChat.isGroupChat ? (
          <>
            {selectedChat.chatName.toUpperCase()}
            <UpdateGroupChatModal />
          </>
        ) : (
          <>
            {getSender(userInfo, selectedChat.users)}
            <ProfileModal user={getSenderFull(userInfo, selectedChat.users)} />
          </>
        )}
      </Box>
      <Box
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
        p={3}
        bg="#E8E8E8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        <Message />
      </Box>
      <FormControl
        onKeyDown={sendMessageHandler}
        id="first-name"
        isRequired
        mt={3}
      >
        <Input
          variant="filled"
          bg="#E0E0E0"
          placeholder="Enter a message.."
          value={newMessage}
          onChange={typingHandler}
        />
      </FormControl>
    </>
  );
};

export default SingleChat;
