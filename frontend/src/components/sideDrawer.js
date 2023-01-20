import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Box,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChatAction } from "../redux/action/chatAction";
import { findUserAction } from "../redux/action/userAction";
import ChatLoading from "./chatLoading";
import UserListItem from "./userListItem";

const SideDrawer = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector(state => state.user);
  const handleSearch = () => {
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
    setIsLoading(true);
    dispatch(findUserAction(search));
  };
  const accesChat = (userId) => {
    if (!userId) {
      toast({
        title: "Please select a user",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    dispatch(createChatAction(userId));
  };
  useEffect(() => {
    setSearchResult(users);
    setIsLoading(loading);
  },[loading,users,error])
  return (
    <div>
      <span onClick={onOpen}>{children}</span>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
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
            {isLoading ? (
              <ChatLoading />
            ) : (
                  searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={()=>accesChat(user._id)}
                    />
                  ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
