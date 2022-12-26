const { AppError } = require("../../utils");
const { generateToken } = require("../../utils");
const { userModel } = require("../models");

module.exports = class userRepository {
  async register(userInput) {
    try {
      const user = new userModel(userInput);
      const result = await user.save();
      return result;
    } catch (e) {
      const x = e.message.split(":")[2];
      throw new AppError(x, 400);
    }
  }

  async login({ email, password }) {
    try {
      const user = await userModel.findOne({ email });
      if (user && (await user.comparePassword(password))) {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id),
        };
      } else {
        throw new AppError("Invalid email or password", 401);
      }
    } catch (err) {
      throw new AppError(err.message, 401);
    }
  }
};
