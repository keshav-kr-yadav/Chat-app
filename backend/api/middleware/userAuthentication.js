const { validateToken, AppError } = require("../../utils/index.js");

const userAuthentication = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = validateToken(token);
      req.user = user;
      return next();
    } catch (err) {
      return next(err);
    }
  }
  return next(new AppError("Not authorized, token failed", 401));
};
module.exports = userAuthentication;
