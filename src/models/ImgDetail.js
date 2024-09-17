"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImgDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ImgDetails.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      imgDetailID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ImgDetails",
    }
  );
  return ImgDetails;
};
