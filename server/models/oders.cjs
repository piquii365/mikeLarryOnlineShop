const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
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
    orderStatus: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
    date: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);
module.exports = new mongoose.model("Order", orderSchema);
