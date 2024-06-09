const mongoose = require("mongoose");
const deliverySchema = new mongoose.Schema({
  payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payments" },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
      delivered: { type: Boolean, default: false },
    },
  ],
  customer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      deliveryLocation: { type: String },
    },
  },
});
module.exports = new mongoose.model("Delivery", deliverySchema);
