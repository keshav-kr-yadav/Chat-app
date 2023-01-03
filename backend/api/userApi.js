const { userService } = require("../services");

module.exports = (app) => {
  const service = new userService();
  app.post("/api/user/signup", async (req, res, next) => {
    try {
      const data = await service.register(req.body);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });
  app.post("/api/user/login", async (req, res, next) => {
    try {
      const data = await service.login(req.body);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });
};
