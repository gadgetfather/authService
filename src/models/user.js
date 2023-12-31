"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { SALT } = require("../config/serverConfig");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.Role, {
        through: "userRoles",
      });
    }
  }
  user.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  user.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, SALT);
  });
  return user;
};
