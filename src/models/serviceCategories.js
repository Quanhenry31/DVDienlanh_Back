"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServiceCategories extends Model {
    static associate(models) {}
  }
  ServiceCategories.init(
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
      modelName: "ServiceCategories",
    }
  );
  return ServiceCategories;
};
