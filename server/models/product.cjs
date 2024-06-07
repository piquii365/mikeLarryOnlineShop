const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, uppercase: true },
  description: { type: String, required: true, uppercase: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  rating: { type: Number, default: 5 },
  discount: { type: Number },
  color: [{ type: String }],
  category: [{ type: String }],
  comments: [{ type: String }],
});
module.exports = new mongoose.model("Product", productSchema);
