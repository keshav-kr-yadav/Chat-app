const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const AppError = require("./error");
const ValidateSignature = (signature) => {
  try {
    const payload = jwt.verify(signature, JWT_SECRET);
    return payload;
  } catch (error) {
    throw new AppError("Not authorized, token failed", 401);
  }
};
module.exports = ValidateSignature;
