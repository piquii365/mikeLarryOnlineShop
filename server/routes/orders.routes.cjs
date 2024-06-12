const { Router } = require("express");
const handleOrders = require("../controllers/orders.controller.cjs");
const router = Router();
router.route("/all").get(handleOrders.getOrders);
router.route("/multiple").get(handleOrders.getMultipleOrders);
router.route("/delete/:id").delete(handleOrders.handleDelete);
module.exports = router;
