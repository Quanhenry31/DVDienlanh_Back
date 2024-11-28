"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, { foreignKey: "productID" });
      this.belongsTo(models.Order, { foreignKey: "orderID" });

    }
  }
  OrderDetail.init(
    {
      productID: DataTypes.INTEGER,
      orderID: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      unitPrice: DataTypes.INTEGER,
      allMoney: DataTypes.INTEGER,
      size: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
