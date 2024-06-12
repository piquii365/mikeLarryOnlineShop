const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  items: [
    {
      item: { type: String },
      quantity: { type: Number },
      color: { type: String },
    },
  ],
  buyer: { type: String },
  location: { type: String },
  phoneNumber: { type: String },
  paymentReference: { type: String },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
});
module.exports = new mongoose.model("Order", orderSchema);