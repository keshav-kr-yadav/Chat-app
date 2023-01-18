const { chatRepository } = require("../database/repository");
const { AppError } = require("../utils");

module.exports = class ChatService {
  constructor() {
    this.chatRepository = new chatRepository();
  }
  // Create One to One Chat
  async createOneToOneChat(userId, id) {
    if (!userId) {
      throw new AppError(400, "UserId param not sent with request");
    }
    try {
      const data = await this.chatRepository.createChat(userId, id);
      return data;
    } catch (err) {
      throw err;
    }
  }

  // Fetch all chats for a user
  async fetchAllChat(id) {
    try {
      const data = await this.chatRepository.fetchAllChat(id);
      return data;
    } catch (err) {
      throw err;
    }
  }
  // Create New Group Chat
  async createGroupChat(id, users, chatName) {
    if (!users || users.length < 2 || !chatName || !id) {
      throw new AppError("All field are required", 400);
    }
    try {
      const data = await this.chatRepository.createGroupChat(
        id,
        users,
        chatName
      );
      return data;
    } catch (err) {
      throw err;
    }
  }
  // Rename Group
  async renameGroup(id, chatId, chatName) {
    if (!id || !chatId || !chatName) {
      throw new AppError("All field are required", 400);
    }
    try {
      const data = await this.chatRepository.renameGroup(id, chatId, chatName);
      return data;
    } catch (err) {
      throw err;
    }
  }

  // Add user to Group
  async addUserToGroup(id, chatId, userId) {
    if (!chatId || !userId) {
      throw new AppError("All field are required", 400);
    }
    try {
      const data = await this.chatRepository.addUserToGroup(id, chatId, userId);
      return data;
    } catch (err) {
      throw err;
    }
  }
  
  // Remove user from Group
  async removeUserFromGroup(id, chatId, userId) {
    if (!chatId || !userId) {
      throw new AppError("All field are required", 400);
    }
    try {
      const data = await this.chatRepository.removeUserFromGroup(
        id,
        chatId,
        userId
      );
      return data;
    } catch (err) {
      throw err;
    }
  }
};
