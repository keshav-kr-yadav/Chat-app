import {
  CREATE_CHAT_FAIL,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
} from "../constant/chatConstant";

const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CHAT_REQUEST:
      return { loading: true };
    case CREATE_CHAT_SUCCESS:
      return { loading: false, chats: action.payload };
    case CREATE_CHAT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default chatReducer;
