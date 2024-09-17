const Exports = require("../services/exportService");

class ExportController {
  // [GET] /orders/:orderID/details
  getOrderDetails = async (req, res) => {
    const orderID = req.params.orderID;
    try {
      const orderDetails = await Exports.getOrderDetails(orderID);

      if (!orderDetails) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json(orderDetails);
    } catch (error) {
      console.error("Error while fetching order details:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new ExportController();
