"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey: "sizeID" });
    }
  }
  Size.init(
    {
      size: DataTypes.STRING,
      width: DataTypes.STRING,
      height: DataTypes.STRING,
      mass: DataTypes.STRING,
      InventoryNumber: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      date: DataTypes.DATE,
      sizeID: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Size",
    }
  );
  return Size;
};
