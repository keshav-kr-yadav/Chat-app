const { AppError } = require("../../utils");
const { messageModel, chatModel, userModel } = require("../models");

class messageRepository {
  // Get all message of a chat
  async fetchMessage(chatId) {
    try {
      const messages = await messageModel
        .find({ chat: chatId })
        .populate("sender", "name pic email")
        .populate("chat");
      return messages;
    } catch (err) {
      throw new AppError(err.message, 400);
    }
  }

  // create message for a chat
  async createMessage(id, chatId, content) {
    var newMessage = {
      sender: id,
      content: content,
      chat: chatId,
    };
    try {
      var message = await messageModel.create(newMessage);
      message = await messageModel
        .find(message._id)
        .populate("sender", "name pic")
        .populate("chat");
      message = await userModel.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });
      await chatModel.findByIdAndUpdate(chatId, {
        latestMessage: message._id,
      });
      return message;
    } catch (err) {
      throw new AppError(err.message, 400);
    }
  }
}
module.exports = messageRepository;
