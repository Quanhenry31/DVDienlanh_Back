const { Order, OrderDetail, Payment, Size } = require("../models");
const paypal = require("paypal-rest-sdk");
const Sequelize = require("sequelize"); // Nhập khẩu Sequelize

paypal.configure({
  mode: "sandbox", // Hoặc 'live' cho môi trường sản xuất
  client_id:
    "AeqlntOcC35DGQ6Fn-DLQNR0LD0E_lr2faZoA1nSyCa2WE7KUhrowc47YatjA0GbXVaI0a3OYuIJggqe",
  client_secret:
    "EGq5ZTrcD9NWWrMM7WruW75UN6H1ARdqXKjhvYLXG5_OUwhhJpY29npOgG9QNuRmcK70fFgziws4gJ5u",
});

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
        await Size.update(
          {
            InventoryNumber: Sequelize.literal(
              `InventoryNumber - ${detail.quantity}`
            ),
          },
          { where: { size: detail.size } }
        );
      }
      // Tạo thanh toán PayPal
      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:3000/callbackPaypal",
          cancel_url: "http://localhost:3000/callbackPaypal",
        },
        transactions: [
          {
            item_list: {
              items: orderDetailData.map((detail) => ({
                name: `Product ${detail.productID}`, // Tên sản phẩm
                sku: detail.orderID.toString(), // SKU sản phẩm (có thể thay đổi)
                price: paymentData.amount, // Giá đơn vị sản phẩm
                currency: "USD",
                quantity: detail.quantity,
              })),
            },
            amount: {
              currency: "USD",
              total: paymentData.amount,
            },
            description: "Order payment",
          },
        ],
      };

      // Tạo thanh toán trên PayPal
      return new Promise((resolve, reject) => {
        paypal.payment.create(create_payment_json, async (error, payment) => {
          if (error) {
            console.error("Error creating PayPal payment:", error);
            reject({
              success: false,
              message: "Failed to create PayPal payment.",
            });
          } else {
            // Lưu thông tin thanh toán
            paymentData.orderID = createdOrder.id;
            await Payment.create(paymentData);

            const redirectUrl = payment.links.find(
              (link) => link.rel === "approval_url"
            ).href;

            resolve({
              success: true,
              redirectUrl, // Trả về URL để redirect tới PayPal
            });
          }
        });
      });
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
      const { paymentId, token, PayerID } = callbackData;
      // Kiểm tra giá trị paymentId và PayerID
      if (!paymentId || !PayerID) {
        throw new Error("Payment ID or Payer ID is missing.");
      }

      const execute_payment_json = {
        payer_id: PayerID,
        // transactions: [
        //   {
        //     amount: {
        //       currency: "USD",
        //       total: "100",
        //     },
        //   },
        // ],
      };
      paypal.payment.execute(
        paymentId,
        execute_payment_json,
        async function (error, payment) {
          if (error) {
            console.log(error.response);
            throw error;
          } else {
            console.log(JSON.stringify(payment));
            console.log(payment.state);
            const sku = payment.transactions[0].item_list.items[0].sku;

            if (payment.state === "approved") {
              await Payment.update(
                { status: "thanh toán thành công" },
                { where: { orderID: sku } }
              );
            } else {
              await Payment.update(
                { status: "thanh toán thất bại" },
                { where: { orderID: sku } }
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
          }
        }
      );

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
