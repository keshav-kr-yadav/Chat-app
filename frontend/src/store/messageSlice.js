import { createSlice } from "@reduxjs/toolkit";
import { getMessageByChatAPI, createMessageAPI } from "../API/api";
import STATUS from "../status";
import { fetchChatAction } from "./chatSlice";

const messageSlice = createSlice({
  name: "message",
  initialState: { messages: [], status: STATUS.IDLE },
  reducers: {
    fetchMessage(state, action) {
      state.messages = action.payload;
      state.status = STATUS.IDLE;
    },
    sendMessage(state, action) {
      state.messages.push(action.payload);
      state.status = STATUS.IDLE;
    },
    setStatus(state, action) {
      state.status = STATUS.LOADING;
    },
    setError(state, action) {
      state.error = action.payload;
      state.status = STATUS.IDLE;
    },
  },
});

export const { fetchMessage, sendMessage, setStatus, setError } =
  messageSlice.actions;
export default messageSlice.reducer;

export const fetchMessageAction = () => async (dispatch, getState) => {
  dispatch(setStatus(STATUS.LOADING));
  try {
    const {
      auth: { userInfo },
    } = getState();
    const {
      chat: { selectedChat },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await getMessageByChatAPI(selectedChat._id, config);
    dispatch(fetchMessage(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};

export const sendMessageAction = (content) => async (dispatch, getState) => {
  dispatch(setStatus(STATUS.LOADING));
  try {
    const {
      auth: { userInfo },
    } = getState();
    const {
      chat: { selectedChat },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await createMessageAPI(selectedChat._id, content, config);
    dispatch(sendMessage(data[0]));
    dispatch(fetchChatAction());
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
