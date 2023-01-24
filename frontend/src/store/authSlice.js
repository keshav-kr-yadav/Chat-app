import { loginAPI, registerAPI } from "../API/api";
const { createSlice } = require("@reduxjs/toolkit");
const { default: STATUS } = require("../status");

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = { userInfo, status: STATUS.IDLE };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.userInfo = action.payload;
      state.status = STATUS.IDLE;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.status = STATUS.IDLE;
      state.error = action.payload;
    },
    logout(state, action) {
      localStorage.removeItem("userInfo");
      return {};
    },
  },
});
const authReducer = authSlice.reducer;
export const { login, setStatus, setError, logout } = authSlice.actions;
export default authReducer;

export const loginAction = (email, password) => async (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  try {
    const { data } = await loginAPI(email, password);
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(login(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const registerAction =
  (name, email, password, pic) => async (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const { data } = await registerAPI(name, email, password, pic);
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(login(data));
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
