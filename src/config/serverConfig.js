const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();
const PORT = process.env.PORT;
const SALT = bcrypt.genSaltSync(10);
module.exports = {
  PORT,
  SALT,
};
