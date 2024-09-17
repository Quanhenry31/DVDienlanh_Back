"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: "orderID" });
    }
  }
  Payment.init(
    {
      orderID: DataTypes.INTEGER,
      name: DataTypes.STRING,
      paymentDate: DataTypes.DATE,
      amount: DataTypes.FLOAT,
      paymentMethod: DataTypes.STRING,
      status: DataTypes.STRING,
      nameUser: DataTypes.STRING,
      phone: DataTypes.STRING,
      addresses: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
