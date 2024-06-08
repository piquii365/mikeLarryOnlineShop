const { Router } = require("express");
const handleUser = require("../controllers/user.controller.cjs");
const router = Router();
router.route("/subscribe").post(handleUser.subscription);
module.exports = router;
