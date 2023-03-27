import { getUserChatAPI } from "../API/api";
import STATUS from "../status";
import { setError, setStatus } from "./authSlice";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = { userChats: [] };
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
    setSelectedChatUsers(state, action) {
      const newChat = { ...state.selectedChat, users: action.payload };
      state.selectedChat = newChat;
    },
    setUserChats(state, action) {
      const arr = state.userChats.filter(
        (chat) => chat._id != action.payload._id
      );
      arr.unshift(action.payload);
      state.userChats = arr;
    },
    fetUserChats(state, action) {
      state.userChats = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.status = STATUS.IDLE;
      state.error = action.payload;
    },
  },
});

export const {
  setSelectedChat,
  setUserChats,
  fetUserChats,
  setSelectedChatUsers,
} = chatSlice.actions;
export default chatSlice.reducer;

export const fetchChatAction = () => async (dispatch, getState) => {
  dispatch(setStatus(STATUS.LOADING));
  try {
    const {
      auth: {
        userInfo: { token },
      },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await getUserChatAPI(config);
    dispatch(fetUserChats(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
