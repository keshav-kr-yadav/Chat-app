import url from "../../url";
import axios from "axios";
import {
  FIND_USER_FAIL,
  FIND_USER_REQUEST,
  FIND_USER_SUCCESS,
} from "../constant/userConstant";

export const findUserAction = (search) => async (dispatch, getState) => {
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
    dispatch({ type: FIND_USER_REQUEST });
    const { data } = await axios.get(
      `${url}/api/user?search=${search}`,
      config
    );
    if (data.length === 0) {
      dispatch({
        type: FIND_USER_FAIL,
        payload: "User not found",
      });
    } else {
      dispatch({ type: FIND_USER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: FIND_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
