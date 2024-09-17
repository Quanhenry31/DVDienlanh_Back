"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: "categoryID" });
      this.belongsTo(models.Brands, { foreignKey: "brandID" });

      // define association here if necessary
      this.hasMany(models.ImgDetails, { foreignKey: "imgDetailID" });
      this.hasMany(models.Size, { foreignKey: "sizeID" });
      this.hasMany(models.Ncc, { foreignKey: "nccID" });
      this.hasMany(models.Comments, { foreignKey: "productID" });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      year: DataTypes.DATE,
      categoryID: DataTypes.INTEGER,
      brandID: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      view: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
