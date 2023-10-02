const userRepository = require("../repositories/user-repository");

module.exports = {
  async create(user) {
    try {
      return await userRepository.create(user);
    } catch (error) {
      console.log("Something went wrong in service: ", error);
      throw error;
    }
  },
  async findByEmail(email) {
    return await userRepository.findByEmail(email);
  },
  async findById(id) {
    return await userRepository.findById(id);
  },
  async delete(id) {
    try {
      const user = await userRepository.findById(id);
      return await user.destroy();
    } catch (error) {
      console.log("Something went wrong in service: ", error);
      throw error;
    }
  },
};
