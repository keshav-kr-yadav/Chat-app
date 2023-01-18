const { messageService } = require("../services");
const userAuthentication = require("./middleware/userAuthentication");

module.exports = (app) => {
  const service = new messageService();
  app.get("/api/message/:chatId", userAuthentication, async (req, res, next) => {
    try {
      const chatId = req.params.chatId;
      const data = await service.fetchMessage(chatId);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });
  app.post("/api/message/:chatId", userAuthentication, async (req, res, next) => {
    try {
      const id = req.user.id;
      const chatId = req.params.chatId;
      const { content } = req.body;
      const data = await service.createMessage(id, chatId, content);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });
};
