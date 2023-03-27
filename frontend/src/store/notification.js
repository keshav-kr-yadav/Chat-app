import { createSlice } from "@reduxjs/toolkit";

const notfication = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    setNotification(state, action) {
      state.push(action.payload);
    },
    removeNotification(state, action) {
      state = state.filter((notif) => notif._id !== action.payload._id);
    },
  },
});
const notificationReducer = notfication.reducer;
export const { setNotification, removeNotification } = notfication.actions;
export default notificationReducer;
