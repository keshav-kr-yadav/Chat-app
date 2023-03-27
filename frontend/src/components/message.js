import React, { useEffect } from "react";
import { Avatar, Box, Spinner, Tooltip } from "@chakra-ui/react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config.js/chatLogic";
import { useDispatch, useSelector } from "react-redux";
import STATUS from "../status";
import { fetchMessageAction } from "../store/messageSlice";
const Message = () => {
  const { userInfo: user } = useSelector((state) => state.auth);
  const { messages, status } = useSelector((state) => state.message);
  const { selectedChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  return (
    <>
      {status === STATUS.LOADING ? (
        <Spinner></Spinner>
      ) : (
        messages &&
        messages.map((m, i) => (
          <Box style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </Box>
        ))
      )}
    </>
  );
};

export default Message;
