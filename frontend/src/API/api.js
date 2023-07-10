import axios from "axios";
const url = "http://localhost:4000";

// User API
export const registerAPI = (name, email, password, pic) =>
  axios.post(`${url}/api/user/signup`, { name, email, password, pic });

export const loginAPI = (email, password) =>
  axios.post(`${url}/api/user/login`, { email, password });

export const findUserAPI = (query, config) =>
  axios.get(`${url}/api/user?search=${query}`, config);

//Chat API
export const getUserChatAPI = (config) => axios.get(`${url}/chat`, config);

export const createChatAPI = (userId, config) =>
  axios.post(`${url}/chat`, { userId }, config);

export const createGroupChatAPI = (chatName, users, config) =>
  axios.post(`${url}/group`, { chatName, users }, config);

export const renameGroupChatAPI = (chatId, chatName, config) =>
  axios.put(`${url}/rename`, { chatId, chatName }, config);

export const removeFromGroupAPI = (chatId, userId, config) =>
  axios.put(`${url}/groupremove`, { chatId, userId }, config);

export const addTGroupAPI = (chatId, userId, config) =>
  axios.put(`${url}/groupadd`, chatId, userId, config);

//Message API
export const getMessageByChatAPI = (chatId, config) =>
  axios.get(`${url}/api/message/${chatId}`, config);

export const createMessageAPI = (chatId, content, config) =>
  axios.post(`${url}/api/message/${chatId}`, { content }, config);

export const uploadImageAPI = (url, formData) => axios.post(url, formData);
