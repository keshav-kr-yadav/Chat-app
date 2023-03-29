import axios from "axios";
const url = "";

// User API
export const registerAPI = (name, email, password, pic) =>
  axios.post(`/api/user/signup`, { name, email, password, pic });

export const loginAPI = (email, password) =>
  axios.post(`/api/user/login`, { email, password });

export const findUserAPI = (query,config) => axios.get(`/api/user?search=${query}`,config);

//Chat API
export const getUserChatAPI = (config) => axios.get(`/chat`, config);

export const createChatAPI = (userId, config) =>
  axios.post(`/chat`, { userId } ,config );

export const createGroupChatAPI = (chatName, users, config) =>
  axios.post(`/group`, { chatName, users }, config);

export const renameGroupChatAPI = (chatId, chatName, config) =>
  axios.put(`/rename`, { chatId, chatName }, config);

export const removeFromGroupAPI = (chatId, userId, config) =>
  axios.put(`/groupremove`, { chatId, userId }, config);

export const addTGroupAPI = (chatId, userId, config) =>
  axios.put(`/groupadd`, chatId, userId, config);

//Message API
export const getMessageByChatAPI = (chatId, config) =>
  axios.get(`/api/message/${chatId}`, config);

export const createMessageAPI = (chatId, content, config) =>
  axios.post(`/api/message/${chatId}`, { content }, config);

export const uploadImageAPI = (url, formData) => axios.post(url, formData);
