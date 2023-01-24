const { AppError } = require("../../utils/index.js");
const { userModel } = require("../models");

module.exports = class userRepository {
  async findUserById(id) {
    try {
      const user = await userModel.findById(id).select("-password");
      return user;
    } catch (err) {
      throw new AppError(err.message, 401);
    }
  }
  // Create new user
  async register(userInput) {
    try {
      const user = new userModel(userInput);
      const result = await user.save();
      return {
        _id: result._id,
        name: result.name,
        email: result.email,
        isAdmin: result.isAdmin,
        pic: result.pic,
      };
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
        };
      } else {
        throw new AppError("Invalid email or password", 401);
      }
    } catch (err) {
      throw new AppError(err.message, 401);
    }
  }
  async getAllUsers(keyWord, userId) {
    try {
      const searchString = keyWord
        ? {
            $or: [
              { name: { $regex: keyWord, $options: "i" } },
              { email: { $regex: keyWord, $options: "i" } },
            ],
          }
        : {};
      const users = await userModel
        .find(searchString)
        .find({ _id: { $ne: userId } });
      return users;
    } catch (err) {
      throw new AppError(err.message, 401);
    }
  }
};
