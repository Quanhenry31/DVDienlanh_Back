"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    static associate(models) {
      this.hasMany(models.ServiceCategories, { foreignKey: "categoryID" });
    }
  }
  Services.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Services",
    }
  );
  return Services;
};
