const { user: User } = require("../models/index");
//export the user repository
module.exports = {
  //create a new user
  async create(user) {
    try {
      return User.create(user);
    } catch (error) {
      console.log("Something went wrong in repository", error);
      throw error;
    }
  },
  //find a user by email
  async findByEmail(email) {
    return User.findOne({ where: { email } });
  },
  //find a user by id
  async findById(id) {
    return User.findByPk(id);
  },
  //delete a user
  async delete(id) {
    try {
      const user = await User.findByPk(id);
      return user.destroy();
    } catch (error) {
      console.log("Something went wrong in repository", error);
      throw error;
    }
  },
};
