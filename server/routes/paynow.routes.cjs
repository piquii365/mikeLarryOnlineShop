const { Router } = require("express");
const handlePayment = require("../controllers/paynow.controller.cjs");
const router = Router();
router.route("/payment").post(handlePayment.integration);
module.exports = router;
