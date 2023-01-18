const { messageRepository } = require("../database/repository");
const { AppError } = require("../utils");

module.exports = class messageService {
  constructor() {
    this.messageRepository = new messageRepository();
  }
  // Get all message of a chat
    async fetchMessage(chatId) {
        if (!chatId) {
            throw new AppError("Chat id should not be empty", 400);
        }
        try {
            const data = await this.messageRepository.fetchMessage(chatId);
            return data;
        } catch (err) {
            throw err;
        }
  }

  // create message for a chat
    async createMessage(id, chatId, content) {
      if (!chatId || !content) {
        throw new AppError("Chat id and content should not be empty", 400);
      }
        try {
            const data = await this.messageRepository.createMessage(id, chatId, content);
            return data;
      } catch (err) {
        throw err;
      }
  }
};