const { chatService } = require("../services");
const userAuthentication = require("./middleware/userAuthentication");

module.exports = (app) => {
  const service = new chatService();
  // // Create One to One Chat
  app.post("/chat", userAuthentication, async (req, res, next) => {
    try {
      const id = req.user.id;
      const { userId } = req.body;
      const data = await service.createOneToOneChat(id, userId);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });

  // Fetch all chats for a user
  app.get("/chat", userAuthentication, async (req, res, next) => {
    try {
      const id = req.user.id;
      const data = await service.fetchAllChat(id);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });

  // Create New Group Chat
  app.post("/group", userAuthentication, async (req, res, next) => {
    const id = req.user.id;
    const { users, chatName } = req.body;
    try {
      const data = await service.createGroupChat(id, users, chatName);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });

  // Rename Group
  app.put("/rename", userAuthentication, async (req, res, next) => {
    const id = req.user.id;
    const { chatId, chatName } = req.body;
    try {
      const data = await service.renameGroup(id, chatId, chatName);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });
  // Add user to Group
  app.put("/groupadd", userAuthentication, async (req, res, next) => {
    const id = req.user.id;
    const { chatId, userId } = req.body;
    try {
      const data = await service.addUserToGroup(id, chatId, userId);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });
  
  
  // Remove user from Group
  app.put("/groupremove", userAuthentication, async (req, res, next) => {
    const id = req.user.id;
    const { chatId, userId } = req.body;
    try {
      const data = await service.removeUserFromGroup(id, chatId, userId);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });
};
