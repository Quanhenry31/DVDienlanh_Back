"use strict";
const { Model, DATEONLY } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: "productID" });
      this.belongsTo(models.User, { foreignKey: "userID" });
      // define association here if necessary
      this.hasMany(models.Reply, { foreignKey: "replyID" });
    }
  }
  Comments.init(
    {
      name1: DataTypes.STRING,
      name2: DataTypes.STRING,
      number1: DataTypes.INTEGER,
      number2: DataTypes.INTEGER,
      productID: DataTypes.INTEGER,
      userID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
