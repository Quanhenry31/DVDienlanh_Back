"use strict";
const { Model, DATEONLY } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userID" });
    }
  }
  Reply.init(
    {
      name1: DataTypes.STRING,
      name2: DataTypes.STRING,
      number1: DataTypes.INTEGER,
      number2: DataTypes.INTEGER,
      userID: DataTypes.INTEGER,
      replyID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reply",
    }
  );
  return Reply;
};
