"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Voucher.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      value: DataTypes.INTEGER,
      valueMin: DataTypes.INTEGER,
      valueMax: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Voucher",
    }
  );
  return Voucher;
};
