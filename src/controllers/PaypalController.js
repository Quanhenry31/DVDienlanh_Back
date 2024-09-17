const orderService = require("../services/paypalService");

class BillController {
  // [POST] /orders/createOrderWithDetailsAndPayment
  createOrderWithDetailsAndPayment = async (req, res) => {
    try {
      const { orderData, orderDetailData, paymentData } = req.body;

      // Đảm bảo orderDetailData luôn là một mảng
      const orderDetailDataArray = Array.isArray(orderDetailData)
        ? orderDetailData
        : [orderDetailData];

      // Gọi dịch vụ để tạo đơn hàng, chi tiết đơn hàng, và thanh toán PayPal
      const result = await orderService.createOrderWithDetailsAndPayment(
        orderData,
        orderDetailDataArray,
        paymentData
      );

      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: "Failed to create order, order detail, and payment.",
        });
      }

      return res.status(201).json({
        success: true,
        message: "Order, order detail, and payment created successfully.",
        redirectUrl: result.redirectUrl, // Trả về URL để redirect tới PayPal
      });
    } catch (error) {
      console.error("Error creating order with details and payment:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to process request." });
    }
  };
  handlePaymentCallback = async (req, res) => {
    try {
      const callbackData = req.body;

      console.log("Received callback data:", callbackData);

      const result = await orderService.handlePaymentCallback(callbackData);

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error handling payment callback:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to handle callback.",
      });
    }
  };
}

module.exports = new BillController();
