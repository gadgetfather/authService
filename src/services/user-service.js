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
  async getPassword(id) {
    try {
      return await userRepository.getPassword(id);
    } catch (error) {
      console.log("Something went wrong in service: ", error);
      throw error;
    }
  },
  // login
  async login(email, password) {
    try {
      // find user by email
      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      // check password
      const isMatch = this.checkPassword(password, user.password);
      if (!isMatch) {
        throw new Error("Password does not match");
      }
      // create token
      const token = this.createToken(user);
      return { user, token };
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

  async isAuthenticated(token) {
    try {
      const decoded = this.verifyToken(token);
      if (!decoded) {
        throw new Error("Invalid token");
      }
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        throw new Error("User not found");
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in service: ", error);
      throw error;
    }
  },

  isAdmin(userId) {
    return userRepository.isAdmin(userId);
  },
};
