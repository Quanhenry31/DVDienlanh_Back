const { Order, OrderDetail, User, Payment, Product } = require("../models");

class ExportService {
  async getOrderDetails(orderID) {
    try {
      const order = await Order.findAll({ where: { id: orderID } });
      if (!order) {
        return null;
      }
      console.log(order);

      const orderDetail = await OrderDetail.findAll({
        where: { orderID: order[0].id },
      });
      const user = await User.findOne({ where: { id: order[0].user_id } });

      const payment = await Payment.findOne({
        where: { orderID: order[0].id },
      });
      const productPromises = orderDetail.map(async (orderItem) => {
        const product = await Product.findOne({
          where: { id: orderItem.productID },
        });
        return product;
      });
      const products = await Promise.all(productPromises);
      return { order, orderDetail, user, payment, products };
    } catch (error) {
      throw new Error("Error while fetching order details: " + error.message);
    }
  }
}

module.exports = new ExportService();
