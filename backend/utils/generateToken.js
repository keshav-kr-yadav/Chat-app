const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
module.exports = (id) => {
  const token = jwt.sign({ id: id }, JWT_SECRET);
  return token;
};
