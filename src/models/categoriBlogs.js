"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class categoriBlogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Blogs, {
        foreignKey: "categoryID",
        onDelete: "CASCADE",
      });
    }
  }
  categoriBlogs.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "categoriBlogs",
    }
  );
  return categoriBlogs;
};
