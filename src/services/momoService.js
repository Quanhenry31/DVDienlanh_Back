const axios = require("axios");
const crypto = require("crypto");
const config = require("../config/config");
const { Order, OrderDetail, Payment, Size } = require("../models");
const Sequelize = require("sequelize"); // Nhập khẩu Sequelize

class BillService {
  async createOrderWithDetailsAndPayment(
    orderData,
    orderDetailData,
    paymentData
  ) {
    try {
      const createdOrder = await Order.create(orderData);

      for (const detail of orderDetailData) {
        detail.orderID = createdOrder.id;
        await OrderDetail.create(detail);
        await Size.update(
          {
            InventoryNumber: Sequelize.literal(
              `InventoryNumber - ${detail.quantity}`
            ),
          },
          { where: { size: detail.size } }
        );
      }

      const amount = createdOrder.total_price.toString();
      const orderId = createdOrder.id;
      const requestId = orderId;

      const rawSignature = `accessKey=${config.accessKey}&amount=${amount}&extraData=${config.extraData}&ipnUrl=${config.ipnUrl}&orderId=${orderId}&orderInfo=${config.orderInfo}&partnerCode=${config.partnerCode}&redirectUrl=${config.redirectUrl}&requestId=${requestId}&requestType=${config.requestType}`;
      const signature = crypto
        .createHmac("sha256", config.secretKey)
        .update(rawSignature)
        .digest("hex");

      const requestBody = {
        partnerCode: config.partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: config.orderInfo,
        redirectUrl: config.redirectUrl,
        ipnUrl: config.ipnUrl,
        lang: config.lang,
        requestType: config.requestType,
        autoCapture: config.autoCapture,
        extraData: config.extraData,
        signature: signature,
      };

      const response = await axios.post(
        "https://test-payment.momo.vn/v2/gateway/api/create",
        requestBody
      );

      paymentData.orderID = createdOrder.id;
      paymentData.paymentUrl = response.data.payUrl; // Lưu URL thanh toán
      await Payment.create(paymentData);

      return {
        success: true,
        message: "Order, order detail, and payment created successfully.",
        paymentUrl: response.data.payUrl,
      };
    } catch (error) {
      console.error("Error creating order with details and payment:", error);
      return {
        success: false,
        message: "Failed to create order with details and payment.",
      };
    }
  }

  async handlePaymentCallback(callbackData) {
    try {
      const { orderId, resultCode } = callbackData;

      if (resultCode === "0") {
        await Payment.update(
          { status: "thanh toán thành công" },
          { where: { orderID: orderId } }
        );
      } else {
        await Payment.update(
          { status: "thanh toán thất bại" },
          { where: { orderID: orderId } }
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
