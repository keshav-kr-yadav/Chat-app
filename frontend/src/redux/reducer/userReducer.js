import {
  FIND_USER_FAIL,
  FIND_USER_REQUEST,
  FIND_USER_SUCCESS,
} from "../constant/userConstant";

const userReducer = (state = {users:[]}, action) => {
  switch (action.type) {
    case FIND_USER_REQUEST:
      return { loading: true };
    case FIND_USER_SUCCESS:
      return { loading: false, users: action.payload };
    case FIND_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export default userReducer;
