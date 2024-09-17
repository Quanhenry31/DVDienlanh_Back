"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductDetails.init(
    {
      width: DataTypes.STRING,
      height: DataTypes.STRING,
      mass: DataTypes.STRING,
      InventoryNumber: DataTypes.STRING,
      date: DataTypes.DATE,
      productDetailsID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductDetails",
    }
  );
  return ProductDetails;
};
