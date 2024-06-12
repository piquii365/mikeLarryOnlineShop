const { Router } = require("express");
const handleMultiplePayments = require("../controllers/multiorder.controller.cjs");
const router = Router();
router
  .route("/payment/multi-order")
  .post(handleMultiplePayments.multiplePayments);
router
  .route("/orders/delete/:id")
  .delete(handleMultiplePayments.deleteMultiOrder);
module.exports = router;
