const { Router } = require("express");
const handleMultiplePayments = require("../controllers/multiorder.controller.cjs");
const router = Router();
router
  .route("/payment/multi-order")
  .post(handleMultiplePayments.multiplePayments);
module.exports = router;
