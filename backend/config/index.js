const dotEnv  = require("dotenv");
dotEnv.config();
module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI
};