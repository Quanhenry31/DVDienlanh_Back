"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServiceCategoriesUsuallys extends Model {
    static associate(models) {}
  }
  ServiceCategoriesUsuallys.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      title: DataTypes.STRING,
      capacity: DataTypes.STRING,
      cleanType: DataTypes.STRING,
      categoryID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ServiceCategoriesUsuallys",
    }
  );
  return ServiceCategoriesUsuallys;
};
