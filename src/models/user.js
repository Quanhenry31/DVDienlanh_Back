"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.Brands, { foreignKey: "brandID" });

      // define association here if necessary
      this.hasMany(models.Addresses, { foreignKey: "addressID" });

      this.hasMany(models.userChats, { foreignKey: "userChatID" });

      this.hasMany(models.Order, { foreignKey: "user_id" });

      // this.hasMany(models.OrderDetail, { foreignKey: "OrderDetail" });
      // this.hasMany(models.Payment, { foreignKey: "Payment" });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      role: DataTypes.INTEGER,
      image: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
