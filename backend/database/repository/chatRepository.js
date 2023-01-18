const { AppError } = require("../../utils");
const { chatModel, userModel } = require("../models");

module.exports = class ChatRepository {
  // Create One to One Chat
  async createChat(userId, id) {
    // id -> user who try to access chat
    // userId -> whose chat is try to acess
    var isChat = await chatModel
      .find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: userId } } },
          { users: { $elemMatch: { $eq: id } } },
        ],
      })
      .populate("users", "-password")
      .populate("latestMessage");
    isChat = await userModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    if (isChat.length > 0) {
      return isChat[0];
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [userId, id],
      };
      try {
        const createdChat = await chatModel.create(chatData);
        const fullChat = await chatModel
          .findOne({
            _id: createdChat._id,
          })
          .populate("users", "-password");
        return fullChat;
      } catch (err) {
        throw new AppError(err.message, 400);
      }
    }
  }
  // Fetch all chats for a user
  async fetchAllChat(id) {
    try {
      var results = await chatModel
        .find({ users: { $elemMatch: { $eq: id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });
      results = await userModel.populate(results, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
      return results;
    } catch (err) {
      throw new AppError(err.message, 400);
    }
  }
  // Create New Group Chat
  async createGroupChat(id, users, chatName) {
    try {
      const user = await userModel.findById(id);
      users.push(user);
      const groupChat = await chatModel.create({
        chatName: chatName,
        users: users,
        isGroupChat: true,
        groupAdmin: user,
      });
      const fullGroupChat = await chatModel
        .findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      return fullGroupChat;
    } catch (err) {
      throw new AppError(err.message, 400);
    }
  }

  // Rename Group
  async renameGroup(id, chatId, chatName) {
    try {
      const updatedChat = await chatModel
        .findByIdAndUpdate(
          chatId,
          {
            chatName: chatName,
          },
          {
            new: true,
          }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      return updatedChat;
    } catch (err) {
      throw new AppError(err.message, 400);
    }
  }

  // Add user to Group
  async addUserToGroup(id, chatId, userId) {
    try {
      const added = await chatModel
        .findByIdAndUpdate(
          chatId,
          {
            $push: { users: userId },
          },
          {
            new: true,
          }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      return added;
    } catch (err) {
      throw new AppError(err.message, 400);
    }
  }

  // Remove user from Group
  async removeUserFromGroup(id, chatId, userId) {
    try {
      const removed = await chatModel
        .findByIdAndUpdate(
          chatId,
          {
            $pull: { users: userId },
          },
          {
            new: true,
          }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
      return removed;
    } catch (err) {
      throw new AppError(err.message, 400);
    }
  }
};
