const { Order, OrderDetail, Payment, Size } = require("../models");
const PayOS = require("@payos/node");
const Sequelize = require("sequelize"); // Nhập khẩu Sequelize

const payos = new PayOS(
  "43a71e85-1288-440c-8cdd-2300a62ccd65",
  "4888adf2-2310-4b23-ae41-b354ca35fbf1",
  "ac7c0391882da5c6d973ba4452d64d5203804baeeca0a4c0821154749e3a49a4"
);

const YOUR_DOMAIN = "http://localhost:3000";

class BillService {
  async createOrderWithDetailsAndPayment(
    orderData,
    orderDetailData,
    paymentData
  ) {
    try {
      // Tạo đơn hàng
      const createdOrder = await Order.create(orderData);

      // Tạo chi tiết đơn hàng
      for (const detail of orderDetailData) {
        detail.orderID = createdOrder.id; // Gán ID của đơn hàng vừa tạo
        await OrderDetail.create(detail);
        // Cập nhật số lượng tồn kho trong bảng Size
        await Size.update(
          {
            InventoryNumber: Sequelize.literal(
              `InventoryNumber - ${detail.quantity}`
            ),
          },
          { where: { size: detail.size } }
        );
      }

      // Tạo liên kết thanh toán qua PayOS
      const order = {
        amount: createdOrder.total_price, // Số tiền của đơn hàng
        description: "Thanh toan don hang", // Mô tả đơn hàng
        orderCode: createdOrder.id, // Sử dụng ID của đơn hàng làm orderCode
        returnUrl: `${YOUR_DOMAIN}/callback`,
        cancelUrl: `${YOUR_DOMAIN}/callback`,
      };
      const paymentLink = await payos.createPaymentLink(order);

      // Tạo thanh toán
      paymentData.orderID = createdOrder.id; // Gán ID của đơn hàng vừa tạo
      paymentData.paymentUrl = paymentLink.checkoutUrl; // Lưu URL thanh toán
      await Payment.create(paymentData);

      return {
        success: true,
        message: "Order, order detail, and payment created successfully.",
        paymentUrl: paymentLink.checkoutUrl,
      };
    } catch (error) {
      console.error("Error creating order with details and payment:", error);
      return {
        success: false,
        message: "Failed to create order with details and payment.",
      };
    }
  }

  // Thêm các phương thức khác cần thiết
  async handlePaymentCallback(callbackData) {
    try {
      const { orderCode, status } = callbackData;

      if (status === "PAID") {
        await Payment.update(
          { status: "thanh toán thành công" },
          { where: { orderID: orderCode } }
        );
      } else {
        await Payment.update(
          { status: "thanh toán thất bại" },
          { where: { orderID: orderCode } }
        );
        await Size.update(
          {
            InventoryNumber: Sequelize.literal(
              `InventoryNumber + ${detail.quantity}`
            ),
          },
          { where: { size: detail.size } }
        );
      }

      return {
        success: true,
        message: "Callback handled successfully.",
      };
    } catch (error) {
      console.error("Error handling payment callback:", error);
      return {
        success: false,
        message: "Failed to handle callback.",
      };
    }
  }
}

module.exports = new BillService();
