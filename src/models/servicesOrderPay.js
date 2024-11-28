"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServicesOrderPays extends Model {
    static associate(models) {}
  }
  ServicesOrderPays.init(
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
      modelName: "ServicesOrderPays",
    }
  );
  return ServicesOrderPays;
};
