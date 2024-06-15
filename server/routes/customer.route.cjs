const { Router } = require("express");
const handleCustomer = require("../controllers/customer.controller.cjs");
const router = Router();
router.route("/add-customer").post(handleCustomer.addCustomer);
router.route("/all").get(handleCustomer.getCustomers);
router.route("/delete/:id").delete(handleCustomer.deleteCustomer);
module.exports = router;
