import axios from "axios";
import url from "../../url";
import {
  CREATE_CHAT_FAIL,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  FIND_USER_CHATS_FAIL,
  FIND_USER_CHATS_REQUEST,
  FIND_USER_CHATS_SUCCESS,
} from "../constant/chatConstant";

export const createChatAction = (userId) => async (dispatch, getState) => {
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
    dispatch({ type: CREATE_CHAT_REQUEST });
    const { data } = await axios.post(`${url}/chat`, { userId }, config);
    dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_CHAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const findUserChats = () => async (dispatch, getState) => {
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
    dispatch({ type: FIND_USER_CHATS_REQUEST });
    const { data } = await axios.get(`${url}/chat`, config);
    dispatch({ type: FIND_USER_CHATS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_USER_CHATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
