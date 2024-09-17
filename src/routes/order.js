const router = require("express").Router();
const Controller = require("../controllers/OrderController");
const BillController = require("../controllers/BillController");
const BillVnpayController = require("../controllers/VnpayController");
const BillPaypalController = require("../controllers/PaypalController");
const BillMomoController = require("../controllers/MomoController");

router.post("/", Controller.create);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.delete);
router.get("/", Controller.findAll);
router.get("/:id", Controller.findId);

// thanh toán khi nhận hàng
router.post("/bill", BillController.createOrderWithDetailsAndPayment);

// thanh toán vnpay
router.post(
  "/bill/vnpay",
  BillVnpayController.createOrderWithDetailsAndPayment
);
router.post("/callback", BillVnpayController.handlePaymentCallback);

//thanh toán paypal
router.post(
  "/bill/paypal",
  BillPaypalController.createOrderWithDetailsAndPayment
);
router.post("/callback/Paypal", BillPaypalController.handlePaymentCallback);

//thanh toán momo
router.post("/bill/momo", BillMomoController.createOrderWithDetailsAndPayment);
router.post("/callback/Momo", BillMomoController.handlePaymentCallback);
module.exports = router;
