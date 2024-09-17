"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.hasMany(models.Payment, { foreignKey: "orderID" });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      order_date: DataTypes.DATE,
      delivery_date: DataTypes.DATE,
      delivery_time: DataTypes.DATE,
      total_price: DataTypes.INTEGER,
      status: DataTypes.STRING,
      shiptype: DataTypes.STRING,
      voucher: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
