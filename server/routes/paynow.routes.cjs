const { Router } = require("express");
const handlePayment = require("../controllers/paynow.controller.cjs");
const router = Router();
router.route("/:email/payment").post(handlePayment.integration);
router.route("/payment/status").post(handlePayment.status);
router.route("/:email/multiple/payment").post(handlePayment.multiplePayments);
router.route("/:email/:phoneNumber/payment").post(handlePayment.mobilePayment);
router.route("/payment/notification").post(handlePayment.notification);
module.exports = router;
