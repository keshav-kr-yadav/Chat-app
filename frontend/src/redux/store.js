import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducer/authReducer";
import userReducer from "./reducer/userReducer";
import chatReducer from "./reducer/chatReducer";
import userChatsReducer from "./reducer/userChats";
const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  auth: { userInfo, loading: false },
};
const middleware = [thunk];
const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  createChat: chatReducer,
  userChats: userChatsReducer
});
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
