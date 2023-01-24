const { userRepository } = require("../database/repository");
const { AppError, generateToken } = require("../utils/index.js");

module.exports = class userService {
  constructor() {
    this.userRepository = new userRepository();
  }
  async register(userInput) {
    const { email, name, password, pic } = userInput;
    if (!email || !name || !password) {
      throw new AppError(400, "All required field must be filled");
    }
    try {
      const data = await this.userRepository.register({
        email,
        name,
        password,
        pic,
      });
      data.token = generateToken(data._id);
      return data;
    } catch (err) {
      throw err;
    }
  }
  async login(userInput) {
    const { email, password } = userInput;
    if (!email || !password) {
      throw new AppError(400, "All required field must be filled");
    }
    try {
      const data = await this.userRepository.login({
        email,
        password,
      });
      data.token = generateToken(data._id);
      data.password = undefined;
      return data;
    } catch (err) {
      throw err;
    }
  }
  async getAllUsers(keyWord, userId) {
    if (keyWord == undefined || keyWord.length == 0) {
      throw new AppError(400, "Seach string can not be empty !");
    }
    try {
      const data = await this.userRepository.getAllUsers(keyWord, userId);
      return data;
    } catch (err) {
      throw err;
    }
  }
};
