"use strict";
const { Model, DATEONLY } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Advertisements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Advertisements.init(
    {
      image: DataTypes.STRING,
      adComment: DataTypes.STRING,
      endDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Advertisements",
    }
  );
  return Advertisements;
};
