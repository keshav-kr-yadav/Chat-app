import React, { useEffect, useState } from "react";
import { Box, FormControl, IconButton, Input, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UpdateGroupChatModal from "./updateGroupChatModal";
import { getSender, getSenderFull } from "../config.js/chatLogic";
import { useSelector, useDispatch } from "react-redux";
import ProfileModal from "./profileModal";
import Message from "./message";
import { sendMessage, sendMessageAction } from "../store/messageSlice";
import { setSelectedChat } from "../store/chatSlice";
import { io } from "socket.io-client";
import { setNotification } from "../store/notification";
var socket, selectedChatCompare;
const ENDPOINT = "https://hellochat-keshav019.vercel.app/";
const SingleChat = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { selectedChat } = useSelector((state) => state.chat);
  const notifications = useSelector((state) => state.notifications);
  const [newMessage, setNewMessage] = useState();
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [socketConnected, setsocketConnected] = useState(false);
  const dispatch = useDispatch();
  const sendMessageHandler = (event) => {
    if (event.key === "Enter" && newMessage) {
      setNewMessage("");
      socket.emit("stop typing", selectedChat._id);
      dispatch(sendMessageAction(newMessage, socket));
    }
  };
  const backHadler = () => {
    dispatch(setSelectedChat());
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connected", () => {
      setsocketConnected(true);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });
    socket.on("stop typing", () => {
      setIsTyping(false);
    });
    socket.on("message recieved", (newMessage) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.chat._id
      ) {
        if (!notifications.includes(newMessage)) {
          dispatch(setNotification(newMessage));
        }
      } else {
        dispatch(sendMessage(newMessage));
      }
    });
  }, []);
  useEffect(() => {
    socket.emit("join chat", selectedChat._id);
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
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
        {istyping && <Text>typing...</Text>}
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
