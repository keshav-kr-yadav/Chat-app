const { userRepository } = require("../database/repository");

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
        password
      });
      data.password = undefined;
      return data;
    } catch (err) {
      throw err;
    }
  }
};
