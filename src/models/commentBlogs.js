"use strict";
const { Model, DATEONLY } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class commentBlogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Blogs, { foreignKey: "blogID" });
      this.belongsTo(models.User, { foreignKey: "userID" });
    }
  }
  commentBlogs.init(
    {
      name1: DataTypes.STRING,
      name2: DataTypes.STRING,
      number1: DataTypes.INTEGER,
      number2: DataTypes.INTEGER,
      blogID: DataTypes.INTEGER,
      userID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "commentBlogs",
    }
  );
  return commentBlogs;
};
