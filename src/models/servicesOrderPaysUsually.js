"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServicesOrderPaysUsuallies extends Model {
    static associate(models) {}
  }
  ServicesOrderPaysUsuallies.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      price: DataTypes.STRING,
      information: DataTypes.STRING,
      status: DataTypes.STRING,
      nameUser: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      addresses: DataTypes.STRING,
      typeServices: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ServicesOrderPaysUsuallies",
    }
  );
  return ServicesOrderPaysUsuallies;
};
