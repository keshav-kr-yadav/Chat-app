import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromGroupAPI } from "../API/api";
import UserBadgeItem from "./userBadgeItem";
import { fetchChatAction, setSelectedChatUsers } from "../store/chatSlice";
const UpdateGroupChatModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const handleRemove = async (u) => {
    if (selectedChat.groupAdmin._id !== userInfo._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (u._id === userInfo._id) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await removeFromGroupAPI(selectedChat._id, u._id, config);
      const newUsers = selectedChat.users.filter((x) => {
        return x._id !== u._id;
      });
      dispatch(setSelectedChatUsers(newUsers));
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const handleLeave = async (u) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await removeFromGroupAPI(selectedChat._id, u._id, config);
      dispatch(fetchChatAction());
      onClose();
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <Box>
      <IconButton onClick={onOpen}>
        <ViewIcon />
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                  admin={selectedChat.groupAdmin}
                />
              ))}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleLeave(userInfo)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UpdateGroupChatModal;
