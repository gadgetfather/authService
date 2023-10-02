const userRepository = require("../repositories/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const bcrypt = require("bcrypt");
module.exports = {
  async create(user) {
    try {
      return await userRepository.create(user);
    } catch (error) {
      console.log("Something went wrong in service: ", error);
      throw error;
    }
  },

  // create JWT token
  createToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
    });
  },
  //verify JWT token
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.log("Something went wrong in token verify service: ", error);
      throw error;
    }
  },
  // check user password
  checkPassword(plainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {}
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
