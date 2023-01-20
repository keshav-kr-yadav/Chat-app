import {
  FIND_USER_CHATS_FAIL,
  FIND_USER_CHATS_REQUEST,
  FIND_USER_CHATS_SUCCESS,
} from "../constant/chatConstant";

const userChatsReducer = (state = {chats:[]}, action) => {
  switch (action.type) {
    case FIND_USER_CHATS_REQUEST:
      return { loading: true };
    case FIND_USER_CHATS_SUCCESS:
      return { loading: false, chats: action.payload };
    case FIND_USER_CHATS_FAIL:
      return { loading: false, crror: action.payload };
    default:
      return state;
  }
};
export default userChatsReducer;
