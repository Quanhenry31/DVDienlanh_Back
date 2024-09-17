const billService = require("../services/momoService");

class BillController {
  createOrderWithDetailsAndPayment = async (req, res) => {
    try {
      const { orderData, orderDetailData, paymentData } = req.body;

      const orderDetailDataArray = Array.isArray(orderDetailData)
        ? orderDetailData
        : [orderDetailData];

      const result = await billService.createOrderWithDetailsAndPayment(
        orderData,
        orderDetailDataArray,
        paymentData
      );

      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: result.message,
        });
      }

      return res.status(201).json({
        success: true,
        message: result.message,
        paymentUrl: result.paymentUrl,
      });
    } catch (error) {
      console.error("Error creating order with details and payment:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to process request.",
      });
    }
  };

  handlePaymentCallback = async (req, res) => {
    try {
      const callbackData = req.body;
      console.log("Received callback data:", callbackData);

      const result = await billService.handlePaymentCallback(callbackData);

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
