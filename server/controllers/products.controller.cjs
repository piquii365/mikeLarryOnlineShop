const Products = require("../models/product.cjs");
const newProduct = async (req, res) => {
  try {
    const files = req.files;
    let images = [];
    if (files) {
      files.map((file) => {
        images.push(file.filename);
      });
    }
    const values = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      color: req.body.color,
      images: images,
    };
    const result = await Products.insertMany([values]);
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false, Result: "Internal Server Error" });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ status: true, Result: "Internal Server Error" });
  }
};
module.exports = { newProduct, getAllProducts };
