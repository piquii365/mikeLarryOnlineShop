const mongoose = require("mongoose");
const multiOrderSchema = new mongoose.Schema(
  {
    customerEmail: { type: String },
    customerPhoneNumber: { type: String },
    customerAddress: { type: String },
    order: [
      {
        item: { type: String },
        quantity: { type: Number },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Canceled"],
      default: "Pending",
    },
    paymentReference: { type: String },
    date: { type: Date, default: Date.now() },
    orderStatus: {
      type: String,
      enum: ["Pending", "Delivered", "Canceled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
module.exports = new mongoose.model("multiOrder", multiOrderSchema);
