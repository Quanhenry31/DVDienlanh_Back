"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServicesTimeUsuallys extends Model {
    static associate(models) {}
  }
  ServicesTimeUsuallys.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ServicesTimeUsuallys",
    }
  );
  return ServicesTimeUsuallys;
};
