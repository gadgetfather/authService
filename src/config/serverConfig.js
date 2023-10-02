const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();
const PORT = process.env.PORT;
const SALT = bcrypt.genSaltSync(10);
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = {
  PORT,
  SALT,
  JWT_SECRET,
};
