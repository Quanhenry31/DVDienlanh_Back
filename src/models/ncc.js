"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ncc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ncc.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      email: DataTypes.STRING,
      adress: DataTypes.STRING,
      nccID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ncc",
    }
  );
  return Ncc;
};
