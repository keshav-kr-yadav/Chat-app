import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import SingleChat from "./singleChat";

const ChatBox = () => {
  const { selectedChat } = useSelector((state) => state.chat);
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {selectedChat ? (
        <SingleChat />
      ) : (
        <>
          <Box display={"flex"} alignItems="center" h="100%">
            <Text fontSize={"3xl"} pb={"3"} fontFamily="sans-serif">
              Click on a user to start chatting
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChatBox;
