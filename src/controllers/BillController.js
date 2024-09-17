// OrderController.js

const orderService = require("../services/billService");

class BillController {
  // Các phương thức đã có

  // [POST] /orders/createOrderWithDetailsAndPayment
  createOrderWithDetailsAndPayment = async (req, res) => {
    try {
      const { orderData, orderDetailData, paymentData } = req.body;

      // Ensure orderDetailData is always an array
      const orderDetailDataArray = Array.isArray(orderDetailData)
        ? orderDetailData
        : [orderDetailData];

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
      });
    } catch (error) {
      console.error("Error creating order with details and payment:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to process request." });
    }
  };
}

module.exports = new BillController();
