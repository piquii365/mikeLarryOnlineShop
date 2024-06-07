const upload = require("../middleware/multer.cjs");
const { Router } = require("express");
const handleProduct = require("../controllers/products.controller.cjs");
const router = Router();
router
  .route("/new-product")
  .post(upload.array("images", 5), handleProduct.newProduct);
router.route("/all-products").get(handleProduct.getAllProducts);
module.exports = router;
