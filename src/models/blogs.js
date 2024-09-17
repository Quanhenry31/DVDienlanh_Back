"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.categoriBlogs, { foreignKey: "categoryID" });
      this.hasMany(models.commentBlogs, { foreignKey: "blogID" });
    }
  }
  Blogs.init(
    {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      number1: DataTypes.INTEGER,
      number2: DataTypes.INTEGER,
      title1: DataTypes.STRING,
      title2: DataTypes.STRING,
      title3: DataTypes.STRING,
      title4: DataTypes.STRING,
      image1: DataTypes.STRING,
      image2: DataTypes.STRING,
      categoryID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Blogs",
    }
  );
  return Blogs;
};
