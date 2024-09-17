const router = require("express").Router();
const Controller = require("../controllers/ExportController");

router.get("/:orderID", Controller.getOrderDetails);

module.exports = router;
