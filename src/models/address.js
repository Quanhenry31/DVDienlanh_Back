"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    static associate(models) {
      // Define the inverse association if needed
      this.belongsTo(models.User, { foreignKey: "addressID" });
    }
  }
  Addresses.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      addressID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Addresses",
    }
  );
  return Addresses;
};
