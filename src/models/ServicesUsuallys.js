"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServicesUsuallys extends Model {
    static associate(models) {
      this.hasMany(models.ServiceCategoriesUsuallys, {
        foreignKey: "categoryID",
      });
    }
  }
  ServicesUsuallys.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ServicesUsuallys",
    }
  );
  return ServicesUsuallys;
};
