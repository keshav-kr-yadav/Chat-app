const { userService } = require("../services");
const userAuthentication = require("./middleware/userAuthentication");

module.exports = (app) => {
  const service = new userService();
  // Create new user
  app.post("/api/user/signup", async (req, res, next) => {
    try {
      const data = await service.register(req.body);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });
  //Login
  app.post("/api/user/login", async (req, res, next) => {
    try {
      const data = await service.login(req.body);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });
  //search user
  app.get("/api/user",userAuthentication, async (req, res, next) => {
    try {
      const keyWord = req.query.search;
      const userId = req.user.id;
      const data = await service.getAllUsers(keyWord, userId);
      return res.json(data);
    } catch (err) {
      return next(err);
    }
  });
};
